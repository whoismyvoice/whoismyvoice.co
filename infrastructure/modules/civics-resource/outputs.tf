output "get_resource" {
  value = "${module.civics_get.resource}"
}

output "get_resource_hash" {
  value = "${aws_lambda_function.civics_proxy.source_code_hash}"
}

output "option_resource" {
  value = "${module.civics_options.resource}"
}
