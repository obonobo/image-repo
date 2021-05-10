import { S3 } from "aws-sdk";

export enum StatusCode {
  success = 200,
  notFound = 404,
  unprocessableEntity = 422,
  clientError = 400,
}

export type PreparedResult = {
  statusCode: number;
  body?: string;
  isBase64Encoded?: boolean;
  headers?: { [key: string]: string };
};

export class Result {
  static headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,GET",
  };

  private statusCode: number;
  private message: string;
  private data?: unknown;
  private isBase64Encoded: boolean;

  constructor(
    statusCode: number,
    message: string,
    data?: unknown,
    isBase64Encoded = false
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.isBase64Encoded = isBase64Encoded;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString(
    bodyFactory = (res: Result) =>
      JSON.stringify({
        message: res.message,
        data: res.data,
      })
  ): PreparedResult {
    return {
      statusCode: this.statusCode,
      headers: Result.headers,
      isBase64Encoded: this.isBase64Encoded,
      body: bodyFactory(this),
    };
  }
}

export default class MessageUtils {
  static success(
    data: unknown = null,
    isBase64Encoded = false
  ): PreparedResult {
    const result = new Result(
      StatusCode.success,
      "success",
      data,
      isBase64Encoded
    );
    return result.bodyToString();
  }

  static error(message: string, code = StatusCode.clientError): PreparedResult {
    const result = new Result(code, message);
    const stringified = result.bodyToString();
    console.log(stringified);
    return stringified;
  }

  static imageNotFoundResponse(name: string): PreparedResult {
    return MessageUtils.error(
      `Image with name "${name}" does not exist`,
      StatusCode.notFound
    );
  }

  static unprocessableEntity(): PreparedResult {
    return MessageUtils.error(
      "Unable to process request...",
      StatusCode.unprocessableEntity
    );
  }

  static base64ImageResponse(
    base64String: string | S3.Body,
    contentType: string
  ): PreparedResult {
    return {
      statusCode: StatusCode.success,
      headers: { ...Result.headers, "Content-Type": contentType },
      isBase64Encoded: true,
      body: base64String as string,
    };
  }
}
