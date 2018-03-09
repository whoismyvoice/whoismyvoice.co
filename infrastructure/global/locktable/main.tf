resource "aws_dynamodb_table" "wimv_locktable" {
  name           = "WhoismyvoiceTerraformLocks"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}
