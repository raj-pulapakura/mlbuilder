const DEV_CLOUD_FUNC =
  "https://raj-pulapakura--mlbuilder-run-model-dev.modal.run";

export interface CloudFuncData {
  status: number;
  message: string;
}

export async function POST(request: Request) {
  try {
    const config = await request.json();

    console.log("Sending config to cloud function");

    const cloudFuncResponse = await fetch(DEV_CLOUD_FUNC, {
      body: JSON.stringify(config),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    console.log("Done!");

    const cloudFuncData: CloudFuncData = await cloudFuncResponse.json();

    return Response.json(cloudFuncData);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    return Response.json({ error });
  }
}
