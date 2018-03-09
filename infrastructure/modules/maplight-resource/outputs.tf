output "deployment_id" {
  value = "${aws_api_gateway_deployment.maplight_deployment.id}"
  description = "The id of the deployment."
}

output "execute_arn" {
  value = "${aws_api_gateway_deployment.maplight_deployment.execution_arn}"
  description = "The id of the deployment."
}

output "invoke_url" {
  value = "${aws_api_gateway_deployment.maplight_deployment.invoke_url}"
  description = "The invokation URL of the API."
}
