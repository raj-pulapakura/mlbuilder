from pydantic import BaseModel
from typing import List, Union
from .layers import ConvLayer, PoolLayer, Dropout, BatchNorm, Flatten, Dense, TextVectorization, Embedding, GlobalAveragePooling1D

class Config(BaseModel):
    dataset: str
    framework: str
    task: str
    epochs: int
    learning_rate: float
    batch_size: int
    layers: List[Union[ConvLayer, PoolLayer, Dropout, BatchNorm, Flatten, Dense, TextVectorization, Embedding, GlobalAveragePooling1D]]