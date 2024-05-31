import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { Stack } from "../lib/stack";

it("should lambda function created", () => {
    const app = new cdk.App();
    const stack = new Stack(app, "TestStack");
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "lambda.handler",
    });
});
