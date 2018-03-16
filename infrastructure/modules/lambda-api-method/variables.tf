variable "api_gateway_rest_api_id" {
  description = "The id of the associated REST API"
}

variable "api_gateway_resource_id" {
  description = "The API resource id"
}

variable "method" {
  description = "The HTTP method to create for the resource."
  default     = "GET"
}

variable "api_gateway_resource_path" {
  description = "The resource path of the API method"
}

variable "lambda" {
  description = "The lambda name to invoke"
}

variable "aws_region_id" {
  description = "The AWS region, e.g., eu-west-1"
}

variable "aws_account_id" {
  description = "The AWS account ID"
}
