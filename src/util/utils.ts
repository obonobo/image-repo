const awsconfig = {
  cognito: {
    userPoolId: "us-east-1_3OxARzoLT",
    userPoolClientId: "76ug3n80joc4q7b8nnouik1d03",
    region: "us-east-1",
  },
  api: {
    invokeUrl: "", // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
  },
};

const assetPrefix = process.env.ASSET_PREFIX || "";
const urlFor = (path = "/"): string => `${assetPrefix}${path}`;
const redirect = (path = "/"): void =>
  window?.location?.replace(`${assetPrefix}${path}`);

export { assetPrefix, redirect, urlFor, awsconfig };
