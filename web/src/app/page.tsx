"use client";

import Dropdown from "@/components/Dropdown";
import { useEffect, useState } from "react";
import { CloudFuncData } from "./api/train-model/route";
import { useRouter } from "next/navigation";

const taskOptions = [
  "Image Classification",
  "Text Classification",
  "Object Detection",
];

const frameworkOptions = ["TensorFlow", "PyTorch"];

const datasetOptions = {
  TensorFlow: ["MNIST", "fashion_mnist", "caltech101"],
  PyTorch: [""],
};

const learningRateOptions = [0.0001, 0.001, 0.01, 0.1, 1, 10];

const epochOptions = [1, 10, 20, 30, 40, 50, 100];

const batchSizeOptions = [1, 2, 4, 8, 16, 32, 64, 128, 256];

export default function HomePage() {
  const [task, setTask] = useState("Image Classification");
  const [framework, setFramework] = useState("TensorFlow");
  const [dataset, setDataset] = useState("MNIST");
  const [learningRate, setLearningRate] = useState(0.001);
  const [epochs, setEpochs] = useState(10);
  const [batchSize, setBatchSize] = useState(128);

  const router = useRouter();

  useEffect(() => {
    console.log(task);
    console.log(framework);
    console.log(dataset);
    console.log(learningRate);
    console.log(epochs);
    console.log(batchSize);
  }, [task, framework, dataset, learningRate, epochs, batchSize]);

  const train = () => {
    const config = {
      task,
      framework,
      dataset,
      learning_rate: learningRate,
      epochs,
      batch_size: batchSize,
      layers: [
        {
          type: "conv",
          filters: 16,
          kernel_size: 3,
          strides: 1,
          padding: "valid",
          activation: "relu",
        },
        {
          type: "pool",
          pool_size: 2,
          strides: 2,
          padding: "valid",
        },
        {
          type: "conv",
          filters: 32,
          kernel_size: 3,
          strides: 1,
          padding: "valid",
          activation: "relu",
        },
        {
          type: "pool",
          pool_size: 2,
          strides: 2,
          padding: "valid",
        },
        {
          type: "conv",
          filters: 64,
          kernel_size: 3,
          strides: 1,
          padding: "valid",
          activation: "relu",
        },
        {
          type: "pool",
          pool_size: 2,
          strides: 2,
          padding: "valid",
        },

        {
          type: "flatten",
        },
      ],
    };

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
      <section className="grid grid-cols-2 gap-5">
        <Dropdown
          name="task"
          options={taskOptions}
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />
        <Dropdown
          name="framework"
          options={frameworkOptions}
          value={framework}
          onChange={(event) => setFramework(event.target.value)}
        />
        <Dropdown
          name="dataset"
          options={
            framework == "TensorFlow"
              ? datasetOptions.TensorFlow
              : datasetOptions.PyTorch
          }
          value={dataset}
          onChange={(event) => setDataset(event.target.value)}
        />
      </section>
      <h1 className="mt-10">Numbers</h1>
      <section className="grid grid-cols-2 gap-5">
        <Dropdown
          name="learning rate"
          title="Learning Rate"
          options={learningRateOptions}
          value={learningRate}
          onChange={(event) => setLearningRate(parseFloat(event.target.value))}
        />
        <Dropdown
          name="epoch"
          title="Epochs"
          options={epochOptions}
          value={epochs}
          onChange={(event) => setEpochs(parseInt(event.target.value))}
        />
        <Dropdown
          name="batch size"
          title="Batch Size"
          options={batchSizeOptions}
          value={batchSize}
          onChange={(event) => setBatchSize(parseInt(event.target.value))}
        />
      </section>
    </main>
  );
}
