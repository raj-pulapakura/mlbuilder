from input_types import Config
from add_layers import add_layers

def text_classification_model(config: Config):

    import tensorflow as tf
    import tensorflow_datasets as tfds

    if config.layers[0].type != "textvectorization":
        raise Exception("First layer of text classification model must be textvectorization")

    # Load dataset
    print("downloading dataset...")
    (ds_train, ds_test), ds_info = tfds.load(
        config.dataset,
        split=['train', 'test'],
        shuffle_files=True,
        as_supervised=True,
        with_info=True,
    )

    num_classes = ds_info.features["label"].num_classes

    print("processing")
    # Process, Shuffle, Batch
    ds_train = ds_train.cache()
    ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
    ds_train = ds_train.batch(config.batch_size)
    ds_train = ds_train.prefetch(tf.data.AUTOTUNE)

    ds_test = ds_test.batch(config.batch_size)
    ds_test = ds_test.cache()
    ds_test = ds_test.prefetch(tf.data.AUTOTUNE)

    print("building model")
    # Define model
    model = tf.keras.models.Sequential()

    print(config.layers)

    # Define TextVectorization layer
    vectorize_layer = tf.keras.layers.TextVectorization(
        max_tokens=config.layers[0].max_tokens,
        output_mode='int',
        output_sequence_length=config.layers[0].output_sequence_length)
    
    # Adapt TextVectorization to training dataset
    train_text = ds_train.map(lambda x, y: x)
    vectorize_layer.adapt(train_text)

    # Define input layer
    model = tf.keras.Sequential([vectorize_layer])

    # Add layers
    model = add_layers(model, config)

    # Add classification layer and compile
    if num_classes <= 2:
        model.add(tf.keras.layers.Dense(1, activation="sigmoid"))
        model.compile(
            optimizer=tf.keras.optimizers.Adam(config.learning_rate or 0.01),
            loss=tf.keras.losses.BinaryCrossentropy(from_logits=False),
            metrics=["accuracy"],
        )
    else:
        model.add(tf.keras.layers.Dense(num_classes, activation="softmax"))
        model.compile(
            optimizer=tf.keras.optimizers.Adam(config.learning_rate or 0.01),
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