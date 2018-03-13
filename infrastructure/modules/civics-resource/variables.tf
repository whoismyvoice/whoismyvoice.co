variable "aws_account_id" {
  description = "Id number of the AWS account"
}
variable "aws_api_gateway_id" {
  description = "Id of the AWS API Gateway to which the resource will belong."
}
variable "aws_region_id" {
  description = "Region the plan will be executed against"
}
variable "gateway_lambda_exec_role" {
  description = "ARN of the role used by the gateway when executing the Lambda function."
}
variable "google_civic_api_key" {
  description = "API Key to be used by lambda function when contacting Google Civic Information API."
}
variable "parent_resource_id" {
  description = "The id of the parent resource to which the resource will be attached."
}
