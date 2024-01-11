"use client";

import Dropdown from "@/components/Inputs/Dropdown";
import { useEffect, useState } from "react";
import { CloudFuncData } from "./api/train-model/route";
import { useRouter } from "next/navigation";
import {
  taskOptions,
  frameworkOptions,
  datasetOptions,
  learningRateOptions,
  epochOptions,
  batchSizeOptions,
} from "@/data/configOptions";
import Code from "@/components/Code";
import defaultConfig, { defaultLayers } from "@/data/defaultConfig";
import { Config } from "@/types/Config";
import ConvLayerInput from "@/components/Inputs/layers/ConvLayerInput";
import PoolLayerInput from "@/components/Inputs/layers/PoolLayerInput";
import LayerInput from "@/components/Inputs/LayerInput";

export default function HomePage() {
  const [config, setConfig] = useState<Config>(defaultConfig);

  const router = useRouter();

  useEffect(() => {
    console.log(config);
  }, [config]);

  const train = () => {
    console.log("API Request Sent!");

    fetch("/api/train-model", {
      body: JSON.stringify(config),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((data: CloudFuncData) => {
        console.log(data);
        if (data.status == 200) {
          router.push("inference");
        }
      });
  };

  return (
    <main className="p-10">
      <h1>ML Builder</h1>
      <button className="bg-slate-100" onClick={train}>
        Train
      </button>
      <div className="grid grid-cols-2">
        <div>
          {/* task, framework dataset */}
          <section className="grid grid-cols-2 gap-5">
            <Dropdown
              name="task"
              options={taskOptions}
              value={config.task}
              onChange={(value) =>
                setConfig({
                  ...config,
                  task: value,
                  dataset:
                    datasetOptions[
                      config.framework as keyof typeof datasetOptions
                    ][value as keyof typeof datasetOptions.TensorFlow][0],
                  layers: defaultLayers[value as keyof typeof defaultLayers],
                })
              }
            />
            <Dropdown
              name="framework"
              options={frameworkOptions}
              value={config.framework}
              onChange={(value) => setConfig({ ...config, framework: value })}
            />
            <Dropdown
              name="dataset"
              options={
                datasetOptions[config.framework as keyof typeof datasetOptions][
                  config.task as keyof typeof datasetOptions.TensorFlow
                ]
              }
              value={config.dataset}
              onChange={(value) => setConfig({ ...config, dataset: value })}
            />
          </section>
          {/* learning rate, epochs, batch size, */}
          <section className="grid grid-cols-2 gap-5">
            <Dropdown
              name="learning rate"
              title="Learning Rate"
              options={learningRateOptions}
              value={config.learning_rate}
              onChange={(value) =>
                setConfig({
                  ...config,
                  learning_rate: parseFloat(value),
                })
              }
            />
            <Dropdown
              name="epoch"
              title="Epochs"
              options={epochOptions}
              value={config.epochs}
              onChange={(value) =>
                setConfig({ ...config, epochs: parseInt(value) })
              }
            />
            <Dropdown
              name="batch size"
              title="Batch Size"
              options={batchSizeOptions}
              value={config.batch_size}
              onChange={(value) =>
                setConfig({
                  ...config,
                  batch_size: parseInt(value),
                })
              }
            />
          </section>
          {/* layers */}
          <h1>Layers</h1>
          <section>
            {config.layers.map((layer, index) => (
              <LayerInput
                key={index}
                layer={layer}
                layerIndex={index}
                config={config}
                setConfig={setConfig}
              />
            ))}
          </section>
        </div>
        {/* <Code config={config} setConfig={setConfig} /> */}
      </div>
    </main>
  );
}
