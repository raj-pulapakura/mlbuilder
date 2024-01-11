import { ConfigLayer } from "@/types/Config";

export interface NoParamsInputProps {
  layer: ConfigLayer;
}

export default function NoParamsInput({ layer }: NoParamsInputProps) {
  return <h1>{layer.type}</h1>;
}
