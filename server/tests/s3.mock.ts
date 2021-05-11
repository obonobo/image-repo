import { AWSError, Request } from "aws-sdk";
import { ListObjectsV2Output } from "aws-sdk/clients/s3";
import { PromiseResult } from "aws-sdk/lib/request";

const createImageListingItem = (
  Key: string,
  LastModified: string,
  Size: number
) => ({
  Key,
  LastModified: new Date(LastModified),
  Size,
});

// export const imageListing: S3.ListObjectsV2Output = {
//   Contents: [
//     createImageListingItem("cat.jpeg", "December 17, 1995 03:24:00", 1000),
//     createImageListingItem("qute-kitty.png", "July 17, 2001 03:24:00", 9999),
//     createImageListingItem("selfie.jpeg", "November 17, 1995 03:24:00", 666),
//   ],
// };

export const imageListing: Request<ListObjectsV2Output, AWSError> = {
  promise: async (): Promise<PromiseResult<ListObjectsV2Output, AWSError>> => ({
    Contents: [
      createImageListingItem("cat.jpeg", "December 17, 1995 03:24:00", 1000),
      createImageListingItem("qute-kitty.png", "July 17, 2001 03:24:00", 9999),
      createImageListingItem("selfie.jpeg", "November 17, 1995 03:24:00", 666),
    ],
    $response: null,
  }),
  abort: null,
  createReadStream: null,
  eachPage: null,
  isPageable: null,
  send: null,
  on: null,
  onAsync: null,
  startTime: null,
  httpRequest: null,
};
