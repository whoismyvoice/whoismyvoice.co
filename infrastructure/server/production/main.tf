locals {
  domain = "whoismyvoice.com"
  root_bucket_name = "whoismyvoice"
  subdomain = "www"
}

data "terraform_remote_state" "route53" {
  backend = "s3"
  config {
    profile        = "whoismyvoice"
    bucket         = "whoismyvoice-terraform"
    key            = "whoismyvoice/aws/route53/terraform.tfstate"
    region         = "us-east-1"
  }
}

module "deployment" {
  source = "../../modules/static-deploy-target"
  dns_zone_id = "${data.terraform_remote_state.route53.zone_id}"
  root_bucket_name = "${local.root_bucket_name}"
  root_domain_name = "${local.domain}"
  subdomain = "${local.subdomain}"
}

module "redirect" {
  source = "../../modules/static-redirect-target"
  dns_zone_id = "${data.terraform_remote_state.route53.zone_id}"
  redirect_target = "${local.subdomain}.${local.domain}"
  root_bucket_name = "${local.root_bucket_name}"
  root_domain_name = "${local.domain}"
  subdomain = "${local.subdomain}"
}
