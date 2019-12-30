resource "aws_iam_role" "TrackPilotsAPI-Node_lambda" {
  name = "TrackPilotsAPI-Node_lambda_role"
  assume_role_policy = "${data.aws_iam_policy_document.TrackPilotsAPI-Node-assume-role.json}"
}

data "aws_iam_policy_document" "TrackPilotsAPI-Node-assume-role" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
  }

  version = "2012-10-17"
}

resource "aws_lambda_permission" "apigateway_lambda_invoke" {
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.TrackPilotsAPI-Node.arn}"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_deployment.deployment_v1.execution_arn}/*"
}