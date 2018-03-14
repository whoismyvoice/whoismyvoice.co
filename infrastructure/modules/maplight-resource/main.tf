data "archive_file" "lambda_zip" {
  type = "zip"
  source_file = "${path.module}/index.js"
  output_path = "${path.module}/function.zip"
}

resource "aws_lambda_function" "maplight_proxy" {
  function_name = "whoismyvoice_maplight_proxy"
  filename = "${data.archive_file.lambda_zip.output_path}"
  handler = "index.handler"
  role = "${var.gateway_lambda_exec_role}"
  runtime = "nodejs6.10"
  source_code_hash = "${data.archive_file.lambda_zip.output_base64sha256}"
}

# The API requires at least one "endpoint", or "resource" in AWS terminology.
# The endpoint created here is: /hello
resource "aws_api_gateway_resource" "wimv_api_res_maplight" {
  rest_api_id = "${var.aws_api_gateway_id}"
  parent_id = "${var.parent_resource_id}"
  path_part = "maplight"
}

# Until now, the resource created could not respond to anything. We must set up
# a HTTP method (or verb) for that!
# This is the code for method GET /hello, that will talk to the first lambda
module "maplight_get" {
  source = "../lambda-api-method"
  api_gateway_rest_api_id = "${var.aws_api_gateway_id}"
  api_gateway_resource_id = "${aws_api_gateway_resource.wimv_api_res_maplight.id}"
  method = "GET"
  api_gateway_resource_path = "${aws_api_gateway_resource.wimv_api_res_maplight.path}"
  lambda = "${aws_lambda_function.maplight_proxy.function_name}"
  aws_region_id = "${var.aws_region_id}"
  aws_account_id = "${var.aws_account_id}"
}

module "maplight_options" {
  source = "../cors-api-method"
  api_gateway_rest_api_id = "${var.aws_api_gateway_id}"
  api_gateway_resource_id = "${aws_api_gateway_resource.wimv_api_res_maplight.id}"
  method = "OPTIONS"
  api_gateway_resource_path = "${aws_api_gateway_resource.wimv_api_res_maplight.path}"
  aws_region_id = "${var.aws_region_id}"
  aws_account_id = "${var.aws_account_id}"
}
