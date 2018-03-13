resource "aws_s3_bucket" "wimv_state" {
  bucket = "whoismyvoice-terraform"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}
