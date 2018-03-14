output "resource" {
  value = "${aws_api_gateway_integration_response.response_method_integration.http_method} ${var.api_gateway_resource_path}"
}
