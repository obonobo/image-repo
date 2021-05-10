import { Context, Handler } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
import HelloController from "./controller/HelloController";

const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

const helloController = new HelloController();

export const hello: Handler = (event: any, context: Context) =>
  helloController.hello(event, context);

export const create: Handler = (event: any, context: Context) =>
  helloController.create(event, context);

export const list: Handler = (event: any, context: Context) =>
  helloController.list(event, context);

export const retrieve: Handler = (event: any, context: Context) =>
  helloController.retrieve(event, context);
