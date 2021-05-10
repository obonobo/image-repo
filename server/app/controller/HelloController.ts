import { Context } from "aws-lambda";
import HelloService from "../service/HelloService";
import MessageUtils, { PreparedResult } from "../utils/MessageUtils";

export default class HelloController extends HelloService {
  async hello(_: unknown, context: Context): Promise<PreparedResult> {
    this.logExecution(context);
    return MessageUtils.success(await this.getHelloMessage());
  }

  async create(event: any, context: Context): Promise<PreparedResult> {
    this.logExecution(context);
    try {
      await this.addNewImageToS3(event);
      return MessageUtils.success();
    } catch (err) {
      console.error(err);
      return MessageUtils.error("Unable to process file...", 421);
    }
  }

  async list(event: any, context: Context): Promise<PreparedResult> {
    this.logExecution(context);
    try {
      const response = await this.listItemsInS3(event);
      return MessageUtils.success(
        response.Contents.map((img) => ({
          file: img.Key,
          lastModified: img.LastModified,
          size: img.Size,
        }))
      );
    } catch (err) {
      console.error(err);
      const message = "Failed when trying to list objects from bucket";
      console.log(message);
      throw new Error(message);
    }
  }

  private logExecution(context: Context) {
    console.log("Executing function:", context.functionName);
  }
}
