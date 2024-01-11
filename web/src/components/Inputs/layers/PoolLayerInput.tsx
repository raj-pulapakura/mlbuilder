import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function PoolLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "pool") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="pool size"
        title="pool size"
        options={[1, 2, 3, 4, 5, 6, 7]}
        value={layer.pool_size}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.pool_size = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="strides"
        title="strides"
        options={[1, 2, 3, 4]}
        value={layer.strides}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.strides = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="padding"
        title="padding"
        options={["valid", "same"]}
        value={layer.padding}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.padding = value;
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
    </div>
  );
}
