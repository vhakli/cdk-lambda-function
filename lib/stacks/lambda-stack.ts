import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { StringParameter } from "aws-cdk-lib/aws-ssm";

export class LambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const axiosLayerArn = StringParameter.valueForStringParameter(
      this,
      "axios-layer-arn"
    );
    const xrayLayerArn = StringParameter.valueForStringParameter(
      this,
      "xray-layer-arn"
    );

    new NodejsFunction(this, "testLambda", {
      entry: "./lambdas/testLambda/handler.ts",
      runtime: Runtime.NODEJS_18_X,
      memorySize: 128,
      timeout: Duration.seconds(5),
      bundling: {
        sourceMap: true,
        externalModules: ["aws-sdk", "@villehx/axios", "@villehx/xray"],
      },
      layers: [
        LayerVersion.fromLayerVersionArn(this, "axiosLayer", axiosLayerArn),
        LayerVersion.fromLayerVersionArn(this, "xrayLayer", xrayLayerArn),
      ],
    });
  }
}
