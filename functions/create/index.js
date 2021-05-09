const { S3 } = require("aws-sdk");

const s3 = new S3({ apiVersion: "latest" });

const responseHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET",
};

const trimBase64 = (encoded) =>
  encoded.replace(/^data:image\/[a-z]+;base64,/, "");

exports.handler = async (event) => {
  const bodyAsJson = JSON.parse(Buffer.from(event.body, "base64").toString());
  console.log(bodyAsJson);

  const decodedImage = Buffer.from(
    trimBase64(bodyAsJson?.file?.bytes),
    "base64"
  );

  console.log(decodedImage.toString());

  const s3Params = {
    Bucket: "image-repo-obonobo",
    ContentType: "image/jpeg",
    Key: bodyAsJson?.file?.filename ?? "_.jpeg",
    Body: decodedImage,
  };

  try {
    await s3.upload(s3Params).promise();
    return {
      statusCode: 200,
      headers: responseHeaders,
      body: "Upload success!",
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
