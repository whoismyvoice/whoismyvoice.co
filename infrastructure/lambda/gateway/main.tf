data "aws_iam_policy" "lambda_exec_policy" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "aws_iam_policy_document" "lamda_assume_role_policy" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]
    principals {
      type = "Service"
      identifiers = [
        "lambda.amazonaws.com",
      ]
    }
  }
}

resource "aws_iam_role" "lambda_exec_role" {
  name = "APIProxyGatewayLambdaExecRole"
  assume_role_policy = "${data.aws_iam_policy_document.lamda_assume_role_policy.json}"
  description = "Terraform managed role used for invoking Lambda functions that proxy other APIs."
}

resource "aws_iam_role_policy_attachment" "lambda_exec_attachment" {
  role = "${aws_iam_role.lambda_exec_role.name}"
  policy_arn = "${data.aws_iam_policy.lambda_exec_policy.arn}"
}

# Now, we need an API to expose those functions publicly
resource "aws_api_gateway_rest_api" "wimv_api" {
  name = "Who Is My Voice"
  description = "Terraform managed API Gateway to proxy requests for whoismyvoice.com"
}

module "maplight-resource" {
  source = "../../modules/maplight-resource"
  aws_account_id = "${var.aws_account_id}"
  aws_api_gateway_id = "${aws_api_gateway_rest_api.wimv_api.id}"
  aws_region_id = "${var.aws_region_id}"
  gateway_lambda_exec_role = "${aws_iam_role.lambda_exec_role.arn}"
  parent_resource_id = "${aws_api_gateway_rest_api.wimv_api.root_resource_id}"
}

module "civics-resource" {
  source = "../../modules/civics-resource"
  aws_account_id = "${var.aws_account_id}"
  aws_api_gateway_id = "${aws_api_gateway_rest_api.wimv_api.id}"
  aws_region_id = "${var.aws_region_id}"
  gateway_lambda_exec_role = "${aws_iam_role.lambda_exec_role.arn}"
  google_civic_api_key = "${var.google_civic_api_key}"
  parent_resource_id = "${aws_api_gateway_rest_api.wimv_api.root_resource_id}"
}
