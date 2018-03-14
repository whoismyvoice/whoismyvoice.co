output "get_resource" {
  value = "${module.maplight_get.resource}"
}

output "get_resource_hash" {
  value = "${aws_lambda_function.maplight_proxy.source_code_hash}"
}

output "option_resource" {
  value = "${module.maplight_options.resource}"
}
