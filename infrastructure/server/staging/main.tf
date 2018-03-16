data "terraform_remote_state" "route53" {
  backend = "s3"

  config {
    profile = "whoismyvoice"
    bucket  = "whoismyvoice-terraform"
    key     = "whoismyvoice/aws/route53/terraform.tfstate"
    region  = "us-east-1"
  }
}

module "deployment" {
  source           = "../../modules/static-deploy-target"
  dns_zone_id      = "${data.terraform_remote_state.route53.zone_id}"
  root_bucket_name = "whoismyvoice"
  root_domain_name = "whoismyvoice.com"
  subdomain        = "stage"
}
