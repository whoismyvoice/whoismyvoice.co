output "base_url" {
  value = "${module.maplight-resource.invoke_url}"
  description = "The invokation URL of the base API."
}
