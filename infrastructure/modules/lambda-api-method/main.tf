# Example: request for GET /hello
resource "aws_api_gateway_method" "request_method" {
  rest_api_id   = "${var.api_gateway_rest_api_id}"
  resource_id   = "${var.api_gateway_resource_id}"
  http_method   = "${var.method}"
  authorization = "NONE"
}

# Example: GET /hello => POST lambda
resource "aws_api_gateway_integration" "request_method_integration" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.request_method.http_method}"
  type        = "AWS_PROXY"
  uri         = "arn:aws:apigateway:${var.aws_region_id}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region_id}:${var.aws_account_id}:function:${var.lambda}/invocations"

  # AWS lambdas can only be invoked with the POST method
  integration_http_method = "POST"
}

# lambda => GET response
resource "aws_api_gateway_method_response" "response_method" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_integration.request_method_integration.http_method}"
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }
}

# Response for: GET /hello
resource "aws_api_gateway_integration_response" "response_method_integration" {
  rest_api_id = "${var.api_gateway_rest_api_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method_response.response_method.http_method}"
  status_code = "${aws_api_gateway_method_response.response_method.status_code}"

  response_templates = {
    "application/json" = ""
  }
}

resource "aws_lambda_permission" "allow_api_gateway" {
  function_name = "${var.lambda}"
  statement_id  = "AllowExecutionFromApiGateway"
  action        = "lambda:InvokeFunction"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:${var.aws_region_id}:${var.aws_account_id}:${var.api_gateway_rest_api_id}/*/${var.method}${var.api_gateway_resource_path}"
}
