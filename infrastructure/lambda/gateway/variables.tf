variable "aws_access_key" {
  description = "Access Key for the IAM user"
}

variable "aws_secret_key" {
  description = "Secret Key for the IAM user"
}

variable "aws_account_id" {
  description = "Id number of the AWS account"
}

variable "aws_region_id" {
  description = "Region the plan will be executed against"
  default     = "us-east-1"
}

variable "google_civic_api_key" {
  description = "API Key to be used by lambda function when contacting Google Civic Information API."
}
