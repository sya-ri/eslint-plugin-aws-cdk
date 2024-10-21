import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class Resource extends Construct {
  constructor(scope: Construct) {
    super(scope, "Resource");

    new Bucket(this, "Valid");
  }
}
