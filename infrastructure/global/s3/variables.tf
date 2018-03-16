variable "aws_access_key" {
  description = "Access Key for the IAM user"
}

variable "aws_secret_key" {
  description = "Secret Key for the IAM user"
}

variable "aws_region_id" {
  description = "Region the plan will be executed against"
  default     = "us-east-1"
}
