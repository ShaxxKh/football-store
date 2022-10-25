import type { AWS } from "@serverless/typescript";

import getProductsList from "@functions/getProductsList";
import getProductsById from "@functions/getProductsById";
import createProduct from "@functions/createProduct";
import * as secrets from "./secrets.json";

const serverlessConfiguration: AWS = {
  service: "productservicets",
  frameworkVersion: "3",
  configValidationMode: "error",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "dev",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      DB_HOST: secrets.DB_HOST,
      DB_PORT: secrets.DB_PORT,
      DB_DATABASE: secrets.DB_DATABASE,
      DB_USER: secrets.DB_USER,
      DB_PASSWORD: secrets.DB_PASSWORD,
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: { getProductsList, getProductsById, createProduct },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
      external: ["pg-native"],
    },
  },
};

module.exports = serverlessConfiguration;
