import { Context, Handler } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
import ImageRepoController from "./controller/ImageRepoController";

const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

const imageRepoController = new ImageRepoController();

export const hello: Handler = (event: any, context: Context) =>
  imageRepoController.hello(event, context);

export const create: Handler = (event: any, context: Context) =>
  imageRepoController.create(event, context);

export const list: Handler = (event: any, context: Context) =>
  imageRepoController.list(event, context);

export const retrieve: Handler = (event: any, context: Context) =>
  imageRepoController.retrieve(event, context);

export const optionsAllowCors: Handler = (event: any, context: Context) =>
  imageRepoController.optionsAllowCors(event, context);
