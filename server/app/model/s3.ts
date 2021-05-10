import { S3 } from "aws-sdk";

export const BUCKET = process.env.S3_BUCKET;
const s3 = new S3({ apiVersion: "latest" });
export default s3;
