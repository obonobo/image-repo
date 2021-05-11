import { APIGatewayEvent } from "aws-lambda";
import { AWSError, S3 } from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import imageType from "image-type";
import { BUCKET } from "../model/s3";

export type S3Params =
  | S3.PutObjectRequest
  | S3.ListObjectsRequest
  | S3.GetObjectRequest;

export default class ImageRepoService {
  private s3: S3;

  constructor(s3: S3 = null) {
    this.s3 = s3 ?? new S3({ apiVersion: "latest" });
  }

  protected async getHelloMessage(): Promise<{ hi: string }> {
    return { hi: "Hello World" };
  }

  protected async addNewImageToS3(
    event: APIGatewayEvent
  ): Promise<S3.ManagedUpload.SendData> {
    const bodyAsJson = this.decodeEventBodyBase64(event);
    const decodedImage = this.decodeImage(bodyAsJson?.file?.bytes);

    const params = this.createS3Params({
      type: "create",
      bodyAsJson,
      decodedImage,
    });

    return this.uploadToS3(params);
  }

  protected async listItemsInS3(): Promise<
    PromiseResult<S3.ListObjectsV2Output, AWSError>
  > {
    const s3Params = this.createS3Params({ type: "list" });
    return this.s3.listObjectsV2(s3Params).promise();
  }

  protected async retreiveItemByName(
    name: string
  ): Promise<PromiseResult<S3.GetObjectOutput, AWSError>> {
    const params = this.createS3Params({ type: "retrieve", name });
    return this.s3.getObject(params as S3.GetObjectRequest).promise();
  }

  protected isNotImage(s3Response: S3.GetObjectOutput): boolean {
    return (
      !/^image\/.*$/.test(s3Response.ContentType) ||
      !imageType(s3Response.Body as Buffer)
    );
  }

  private async uploadToS3(params: S3Params) {
    return this.s3.upload(params as S3.PutObjectRequest).promise();
  }

  private createS3Params({
    type,
    bodyAsJson,
    decodedImage,
    name,
  }: {
    type: "create" | "list" | "retrieve";
    bodyAsJson?: any;
    decodedImage?: Buffer;
    name?: string;
  }): S3Params {
    let params: S3Params = { Bucket: BUCKET };
    switch (type) {
      case "create":
        params = {
          ...params,
          ContentType: "image/jpeg",
          Key: bodyAsJson?.file?.filename ?? "_.jpeg",
          Body: decodedImage,
        };
        break;
      case "retrieve":
        params = {
          ...params,
          Key: name,
        };
        break;
      case "list":
        break;
      default:
        break;
    }
    console.log("Creating S3 params...", params);
    return params;
  }

  private decodeEventBodyBase64(event: APIGatewayEvent) {
    const decoded = JSON.parse(Buffer.from(event?.body, "base64").toString());
    console.log("Decoding event body...", decoded);
    return decoded;
  }

  private decodeImage(base64String: string) {
    const decoded = Buffer.from(this.trimBase64(base64String ?? ""), "base64");
    console.log("Decoding image from event body...", decoded);
    return decoded;
  }

  private trimBase64(encoded: string) {
    return encoded.replace(/^data:image\/[a-z]+;base64,/, "");
  }
}
