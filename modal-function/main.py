"""
Serverless function to:
1. Train model on Modal with GPU
2. Upload trained model file (model.h5) to S3 bucket

Modal : https://modal.com

DEV COMMANDS:

Test function locally (remove the @web_endpoint() decorator):

    modal run main.py

Serve function to ephemeral endpoint:

    modal serve main.py

Deploy function to persistent endpoint:

    modal deploy
"""

import modal
from modal import Image, web_endpoint
from input_types import Config

from image_classification.main import image_classification_model

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
@web_endpoint(method="POST")
def run_model(config: Config):

    try:
        print("CONFIGURATION")
        print(config)

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

        if config.task.lower() == "image classification":
            print("IMAGE CLASSIFICATION")
            model = image_classification_model(config)

        # Save model to local
        print("Saving model...")
        MODEL_PATH = "tmp/model.h5"
        model.save(MODEL_PATH)
        print("Saved!")

        # Upload model to s3
        print("Uploading to S3...")
        BUCKET_NAME = "mlbuilder-testbucket"
        MODEL_S3_FILE_NAME = "model.h5"
        s3_client = boto3.client('s3')
        s3_client.upload_file(MODEL_PATH, BUCKET_NAME, MODEL_S3_FILE_NAME)
        print("Uploaded")

        return {
            "status": 200,
            "message": "model trained and uploaded to s3"
        }

    except Exception as e:
        print(e)
        return {
            "status": 500,
            "message": e
        }

"""
For local testing, run:

    modal run main.py
"""
@stub.local_entrypoint()
def main():
    response = run_model.remote()
    print(response)