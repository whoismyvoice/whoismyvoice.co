output "cloudfront_id" {
  description = "Id of the CloudFront distribution fronting the S3 bucket."
  value       = aws_cloudfront_distribution.redirect_distribution.id
}

output "fqdn" {
  description = "Fully Qualified Domain Name where distribution can be accessed."
  value       = aws_route53_record.redirect_dns.fqdn
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket storing static assets."
  value       = aws_s3_bucket.redirect_bucket.arn
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket storing static assets."
  value       = aws_s3_bucket.redirect_bucket.id
}
