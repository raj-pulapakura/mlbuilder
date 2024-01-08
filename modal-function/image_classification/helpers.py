def normalize_image(image, label):
    """Normalizes images: `uint8` -> `float32`."""
    import tensorflow as tf
    return tf.cast(image, tf.float32) / 255., label

def resize_image(image, label):
  import tensorflow as tf
  image = tf.image.resize(image, (256, 256))
  return image, label