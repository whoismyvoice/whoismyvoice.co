output "locktable_wimv_state_arn" {
  description = "The ARN of the standup state lock table."
  value       = "${aws_dynamodb_table.wimv_locktable.arn}"
}

output "locktable_wimv_state_name" {
  description = "The name of the standup state lock table."
  value       = "${aws_dynamodb_table.wimv_locktable.name}"
}
