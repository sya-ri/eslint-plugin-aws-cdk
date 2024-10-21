import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class Resource extends Construct {
  constructor(scope: Construct) {
    super(scope, "Resource");

    new s3.Bucket(this, "Invalid");
  }
}