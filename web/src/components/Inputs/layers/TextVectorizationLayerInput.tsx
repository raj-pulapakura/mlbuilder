import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function TextVectorizationLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "textvectorization") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="max_tokens"
        title="max_tokens"
        options={[10000]}
        value={layer.max_tokens}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.max_tokens = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
      <Dropdown
        name="output_sequence_length"
        title="output_sequence_length"
        options={[250]}
        value={layer.max_tokens}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.output_sequence_length = parseInt(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
    </div>
  );
}
