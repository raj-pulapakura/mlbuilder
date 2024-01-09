import { Config } from "@/types/Config";
import { Dispatch, SetStateAction } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export interface CodeProps {
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export default function Code({ config, setConfig }: CodeProps) {
  console.log(config.layers);
  return (
    <SyntaxHighlighter className="max-h-96" language="python" style={dracula}>
      {config.framework.toLowerCase() == "tensorflow"
        ? config.task.toLowerCase() == "image classification" &&
          config.dataset.toLowerCase() == "mnist"
          ? `import tensorflow as tf
import tensorflow_datasets as tfds  

# Load dataset
(ds_train, ds_test), ds_info = tfds.load(
  dataset="${config.dataset}",
  split=['train', 'test'],
  shuffle_files=True, 
  as_supervised=True, 
  with_info=True, 
)

def normalize_image(image, label):
  return tf.cast(image, tf.float32) / 255., label

# Normalize train dataset
ds_train = ds_train.map(
   normalize_image, num_parallel_calls=tf.data.AUTOTUNE)
# Cache, shuffle, batch, and load train dataset
ds_train = ds_train.cache()
ds_train = ds_train.shuffle(ds_info.splits['train'].num_examples)
ds_train = ds_train.batch(config.batch_size)
ds_train = ds_train.prefetch(tf.data.AUTOTUNE)

# Normalize test dataset
ds_test = ds_test.map(
normalize_image, num_parallel_calls=tf.data.AUTOTUNE)
# Cache, batch, and load test dataset
ds_test = ds_test.batch(config.batch_size)
ds_test = ds_test.cache()
ds_test = ds_test.prefetch(tf.data.AUTOTUNE)

# Define model
model = tf.keras.models.Sequential()

# Define input layer
model.add(tf.keras.layers.InputLayer(input_shape=input_shape))

# Add model layers
${config.layers.map((layer) => {
  switch (layer.type) {
    case "conv":
      return `\nmodel.add(tf.keras.layers.Conv2D(filters=${layer.filters}, kernel_size=${layer.kernel_size}, strides=${layer.strides}, padding=${layer.padding}, activation=${layer.activation}))`;
    case "pool":
      return `\nmodel.add(tf.keras.layers.MaxPooling2D(pool_size=${layer.pool_size}, strides=${layer.strides}, padding=${layer.padding}))`;
    case "dropout":
      return `\nmodel.add(tf.keras.layers.Dropout(rate=${layer.rate}))`;
    case "batchnorm":
      return `\nmodel.add(tf.keras.layers.BatchNormalization())`;
    case "flatten":
      return `\nmodel.add(tf.keras.layers.Flatten())`;
    case "dense":
      return `\nmodel.add(tf.keras.layers.Dense(units=${layer.units}, activation=${layer.activation}))`;
  }
})}

# Add classification layer
model.add(tf.keras.layers.Dense(units=num_classes, activation="softmax"))

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
`
          : ``
        : "pytorch code"}
    </SyntaxHighlighter>
  );
}
