import { Config, ConfigLayer } from "@/types/Config";
import { Dispatch, ReactNode, SetStateAction } from "react";
import ConvLayerInput from "./layers/ConvLayerInput";
import PoolLayerInput from "./layers/PoolLayerInput";
import NoParamsInput from "./layers/NoParamsInput";
import DenseLayerInput from "./layers/DenseLayerInput";
import DropoutLayerInput from "./layers/DropoutLayerInput";
import EmbeddingLayerInput from "./layers/EmbeddingLayerInput";
import TextVectorizationLayerInput from "./layers/TextVectorizationLayerInput";

export interface LayerInputProps {
  layer: ConfigLayer;
  layerIndex: number;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export default function LayerInput({
  layer,
  layerIndex,
  config,
  setConfig,
}: LayerInputProps) {
  let inputComponent: ReactNode;
  switch (layer.type) {
    case "batchnorm":
    case "flatten":
    case "globalaveragepooling1d":
      inputComponent = <NoParamsInput layer={layer} key={layerIndex} />;
      break;
    case "conv":
      inputComponent = (
        <ConvLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    case "pool":
      inputComponent = (
        <PoolLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    case "dense":
      inputComponent = (
        <DenseLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    case "dropout":
      inputComponent = (
        <DropoutLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    case "embedding":
      inputComponent = (
        <EmbeddingLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    case "textvectorization":
      inputComponent = (
        <TextVectorizationLayerInput
          layerIndex={layerIndex}
          layer={layer}
          config={config}
          setConfig={setConfig}
        />
      );
      break;
    default:
      throw Error("invalid layer type");
  }

  return <div className="flex">{inputComponent}</div>;
}
