console.log("Loading function");
const aws = require("aws-sdk");
const s3 = new aws.S3({ apiVersion: "2006-03-01" });

exports.handler = async (event, context) => {
  const bucket = "image-repo-obonobo";
  const params = { Bucket: bucket };
  try {
    const data = await s3.listObjectsV2(params).promise();
    const response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {},
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
