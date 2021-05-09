const { S3 } = require("aws-sdk");
const imageType = require("image-type");

const s3 = new S3({ apiVersion: "latest" });

const responseHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET",
};

const notFound = {
  statusCode: 404,
  body: null,
};

const isNotImage = (s3Response) =>
  !/^image\/.*$/.test(s3Response.ContentType) || !imageType(s3Response.Body);

exports.handler = async (event) => {
  const {
    pathParameters: { name },
  } = event;

  if (!name) return notFound;

  try {
    const s3Response = await s3
      .getObject({
        Bucket: "image-repo-obonobo",
        Key: name,
      })
      .promise();

    if (isNotImage(s3Response)) return notFound;

    const response = {
      statusCode: 200,
      isBase64Encoded: true,
      headers: { ...responseHeaders, "Content-Type": s3Response.ContentType },
      body: s3Response.Body.toString("base64"),
    };

    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
