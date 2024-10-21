import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class Stack extends cdk.Stack {
  constructor(scope: Construct) {
    super(scope, "TestStack");

    new s3.Bucket(this, "Valid");
  }
}
