# Now, we need an API to expose those functions publicly
resource "aws_api_gateway_rest_api" "wimv_api" {
  name = "Who Is My Voice"
  description = "API to proxy requests for whoismyvoice.com"
}

module "maplight-resource" {
  source = "../../modules/maplight-resource"
  aws_account_id = "${var.aws_account_id}"
  aws_api_gateway_id = "${aws_api_gateway_rest_api.wimv_api.id}"
  aws_region_id = "${var.aws_region_id}"
  parent_resource_id = "${aws_api_gateway_rest_api.wimv_api.root_resource_id}"
}

module "civics-resource" {
  source = "../../modules/civics-resource"
  aws_account_id = "${var.aws_account_id}"
  aws_api_gateway_id = "${aws_api_gateway_rest_api.wimv_api.id}"
  aws_region_id = "${var.aws_region_id}"
  google_civic_api_key = "${var.google_civic_api_key}"
  parent_resource_id = "${aws_api_gateway_rest_api.wimv_api.root_resource_id}"
}
