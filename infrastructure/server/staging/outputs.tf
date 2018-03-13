output "s3_wimv_production_arn" {
  value = "${aws_s3_bucket.wimv_bucket.arn}"
}
