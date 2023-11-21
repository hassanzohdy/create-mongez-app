import { UploadsConfigurations, requestContext } from "@mongez/warlock";

const uploadsConfigurations: UploadsConfigurations = {
  compress: true,
  // aws: {
  //   connectionOptions: async () => {
  //     const { request } = requestContext();

  //     if (request?.aws) return request.aws;

  //     const awsSettings = await getSetting("aws");

  //     if (!Is.empty(awsSettings)) {
  //       return {
  //         endpointUrl: awsSettings.url,
  //         accessKeyId: awsSettings.accessKey,
  //         bucketName: awsSettings.bucketName,
  //         secretAccessKey: awsSettings.secretKey,
  //         region: awsSettings.region,
  //         providerName: awsSettings.provider,
  //         cloudfront: awsSettings.cloudFrontUrl,
  //       };
  //     }

  //     return {
  //       endpointUrl: env("AWS_URL"),
  //       accessKeyId: env("AWS_ACCESS_KEY_ID"),
  //       bucketName: env("AWS_BUCKET"),
  //       secretAccessKey: env("AWS_SECRET_ACCESS_KEY"),
  //       region: env("AWS_REGION"),
  //       providerName: env("AWS_PROVIDER_NAME") || "aws",
  //       cloudfront: env("AWS_CLOUDFRONT"),
  //     };
  //   },
  //   parseFileName: ({ fileName, hash }) => {
  //     const client = requestContext().request.client;

  //     if (!client) {
  //       return hash + "-" + fileName;
  //     }

  //     return client.get("username") + "/" + hash + "-" + fileName;
  //   },
  // },
  saveTo: (defaultPath: string) => {
    const client = requestContext().request.client;

    if (!client) return defaultPath;

    return client.get("username") + "/" + defaultPath;
  },
};

export default uploadsConfigurations;
