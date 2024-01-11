import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function EmbeddingLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "embedding") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="input_dim"
        title="input_dim"
        options={[250]}
        value={layer.input_dim}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.input_dim = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="output_dim"
        title="output_dim"
        options={[16]}
        value={layer.output_dim}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.output_dim = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
    </div>
  );
}
