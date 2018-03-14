// Use the AWS Certificate Manager to create an SSL cert for our domain.
// This resource won't be created until you receive the email verifying you
// own the domain and you click on the confirmation link.
resource "aws_acm_certificate" "wimv_cert" {
  // We want a wildcard cert so we can host subdomains later.
  domain_name       = "${local.domain}"
  validation_method = "DNS"
  tags {
    Name = "Cert for ${local.domain}"
    Client = "siberia"
    Environment = "${var.subdomain}"
    Terraform = "true"
  }
}

resource "aws_route53_record" "wimv_cert_validation" {
  name = "${aws_acm_certificate.wimv_cert.domain_validation_options.0.resource_record_name}"
  type = "${aws_acm_certificate.wimv_cert.domain_validation_options.0.resource_record_type}"
  zone_id = "${var.dns_zone_id}"
  records = [
    "${aws_acm_certificate.wimv_cert.domain_validation_options.0.resource_record_value}",
  ]
  ttl = 60
}

/**
 * Ideally we could do the cert validation by using the list of `domain_validation_options`
 * but can not currently because Terraform barfs when the value of `count` needs
 * to be computed.
 *
resource "aws_route53_record" "wimv_cert_validation" {
  count = "${length(aws_acm_certificate.wimv_cert.domain_validation_options)}"
  name = "${lookup(element(aws_acm_certificate.wimv_cert.domain_validation_options, count.index), "resource_record_name")}"
  type = "${lookup(element(aws_acm_certificate.wimv_cert.domain_validation_options, count.index), "resource_record_type")}"
  zone_id = "${var.dns_zone_id}"
  records = [
    "${lookup(element(aws_acm_certificate.wimv_cert.domain_validation_options, count.index), "resource_record_value")}",
  ]
  ttl = 60
}
*/

resource "aws_acm_certificate_validation" "wimv" {
  certificate_arn = "${aws_acm_certificate.wimv_cert.arn}"
  validation_record_fqdns = [
    "${aws_route53_record.wimv_cert_validation.fqdn}",
  ]
}
