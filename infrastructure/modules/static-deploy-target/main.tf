locals {
  bucket_name = "${var.root_bucket_name}-${local.subdomain}"
  domain = "${local.subdomain}.${var.root_domain_name}"
  subdomain = "${var.subdomain}"
}

data "aws_iam_policy_document" "s3_get_policy" {
  statement {
    sid = "AllowGet"
    actions   = [
      "s3:GetObject",
    ]
    resources = [
      "arn:aws:s3:::${local.bucket_name}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "wimv_bucket" {
  bucket = "${local.bucket_name}"
  acl = "public-read"
  policy = "${data.aws_iam_policy_document.s3_get_policy.json}"

  // If it has any contents it can not be destroyed anyway.
  lifecycle {
    prevent_destroy = true
  }

  versioning {
    enabled = true
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags {
    Client = "siberia"
    Environment = "${var.subdomain}"
    Terraform = "true"
  }
}

resource "aws_cloudfront_distribution" "wimv_distribution" {
  // origin is where CloudFront gets its content from.
  origin {
    domain_name = "${aws_s3_bucket.wimv_bucket.bucket_domain_name}"
    origin_id   = "whoismyvoice_s3"
  }

  enabled = true
  is_ipv6_enabled = true
  aliases = [
    "${local.domain}",
  ]
  comment = "Terraform managed. Serves content for ${local.domain} w/ SSL."
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]
    cached_methods   = [
      "GET",
      "HEAD",
    ]
    target_origin_id = "whoismyvoice_s3"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_code = 404
    response_code = 200
    response_page_path = "/index.html"
  }

  price_class = "PriceClass_100"
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = [
        "US",
        "CA",
        "GB",
        "DE",
      ]
    }
  }

  tags {
    Client = "siberia"
    Environment = "${var.subdomain}"
    Terraform = "true"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.wimv_cert.arn}"
    ssl_support_method = "sni-only"
  }
  depends_on = [
    "aws_acm_certificate_validation.wimv"
  ]
}

// This Route53 record will point at our CloudFront distribution.
resource "aws_route53_record" "wimv_dns" {
  zone_id = "${var.dns_zone_id}"
  name    = "${local.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.wimv_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.wimv_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}
