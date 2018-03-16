locals {
  domain      = "${var.root_domain_name}"
  environment = "${var.subdomain}-bare"
  bucket_name = "${var.root_bucket_name}-${local.environment}"
  subdomain   = "${var.subdomain}"
}

data "aws_iam_policy_document" "s3_get_policy" {
  statement {
    sid = "AllowGet"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${local.bucket_name}/*",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "redirect_bucket" {
  bucket = "${local.bucket_name}"
  acl    = "public-read"
  policy = "${data.aws_iam_policy_document.s3_get_policy.json}"

  website {
    redirect_all_requests_to = "${var.redirect_target}"
  }

  tags {
    Client      = "siberia"
    Environment = "${local.environment}"
    Terraform   = "true"
  }
}

resource "aws_cloudfront_distribution" "redirect_distribution" {
  // origin is where CloudFront gets its content from.
  origin {
    domain_name = "${aws_s3_bucket.redirect_bucket.website_endpoint}"
    origin_id   = "s3_redirect"

    custom_origin_config {
      http_port  = 80
      https_port = 443

      // S3 website endpoints don't support SSL
      origin_protocol_policy = "http-only"

      origin_ssl_protocols = [
        "SSLv3",
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  aliases = [
    "${local.domain}",
  ]

  comment = "Terraform managed. Serves content for ${local.domain} w/ SSL."

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
      "OPTIONS",
    ]

    cached_methods = [
      "GET",
      "HEAD",
    ]

    target_origin_id = "s3_redirect"

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

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"

      locations = [
        "US",
        "CA",
        "GB",
        "DE",
      ]
    }
  }

  tags {
    Client      = "siberia"
    Environment = "${local.environment}"
    Terraform   = "true"
  }

  viewer_certificate {
    acm_certificate_arn = "${aws_acm_certificate.redirect_cert.arn}"
    ssl_support_method  = "sni-only"
  }

  depends_on = [
    "aws_acm_certificate_validation.redirect",
  ]
}

// This Route53 record will point at our CloudFront distribution.
resource "aws_route53_record" "redirect_dns" {
  zone_id = "${var.dns_zone_id}"
  name    = "${local.domain}"
  type    = "A"

  alias {
    name                   = "${aws_cloudfront_distribution.redirect_distribution.domain_name}"
    zone_id                = "${aws_cloudfront_distribution.redirect_distribution.hosted_zone_id}"
    evaluate_target_health = false
  }
}
