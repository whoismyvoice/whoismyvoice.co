variable "aws_access_key" {
  description = "Access Key for the IAM user"
}
variable "aws_secret_key" {
  description = "Secret Key for the IAM user"
}
variable "aws_region_id" {
  description = "Region the plan will be executed against"
  default = "us-east-1"
}
variable "root_bucket_name" {
  description = "Name to use for the S3 bucket content is loaded into."
  default = "whoismyvoice"
}
variable "root_domain_name" {
  description = "Domain name where the content will be hosted."
  default = "whoismyvoice.com"
}
