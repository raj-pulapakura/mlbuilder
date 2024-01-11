import { Config, ConfigLayer } from "@/types/Config";
import { taskOptions } from "./configOptions";

export const defaultLayers: { [key: string]: ConfigLayer[] } = {
  "Image Classification": [
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
  "Text Classification": [
    {
      type: "textvectorization",
      max_tokens: 10000,
      output_sequence_length: 250,
    },
    {
      type: "embedding",
      input_dim: 250,
      output_dim: 16,
    },
    {
      type: "dropout",
      rate: 0.2,
    },
    {
      type: "globalaveragepooling1d",
    },
    {
      type: "dropout",
      rate: 0.2,
    },
  ],
};

const defaultConfig: Config = {
  task: "Image Classification",
  framework: "TensorFlow",
  dataset: "MNIST",
  learning_rate: 0.001,
  epochs: 10,
  batch_size: 128,
  layers: defaultLayers["Image Classification"],
};

export default defaultConfig;
