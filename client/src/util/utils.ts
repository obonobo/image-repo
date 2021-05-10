const awsconfig = {
  cognito: {
    userPoolId: "us-east-1_3OxARzoLT",
    userPoolClientId: "76ug3n80joc4q7b8nnouik1d03",
    region: "us-east-1",
  },
  api: {
    // invokeUrl: "https://2z7v041j87.execute-api.us-east-1.amazonaws.com/dev/",
    invokeUrl: "https://slk6wjc4ii.execute-api.us-east-1.amazonaws.com/test",
  },
};

const urlFor = (path = "/"): string => `${awsconfig.api.invokeUrl}${path}`;
export { urlFor, awsconfig };
