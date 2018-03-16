terraform {
  backend "s3" {
    profile        = "whoismyvoice"
    bucket         = "whoismyvoice-terraform"
    key            = "whoismyvoice/wimv/global/locktable/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "WhoismyvoiceTerraformLocks"
  }
}
