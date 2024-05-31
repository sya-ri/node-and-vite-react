import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Backend from "../lib/backend-stack";

it("should lambda function created", () => {
    const app = new cdk.App();
    const stack = new Backend.BackendStack(app, "MyTestStack");
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
        Handler: "lambda.handler",
    });
});
