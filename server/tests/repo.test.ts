import * as s3Mock from "./s3.mock";
import lambdaTester from "lambda-tester";
import { assert, expect } from "chai";
import sinon from "sinon";
import { list } from "../app/handler";
import { PreparedResult } from "../app/utils/MessageUtils";
import s3 from "../app/model/s3";

describe("List Images - GET /images", () => {
  it("success", () => {
    try {
      const mockedS3 = sinon.mock(s3);
      mockedS3.expects("listObjectsV2").exactly(1).returns(s3Mock.imageListing);

      return lambdaTester(list).expectResult((result: PreparedResult) => {
        expect(result.statusCode).to.equal(200);
        expect(result.body).is.not.null;
        const body = JSON.parse(result.body);
        expect(body.message).to.equal("success");
        assert(
          body.data.reduce(
            (p: boolean, c: any) => p || c["file"] === "cat.jpeg",
            false
          ),
          "Check that the return value has a cat.jpeg pic in it"
        );
        mockedS3.verify();
        mockedS3.restore();
      });
    } catch (err) {
      console.log(err);
    }
  });
});
