output "cloudfront_id" {
  description = "Id of the CloudFront distribution fronting the S3 bucket."
  value       = aws_cloudfront_distribution.wimv_distribution.id
}

output "fqdn" {
  description = "Fully Qualified Domain Name where distribution can be accessed."
  value       = aws_route53_record.wimv_dns.fqdn
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket storing static assets."
  value       = aws_s3_bucket.wimv_bucket.arn
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket storing static assets."
  value       = aws_s3_bucket.wimv_bucket.id
}
