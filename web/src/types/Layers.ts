interface Layer {
  type: string;
}

export interface ConvLayer extends Layer {
  type: "conv";
  filters: number;
  kernel_size: number;
  strides: number;
  padding: string;
  activation: string;
}

export interface PoolLayer extends Layer {
  type: "pool";
  pool_size: number;
  strides: number;
  padding: string;
}

export interface Dropout extends Layer {
  type: "dropout";
  rate: number;
}

export interface BatchNorm extends Layer {
  type: "batchnorm";
}

export interface Flatten extends Layer {
  type: "flatten";
}

export interface Dense extends Layer {
  type: "dense";
  units: number;
  activation: string;
}
