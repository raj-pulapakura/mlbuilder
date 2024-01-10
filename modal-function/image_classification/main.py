from .helpers import normalize_image, resize_image
from input_types import Config
from add_layers import add_layers

def image_classification_model(config: Config):

    import tensorflow as tf
    import tensorflow_datasets as tfds

    # Load dataset
    print("downloading dataset...")
    (ds_train, ds_test), ds_info = tfds.load(
        config.dataset,
        split=['train', 'test'],
        shuffle_files=True,
        as_supervised=True,
        with_info=True,
    )

    input_shape = ds_info.features["image"].shape
    num_classes = ds_info.features["label"].num_classes

    # Resize images if inputs are of variable size
    print("resizing")
    if input_shape[0] == None:
        resize = True
        input_shape = (256, 256, input_shape[2])
    else:
        resize = False

    print("processing")
    # Process, Shuffle, Batch
    ds_train = ds_train.map(
        normalize_image, num_parallel_calls=tf.data.AUTOTUNE)
    if resize:
        ds_train = ds_train.map(resize_image, num_parallel_calls=tf.data.AUTOTUNE)
    ds_train = ds_train.cache()
    ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
    ds_train = ds_train.batch(config.batch_size) # batch
    ds_train = ds_train.prefetch(tf.data.AUTOTUNE)

    ds_test = ds_test.map(
    normalize_image, num_parallel_calls=tf.data.AUTOTUNE)
    if resize:
        ds_test = ds_test.map(resize_image, num_parallel_calls=tf.data.AUTOTUNE)
    ds_test = ds_test.batch(config.batch_size) # batch
    ds_test = ds_test.cache()
    ds_test = ds_test.prefetch(tf.data.AUTOTUNE)

    print("building model")
    # Define model
    model = tf.keras.models.Sequential()

    # Define input layer
    model.add(tf.keras.layers.InputLayer(input_shape=input_shape))

    # Add layers
    model = add_layers(model, config)

    # Add classification layer
    model.add(tf.keras.layers.Dense(units=num_classes, activation="softmax"))

    print("training")
    # Compile
    model.compile(
        optimizer=tf.keras.optimizers.Adam(config.learning_rate or 0.01), # learning rate
        loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
        metrics=[tf.keras.metrics.SparseCategoricalAccuracy()],
    )

    # Train
    model.fit(
        ds_train,
        epochs=config.epochs, # epochs
        validation_data=ds_test,
    )

    model.summary()

    return model