const { S3 } = require("aws-sdk");

const s3 = new S3({ apiVersion: "latest" });

const responseHeaders = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,GET",
};

exports.handler = async () => {
  const bucket = "image-repo-obonobo";
  const params = { Bucket: bucket };
  try {
    const data = await s3.listObjectsV2(params).promise();
    const response = {
      statusCode: 200,
      headers: responseHeaders,
      body: JSON.stringify(
        data.Contents.map((img) => ({
          file: img.Key,
          lastModified: img.LastModified,
          size: img.Size,
        }))
      ),
    };
    return response;
  } catch (err) {
    console.log(err);
    const message = `Failed when trying to list objects from bucket: ${bucket}`;
    console.log(message);
    throw new Error(message);
  }
};
