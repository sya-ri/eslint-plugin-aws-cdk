import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";

export class Resource extends Bucket {
  constructor(scope: Construct) {
    super(scope, "Resource");

    new Bucket(this, "Invalid");
  }
}
