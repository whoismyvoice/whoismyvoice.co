resource "aws_ssm_parameter" "development_mixpanel_token" {
  name        = "/development/mixpanel_token"
  description = "Token for the Mixpanel project to which development analytics are sent."
  type        = "String"
  value       = "50ebae8c5fa7e5222b2271df8b73e91d"

  tags {
    Client      = "siberia"
    Environment = "development"
    Terraform   = "true"
  }
}
