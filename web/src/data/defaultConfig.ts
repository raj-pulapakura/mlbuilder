import { Config } from "@/types/Config";

const defaultConfig: Config = {
  task: "Image Classification",
  framework: "TensorFlow",
  dataset: "MNIST",
  learning_rate: 0.001,
  epochs: 10,
  batch_size: 128,
  layers: [
    {
      type: "conv",
      filters: 16,
      kernel_size: 3,
      strides: 1,
      padding: "valid",
      activation: "relu",
    },
    {
      type: "pool",
      pool_size: 2,
      strides: 2,
      padding: "valid",
    },
    {
      type: "conv",
      filters: 32,
      kernel_size: 3,
      strides: 1,
      padding: "valid",
      activation: "relu",
    },
    {
      type: "pool",
      pool_size: 2,
      strides: 2,
      padding: "valid",
    },
    {
      type: "conv",
      filters: 64,
      kernel_size: 3,
      strides: 1,
      padding: "valid",
      activation: "relu",
    },
    {
      type: "pool",
      pool_size: 2,
      strides: 2,
      padding: "valid",
    },

    {
      type: "flatten",
    },
  ],
};

export default defaultConfig;
