resource "aws_ssm_parameter" "production_mixpanel_token" {
  name        = "/production/mixpanel_token"
  description = "Token for the Mixpanel project to which production analytics are sent."
  type        = "String"
  value       = "582e6e69efcbe83615181fab6f29d7b3"

  tags {
    Client      = "siberia"
    Environment = "production"
    Terraform   = "true"
  }
}
