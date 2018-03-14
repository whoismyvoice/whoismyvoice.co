output "production_base_url" {
  value = "${replace("${aws_api_gateway_deployment.wimv_api_testing_deployment.invoke_url}", "/${aws_api_gateway_deployment.wimv_api_testing_deployment.stage_name}$/", "${aws_api_gateway_stage.wimv_api_production.stage_name}")}"
  description = "The invokation URL of the production API."
}

output "testing_base_url" {
  value = "${aws_api_gateway_deployment.wimv_api_testing_deployment.invoke_url}"
  description = "The invokation URL of the testing API."
}
