terraform {
  backend "s3" {
    bucket = "iac-trackpilots"
    key    = "terraform/backend/trackpilots/terraform.tfstate"
    region = "us-east-1"
  }
}