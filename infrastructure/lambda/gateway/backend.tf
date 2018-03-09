terraform {
  backend "s3" {
    profile = "siberia-dev"
    bucket = "siberia-tf"
    key    = "whoismyvoice/lambda/gateway/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "WhoismyvoiceTerraformLocks"
  }
}
