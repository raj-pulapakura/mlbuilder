"""
Serverless function to:
1. Train model on Modal with GPU
2. Upload trained model file (model.h5) to S3 bucket

Modal : https://modal.com

DEV COMMANDS:

Test function locally:

    modal run main.py

Serve function to ephemeral endpoint:

    modal serve main.py

Deploy function to persistent endpoint:

    modal deploy
"""

import modal
from modal import Image, web_endpoint

# Custom image to load libraries
tf_image = Image.debian_slim().pip_install("tensorflow[and-cuda]", "tensorflow_datasets", "boto3")

# get Modal Stub
stub = modal.Stub("mlbuilder")

"""
Serverless function

@stub.function(gpu="any", image=tf_image, secret=modal.Secret.from_name("my-aws-secret"))

    - gpu -> use available GPU
    - image -> use custom image
    - secret -> load AWS secrets to upload model to S3

@web_endpoint()

    - Attaches web endpoint to serverless function

"""
@stub.function(gpu="any", image=tf_image, secret=modal.Secret.from_name("my-aws-secret"))
@web_endpoint()
def run_model():

    # Import libraries
    import tensorflow as tf
    import tensorflow_datasets as tfds
    import boto3

    # Check for GPU
    physical_devices = tf.config.list_physical_devices('GPU')
    if len(physical_devices) > 0:
        tf.config.experimental.set_memory_growth(physical_devices[0], True)
        print("GPU available and memory growth configured.")
    else:
        print("No GPU available.")

    # Load MNIST dataset
    (ds_train, ds_test), ds_info = tfds.load(
        'mnist',
        split=['train', 'test'],
        shuffle_files=True,
        as_supervised=True,
        with_info=True,
    )

    # Process, Shuffle, Batch
    def normalize_img(image, label):
        """Normalizes images: `uint8` -> `float32`."""
        return tf.cast(image, tf.float32) / 255., label

    ds_train = ds_train.map(
        normalize_img, num_parallel_calls=tf.data.AUTOTUNE)
    ds_train = ds_train.cache()
    ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
    ds_train = ds_train.batch(128)
    ds_train = ds_train.prefetch(tf.data.AUTOTUNE)

    ds_test = ds_test.map(
    normalize_img, num_parallel_calls=tf.data.AUTOTUNE)
    ds_test = ds_test.batch(128)
    ds_test = ds_test.cache()
    ds_test = ds_test.prefetch(tf.data.AUTOTUNE)

    # Define model
    model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10)
    ])

    # Compile
    model.compile(
        optimizer=tf.keras.optimizers.Adam(0.001),
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
        metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
    )

    # Train
    model.fit(
        ds_train,
        epochs=10,
        validation_data=ds_test,
    )

    # Save model to local
    MODEL_PATH = "tmp/model.h5"
    model.save(MODEL_PATH)

    # Upload model to s3
    BUCKET_NAME = "mlbuilder-testbucket"
    MODEL_S3_FILE_NAME = "model.h5"
    s3_client = boto3.client('s3')
    s3_client.upload_file(MODEL_PATH, BUCKET_NAME, MODEL_S3_FILE_NAME)

    return {"body": "Success!"}


"""
For local testing, run:

    modal run main.py
"""
@stub.local_entrypoint()
def main():
    response = run_model.remote()
    print(response)