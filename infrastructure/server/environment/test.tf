resource "aws_ssm_parameter" "test_mixpanel_token" {
  name        = "/test/mixpanel_token"
  description = "Token for the Mixpanel project to which test analytics are sent."
  type        = "String"
  value       = "50ebae8c5fa7e5222b2271df8b73e91d"

  tags {
    Client      = "siberia"
    Environment = "test"
    Terraform   = "true"
  }
}
