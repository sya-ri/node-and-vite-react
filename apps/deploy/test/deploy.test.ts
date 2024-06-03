import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Stack } from "../lib/stack";

/**
 * @see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
 */
describe("Stack", () => {
    let template: cdk.assertions.Template;

    beforeAll(() => {
        const app = new cdk.App();
        const stack = new Stack(app, "TestStack");
        template = Template.fromStack(stack);
    });

    it("should lambda function created", () => {
        template.hasResourceProperties("AWS::Lambda::Function", {
            Handler: "index.handler",
        });
    });

    it("should s3 deployed", () => {
        template.hasResource("AWS::S3::Bucket", {});
    });
});
