import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function DenseLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "dense") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="units"
        title="units"
        options={[16, 32, 64, 128, 256, 512]}
        value={layer.units}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.units = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="activation"
        title="activation"
        options={["sigmoid", "relu", "tanh"]}
        value={layer.activation}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.activation = value;
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
    </div>
  );
}
