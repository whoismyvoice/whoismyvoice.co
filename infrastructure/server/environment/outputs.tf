output "test_env_arns" {
  description = "ARNs of the parameters for test environment variables."

  value = [
    "${aws_ssm_parameter.test_mixpanel_token.arn}",
  ]
}

output "development_env_arns" {
  description = "ARNs of the parameters for development environment variables."

  value = [
    "${aws_ssm_parameter.development_mixpanel_token.arn}",
  ]
}

output "production_env_arns" {
  description = "ARNs of the parameters for the production environment variables."

  value = [
    "${aws_ssm_parameter.production_mixpanel_token.arn}",
  ]
}
