from pydantic import BaseModel, Field
from typing import List, Union, Literal

class Layer(BaseModel):
    type: str

class ConvLayer(Layer):
    type: Literal["conv"] = "conv"
    filters: int
    kernel_size: int
    strides: int
    padding: str
    activation: str

class PoolLayer(Layer):
    type: Literal["pool"] = "pool"
    pool_size: int
    strides: int
    padding: str

class Dropout(Layer):
    type: Literal["dropout"] = "dropout"
    rate: float

class BatchNorm(Layer):
    type: Literal["batchnorm"] = "batchnorm"

class Flatten(Layer):
    type: Literal["flatten"] = "flatten"

class Dense(Layer):
    type: Literal["dense"] = "dense"
    units: int
    activation: str

class TextVectorization(Layer):
    type: Literal["textvectorization"] = "textvectorization"
    max_tokens: int
    output_sequence_length: int

class Embedding(Layer):
    type: Literal["embedding"] = "embedding"
    input_dim: int
    output_dim: int

class GlobalAveragePooling1D(Layer):
    type: Literal["globalaveragepooling1d"] = "globalaveragepooling1d"

class Config(BaseModel):
    dataset: str
    framework: str
    task: str
    epochs: int
    learning_rate: float
    batch_size: int
    layers: List[Union[ConvLayer, PoolLayer, Dropout, BatchNorm, Flatten, Dense, TextVectorization, Embedding, GlobalAveragePooling1D]]