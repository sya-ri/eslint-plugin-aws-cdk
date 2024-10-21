import { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class TestStack extends Stack {
  constructor(scope: Construct) {
    super(scope, "TestStack");

    new Bucket(this, "Valid");
  }
}
