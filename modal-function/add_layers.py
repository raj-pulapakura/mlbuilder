from input_types import Config

def add_layers(model, config: Config):
    import tensorflow as tf
    for layer in config.layers:
        print(layer)
        if layer.type == "conv":
            filters = layer.filters or 16
            kernel_size = layer.kernel_size or 3
            strides = layer.strides or 1
            padding = layer.padding or "valid"
            activation = layer.activation or None
            model.add(tf.keras.layers.Conv2D(filters=filters, kernel_size=kernel_size, strides=strides, padding=padding, activation=activation))
        elif layer.type == "pool":
            pool_size = layer.pool_size or 2
            strides = layer.strides or None
            padding = layer.padding or "valid"
            model.add(tf.keras.layers.MaxPooling2D(pool_size=pool_size, strides=strides, padding=padding))
        elif layer.type == "dropout":
            rate = layer.rate or 0.5
            model.add(tf.keras.layers.Dropout(rate=rate))
        elif layer.type == "batchnorm":
            model.add(tf.keras.layers.BatchNormalization())
        elif layer.type == "flatten":
            model.add(tf.keras.layers.Flatten())
        elif layer.type == "dense":
            units = layer.units or 10
            activation = layer.activation or None
            model.add(tf.keras.layers.Dense(units=units, activation=activation))
        elif layer.type == "textvectorization": # shouldn't be used
            pass
        elif layer.type == "embedding":
            input_dim = layer.input_dim
            output_dim = layer.output_dim
            model.add(tf.keras.layers.Embedding(input_dim=input_dim, output_dim=output_dim))
        elif layer.type == "globalaveragepooling1d":
            model.add(tf.keras.layers.GlobalAveragePooling1D())
    return model