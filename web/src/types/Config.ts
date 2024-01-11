import {
  BatchNorm,
  ConvLayer,
  Dense,
  Dropout,
  Flatten,
  PoolLayer,
  Embedding,
  GlobalAveragePooling1D,
  TextVectorization,
} from "./Layers";

export type ConfigLayer =
  | ConvLayer
  | PoolLayer
  | Dropout
  | BatchNorm
  | Flatten
  | Dense
  | Embedding
  | GlobalAveragePooling1D
  | TextVectorization;

export interface Config {
  dataset: string;
  framework: string;
  task: string;
  epochs: number;
  learning_rate: number;
  batch_size: number;
  layers: ConfigLayer[];
}
