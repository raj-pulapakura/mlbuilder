import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3client = new S3Client({
  region: process.env.REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

const getModelBufferFromS3 = async () => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME!,
    Key: "model.h5",
  });

  try {
    const s3response = await s3client.send(command);
    const bytearray = await s3response.Body?.transformToByteArray();
    console.log(bytearray);

    if (!bytearray) {
      throw Error("Couldn't convert model to bytearray");
    }

    return bytearray.buffer;
  } catch (err) {
    console.error(err);
  }
};

export default async function GET(request: Request) {
  try {
    const modelBuffer = await getModelBufferFromS3();

    return new Response(modelBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=model.h5",
      },
    });
  } catch (error) {
    return Response.json({ error });
  }
}
