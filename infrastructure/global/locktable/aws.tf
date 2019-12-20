# Configure the AWS provider
provider "aws" {
  version    = "~> 2.43.0"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  region     = var.aws_region_id
}
