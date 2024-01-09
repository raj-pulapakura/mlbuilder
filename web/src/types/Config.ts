import {
  BatchNorm,
  ConvLayer,
  Dense,
  Dropout,
  Flatten,
  PoolLayer,
} from "./Layers";

export interface Config {
  dataset: string;
  framework: string;
  task: string;
  epochs: number;
  learning_rate: number;
  batch_size: number;
  layers: (ConvLayer | PoolLayer | Dropout | BatchNorm | Flatten | Dense)[];
}
