resource "aws_lambda_function" "TrackPilotsAPI-Node" {
  function_name = "TrackPilotsAPI-Node"
  handler = "app"
  filename = "../../app.zip"
  source_code_hash = "${filebase64sha256("../../app.zip")}"
  runtime = "12.10.0"
  timeout = "30"
  role = "${aws_iam_role.TrackPilotsAPI-Node_lambda.arn}"

  environment {
      variables = {
      DB_NAME = "${var.DB_NAME}"
      DB_PASSWORD = "${var.DB_PASSWORD}"
      DB_SESSION = "${var.DB_SESSION}"
      DB_USER = "${var.DB_USER}"
  }
 }
}