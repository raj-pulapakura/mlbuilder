from pydantic import BaseModel
from typing import List

class Layer(BaseModel):
    type: str

class ConvLayer(Layer):
    type: str = "conv"
    filters: int
    kernel_size: int
    strides: int
    padding: str
    activation: str

class PoolLayer(Layer):
    type: str = "pool"
    pool_size: int
    strides: int
    padding: str

class Dropout(Layer):
    type: str = "dropout"
    rate: int

class BatchNorm(Layer):
    type: str = "batchnorm"

class Flatten(Layer):
    type: str = "flatten"

class Dense(Layer):
    type: str = "dense"
    units: int
    activation: str

class Config(BaseModel):
    dataset: str
    framework: str
    task: str
    epochs: int
    learning_rate: float
    batch_size: int
    layers: List[ConvLayer | PoolLayer | Dropout | BatchNorm | Flatten | Dense]