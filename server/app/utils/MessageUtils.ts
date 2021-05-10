export enum StatusCode {
  success = 200,
  notFound = 404,
  unprocessableEntity = 422,
}

export type PreparedResult = {
  statusCode: number;
  body: string;
  isBase64Encoded?: boolean;
  headers?: { [key: string]: string };
};

export class Result {
  private static headers = {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,GET",
  };

  private statusCode: number;
  private code: number;
  private message: string;
  private data?: unknown;
  private isBase64Encoded: boolean;

  constructor(
    statusCode: number,
    code: number,
    message: string,
    data?: unknown,
    isBase64Encoded = false
  ) {
    this.code = code;
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
        code: res.code,
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
      0,
      "success",
      data,
      isBase64Encoded
    );
    return result.bodyToString();
  }

  static error(message: string, code = 1000): PreparedResult {
    const result = new Result(StatusCode.success, code, message);
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
    base64String: string,
    contentType: string
  ): PreparedResult {
    let result = new Result(
      StatusCode.success,
      0,
      "success",
      base64String,
      true
    ).bodyToString(() => base64String);
    return {
      ...result,
      headers: { ...result.headers, "Content-Type": contentType },
    };
  }
}
