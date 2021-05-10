export enum StatusCode {
  success = 200,
}

export type PreparedResult = {
  statusCode: number;
  body: string;
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

  constructor(
    statusCode: number,
    code: number,
    message: string,
    data?: unknown
  ) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString(): PreparedResult {
    return {
      statusCode: this.statusCode,
      headers: Result.headers,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export default class MessageUtils {
  static success(data: unknown = {}): PreparedResult {
    const result = new Result(StatusCode.success, 0, "success", data);
    return result.bodyToString();
  }

  static error(message: string, code = 1000): PreparedResult {
    const result = new Result(StatusCode.success, code, message);
    const stringified = result.bodyToString();
    console.log(stringified);
    return stringified;
  }
}
