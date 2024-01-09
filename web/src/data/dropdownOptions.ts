export const taskOptions = [
  "Image Classification",
  "Text Classification",
  "Object Detection",
];

export const frameworkOptions = ["TensorFlow", "PyTorch"];

export const datasetOptions = {
  TensorFlow: ["MNIST", "fashion_mnist", "caltech101"],
  PyTorch: [""],
};

export const learningRateOptions = [0.0001, 0.001, 0.01, 0.1, 1, 10];

export const epochOptions = [1, 10, 20, 30, 40, 50, 100];

export const batchSizeOptions = [1, 2, 4, 8, 16, 32, 64, 128, 256];
