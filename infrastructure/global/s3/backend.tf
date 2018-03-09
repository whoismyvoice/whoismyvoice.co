terraform {
  backend "s3" {
    profile = "siberia-dev"
    bucket = "siberia-tf"
    key    = "whoismyvoice/global/s3/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "WhoismyvoiceTerraformLocks"
  }
}
