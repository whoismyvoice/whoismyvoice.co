variable "dns_zone_id" {
  description = "Zone Id of the DNS Hosted zone to modify."
}

variable "redirect_target" {
  description = "FQDN to which we want to redirect requests."
}

variable "root_bucket_name" {
  description = "Name to use for the S3 bucket content is loaded into."
  default     = "whoismyvoice"
}

variable "root_domain_name" {
  description = "Domain name where the content will be hosted."
  default     = "whoismyvoice.com"
}

variable "subdomain" {
  description = "Subdomain from which data will be served."
}
