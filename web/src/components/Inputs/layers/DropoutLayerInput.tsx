import Dropdown from "../Dropdown";
import { LayerInputProps } from "../LayerInput";

export default function DropoutLayerInput({
  layerIndex,
  layer,
  config,
  setConfig,
}: LayerInputProps) {
  if (layer.type != "dropout") {
    throw Error("layer mismatch");
  }

  return (
    <div className="flex">
      <Dropdown
        name="rate"
        title="rate"
        options={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
        value={layer.rate}
        onChange={(value) => {
          let updatedLayer = { ...layer };
          updatedLayer.rate = parseFloat(value);
          let layers = [...config.layers];
          layers[layerIndex] = updatedLayer;
          setConfig({ ...config, layers });
        }}
      />
    </div>
  );
}
