resource "aws_api_gateway_method" "request_method" {
  rest_api_id   = "${var.api_gateway_rest_api_id}"
  resource_id   = "${var.api_gateway_resource_id}"
  http_method   = "${var.method}"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "request_method_integration" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.request_method.http_method}"
  type = "MOCK"
  request_templates = {
    "application/json" = "${file("${path.module}/files/status.json")}"
  }
}

resource "aws_api_gateway_method_response" "response_method" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_integration.request_method_integration.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin" = true
  }
}

resource "aws_api_gateway_integration_response" "response_method_integration" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method_response.response_method.http_method}"
  status_code = "${aws_api_gateway_method_response.response_method.status_code}"

  response_templates = {
    "application/json" = ""
  }
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Accept-Encoding'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin" = "'*''",
  }
}
