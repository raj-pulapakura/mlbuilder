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
} from "@/data/dropdownOptions";
import Code from "@/components/Code";
import defaultConfig from "@/data/defaultConfig";
import { Config } from "@/types/Config";

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
            {config.layers.map((layer, index) => {
              switch (layer.type) {
                case "conv":
                  return (
                    <div className="flex" key={index}>
                      <Dropdown
                        name="filters"
                        title="filters"
                        options={[16, 32, 64, 128, 256, 512]}
                        value={layer.filters}
                        onChange={(value) => {
                          let updatedLayer = { ...layer };
                          updatedLayer.filters = parseInt(value);
                          let layers = [...config.layers];
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
                          setConfig({ ...config, layers });
                        }}
                      />
                    </div>
                  );
                case "pool":
                  return (
                    <div className="flex" key={index}>
                      <Dropdown
                        name="pool size"
                        title="pool size"
                        options={[1, 2, 3, 4, 5, 6, 7]}
                        value={layer.pool_size}
                        onChange={(value) => {
                          let updatedLayer = { ...layer };
                          updatedLayer.pool_size = parseInt(value);
                          let layers = [...config.layers];
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
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
                          layers[index] = updatedLayer;
                          setConfig({ ...config, layers });
                        }}
                      />
                    </div>
                  );
                default:
                  return <></>;
              }
            })}
          </section>
        </div>

        <Code config={config} setConfig={setConfig} />
      </div>
    </main>
  );
}
