#!/usr/bin/env node
import "source-map-support";
import * as cdk from "aws-cdk-lib";
import { LambdaStack } from "./stacks/lambda-stack";

const app = new cdk.App();
new LambdaStack(app, "LambdaStack");
