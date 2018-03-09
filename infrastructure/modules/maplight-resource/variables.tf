variable "aws_api_gateway_id" {
  description = "Id of the AWS API Gateway to which the resource will belong."
}
variable "parent_resource_id" {
  description = "The id of the parent resource to which the resource will be attached."
}
variable "aws_account_id" {
  description = "Id number of the AWS account"
}
variable "aws_region_id" {
  description = "Region the plan will be executed against"
}
