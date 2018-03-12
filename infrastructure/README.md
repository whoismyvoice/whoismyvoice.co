# Who Is My Voice Infrastructure

This folder of the repository is the "root" of the infrastructure
configuration.

## Install Tools

* Install [terraform][tf]

## Setup Variables in `secrets.json`

Copy `infrastructure/config/secrets.sample.json` to
`infrastructure/config/secrets.json` and populate the values. The
`secrets.json` file will be used by all `terraform` plans.

* `aws_access_key` is the access key provided by IAM
* `aws_secret_key` is the secret key provided by IAM
* `aws_access_id` is the id number of the account with which IAM user is
  associated.
* `aws_instance_key_location` is the location on the local filesystem of the
  `.pem` key file corresponding to the keypair for connecting to instances
* `aws_region_id` is the region the builder instance will be launched in
* `google_civic_api_key` is the API key used to [Google Civic Information
  API][gcvi].

## Terraform

There are several Terraform "plan" folders. Each plan has a distinct purpose:

* `global/s3` sets up the S3 bucket where the plans store their `.tfstate`
  files.
* `global/locktable` sets up the dynamo db table used for locking `.tfstate`
  across developers.
* `lambda/gateway` manages the API Gateway and Lambda functions used to
  retrieve data from disparate API sources.

The `backend.tf` file places the `.tfstate` file for each plan have their own
key in the S3 bucket created by the `global/s3` plan. `backend.tf` also
declares a `dynamodb_table` property which references the dynamo db table from
`global/locktable` in order to ensure a plan is only executed from one place at
a time.

### `server/production`

The production plan manages the S3 Bucket(s), CloudFront Distribution(s), and
Route53 DNS record(s) for the statically hosted site.

If this is your first time running `terraform` commands for this plan on this
computer

    terraform init

When ready to check the resources for changes run

    terraform plan \
        -var-file=../../config/secrets.json \
        -out=server-production.tfplan

To execute the plan identified by the previous command

    terraform apply server-production.tfplan

### `lambda/gateway`

The gateway plan manages the API Gateway and Lambda functions used by the front
end application. The source of the Lambda functions live with
`modules/civics-resource` and `modules/maplight-resource`. These modules are
used by the `lambda/gateway` plan to create the Lambda functions and the
necessary API Gateway resources.

If this is your first time running `terraform` commands for this plan on this
computer

    terraform init

When ready to check the resources for changes run

    terraform plan \
        -var-file=../../config/secrets.json \
        -out=lambda-gateway.tfplan

To execute the plan identified by the previous command

    terraform apply lambda-gateway.tfplan

### `globals/s3`

This is the plan least likely to need changes. In the event the plan is being
edited, all commands should be run from the `infrastructure/globals/s3`
directory.

If this is your first time running `terraform` commands for this plan on this
computer

    terraform init

When ready to check the resources for changes run

    terraform plan \
        -var-file=../../config/secrets.json \
        -var='aws_region_id=us-east-1' \
        -out=globals-s3.tfplan

To execute the plan identified by the previous command

    terraform apply globals-s3.tfplan

### `globals/locktable`

This is another plan unlikely to need changes. In the event the plan is being
edited, all commands should be run from the `infrastructure/globals/locktable`
directory.

If this is your first time running `terraform` commands for this plan on this
computer

    terraform init

When ready to check the resources for changes run

    terraform plan \
        -var-file=../../config/secrets.json \
        -var='aws_region_id=us-east-1' \
        -out=globals-locktable.tfplan

To execute the plan identified by the previous command

    terraform apply globals-locktable.tfplan

## Editing Lambda Functions

To make changes to the Lambda functions you need to change them locally and
deploy the update with Terraform. Changes made directly in the AWS console will
be overwritten the next time the `lambda/gateway` Terraform plan is executed.


[gcvi]: https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
[tf]: https://www.terraform.io
[p]: https://www.packer.io
[sp]: https://standup.siberia.io
[ss]: https://standup.staging.siberia.io
[st]: https://standup.testing.siberia.io
