resource "aws_s3_bucket" "wimv_state" {
  bucket = "siberia-tf"

  versioning {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}
