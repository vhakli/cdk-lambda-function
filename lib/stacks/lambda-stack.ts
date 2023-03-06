import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new NodejsFunction(this, "testLambda", {
      entry: "./lambdas/testLambda/handler.ts",
      runtime: Runtime.NODEJS_18_X,
      memorySize: 128,
      timeout: Duration.seconds(5),
      bundling: {
        sourceMap: true,
        externalModules: ["aws-sdk", "@villehx/axios-layer"],
      },
      layers: [
        LayerVersion.fromLayerVersionArn(
          this,
          "axiosLayer",
          "arn:aws:lambda:us-east-1:522496507093:layer:axioslayer29F42384:5",
        ),
      ],
    });
  }
}
