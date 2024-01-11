import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function ConvLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "conv") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="filters"
        title="filters"
        options={[16, 32, 64, 128, 256, 512]}
        value={layer.filters}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.filters = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="kernel size"
        title="kernel size"
        options={[1, 2, 3, 4, 5, 6, 7]}
        value={layer.kernel_size}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.kernel_size = parseInt(value);
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
