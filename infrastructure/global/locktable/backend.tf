terraform {
  backend "s3" {
    profile = "siberia-dev"
    bucket = "siberia-tf"
    key    = "whoismyvoice/global/locktable/terraform.tfstate"
    region = "us-east-1"
  }
}
