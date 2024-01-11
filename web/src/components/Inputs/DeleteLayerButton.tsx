import { Config } from "@/types/Config";
import { Dispatch, SetStateAction } from "react";

export interface DeleteLayerButtonProps {
  layerIndex: number;
  config: Config;
  setConfig: Dispatch<SetStateAction<Config>>;
}

export default function DeleteLayerButton({
  layerIndex,
  config,
  setConfig,
}: DeleteLayerButtonProps) {
  return (
    <button
      className="bg-gray-500"
      onClick={() => {
        let layers = [...config.layers];
        layers.splice(layerIndex, 1); // remove layer at layerIndex
        setConfig({ ...config, layers });
      }}
    >
      Delete
    </button>
  );
}
