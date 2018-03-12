terraform {
  backend "s3" {
    profile = "siberia-dev"
    bucket = "siberia-tf"
    key    = "whoismyvoice/server/production/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "WhoismyvoiceTerraformLocks"
  }
}
