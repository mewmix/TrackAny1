  
resource "aws_api_gateway_rest_api" "TrackPilotsAPI-Node" {
  name        = "TrackPilotsAPI-Node-gateway"
  description = "This is my API description"
}

resource "aws_api_gateway_deployment" "deployment_v1" {
  rest_api_id = "${aws_api_gateway_rest_api.TrackPilotsAPI-Node.id}"
  stage_name  = "api"

  depends_on = [
    "aws_api_gateway_integration.TrackPilotsAPI-Node",
  ]
}

resource "aws_api_gateway_resource" "TrackPilotsAPI-NodeProxy" {
  parent_id   = "${aws_api_gateway_rest_api.TrackPilotsAPI-Node.root_resource_id}"
  path_part   = "{proxy+}"
  rest_api_id = "${aws_api_gateway_rest_api.TrackPilotsAPI-Node.id}"
}

resource "aws_api_gateway_method" "TrackPilotsAPI-Node" {
  http_method      = "ANY"
  resource_id      = "${aws_api_gateway_resource.TrackPilotsAPI-NodeProxy.id}"
  rest_api_id      = "${aws_api_gateway_rest_api.TrackPilotsAPI-Node.id}"
  authorization    = "NONE"
  api_key_required = false

  request_parameters = {
    "method.request.path.proxy" = true
  }
}

resource "aws_api_gateway_integration" "TrackPilotsAPI-Node" {
  http_method             = "${aws_api_gateway_method.TrackPilotsAPI-Node.http_method}"
  resource_id             = "${aws_api_gateway_resource.TrackPilotsAPI-NodeProxy.id}"
  rest_api_id             = "${aws_api_gateway_rest_api.TrackPilotsAPI-Node.id}"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.TrackPilotsAPI-Node.invoke_arn}"

  depends_on = [
    "aws_api_gateway_method.TrackPilotsAPI-Node",
  ]
}