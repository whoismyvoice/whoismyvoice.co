data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/index.js"
  output_path = "${path.module}/function.zip"
}

resource "aws_lambda_function" "civics_proxy" {
  function_name    = "whoismyvoice_civics_proxy"
  filename         = data.archive_file.lambda_zip.output_path
  handler          = "index.handler"
  role             = var.gateway_lambda_exec_role
  runtime          = "nodejs6.10"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  environment {
    variables = {
      GOOGLE_CIVIC_API_KEY = var.google_civic_api_key
    }
  }
}

# The API requires at least one "endpoint", or "resource" in AWS terminology.
# The endpoint created here is: /hello
resource "aws_api_gateway_resource" "wimv_api_res_civics" {
  rest_api_id = var.aws_api_gateway_id
  parent_id   = var.parent_resource_id
  path_part   = "civics"
}

# Until now, the resource created could not respond to anything. We must set up
# a HTTP method (or verb) for that!
# This is the code for method GET /hello, that will talk to the first lambda
module "civics_get" {
  source                    = "git@github.com:oursiberia/terraform-lambda-gateway.git//lambda-api-method?ref=v0.0.1"
  api_gateway_rest_api_id   = var.aws_api_gateway_id
  api_gateway_resource_id   = aws_api_gateway_resource.wimv_api_res_civics.id
  method                    = "GET"
  api_gateway_resource_path = aws_api_gateway_resource.wimv_api_res_civics.path
  lambda                    = aws_lambda_function.civics_proxy.function_name
  lambda_invoke_arn         = aws_lambda_function.civics_proxy.invoke_arn
  aws_region_id             = var.aws_region_id
  aws_account_id            = var.aws_account_id
}

module "civics_options" {
  source                    = "git@github.com:oursiberia/terraform-lambda-gateway.git//cors-api-method?ref=v0.0.1"
  api_gateway_rest_api_id   = var.aws_api_gateway_id
  api_gateway_resource_id   = aws_api_gateway_resource.wimv_api_res_civics.id
  method                    = "OPTIONS"
  api_gateway_resource_path = aws_api_gateway_resource.wimv_api_res_civics.path
}
