output "cloudfront" {
  description = "Id of the CloudFront distribution fronting the S3 bucket."
  value       = module.deployment.cloudfront_id
}

output "hostname" {
  description = "Fully Qualified Domain Name where distribution can be accessed."
  value       = module.deployment.fqdn
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket storing static assets."
  value       = module.deployment.s3_bucket_arn
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket storing static assets."
  value       = module.deployment.s3_bucket_name
}
