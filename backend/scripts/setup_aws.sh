#!/bin/bash
# ============================================================
# AWS SETUP SCRIPT - Run this ONCE to create all AWS resources
# Make sure you have run: aws configure
# ============================================================

REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "🚀 Setting up AWS resources for JobProvider..."
echo "Account: $ACCOUNT_ID | Region: $REGION"

# ─── 1. CREATE DYNAMODB TABLES ───────────────────────────────

echo ""
echo "📦 Creating DynamoDB tables..."

# Jobs table
aws dynamodb create-table \
  --table-name JobProviderJobs \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION \
  2>/dev/null && echo "✅ JobProviderJobs table created" || echo "⚠️  JobProviderJobs already exists"

# Applications table
aws dynamodb create-table \
  --table-name JobProviderApplications \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION \
  2>/dev/null && echo "✅ JobProviderApplications table created" || echo "⚠️  JobProviderApplications already exists"

# Users table
aws dynamodb create-table \
  --table-name JobProviderUsers \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $REGION \
  2>/dev/null && echo "✅ JobProviderUsers table created" || echo "⚠️  JobProviderUsers already exists"

# ─── 2. CREATE S3 BUCKET ─────────────────────────────────────

echo ""
echo "🪣 Creating S3 bucket for resumes/uploads..."

BUCKET_NAME="jobprovider-uploads-$ACCOUNT_ID"

aws s3api create-bucket \
  --bucket $BUCKET_NAME \
  --region $REGION \
  2>/dev/null && echo "✅ S3 bucket created: $BUCKET_NAME" || echo "⚠️  Bucket already exists"

# Block public access (keep files private)
aws s3api put-public-access-block \
  --bucket $BUCKET_NAME \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

echo "✅ S3 bucket secured (private access only)"

# ─── 3. CREATE IAM ROLE FOR LAMBDA ───────────────────────────

echo ""
echo "🔐 Creating IAM role for Lambda..."

aws iam create-role \
  --role-name JobProviderLambdaRole \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }' \
  2>/dev/null && echo "✅ IAM role created" || echo "⚠️  Role already exists"

# Attach policies
aws iam attach-role-policy \
  --role-name JobProviderLambdaRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess

aws iam attach-role-policy \
  --role-name JobProviderLambdaRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

aws iam attach-role-policy \
  --role-name JobProviderLambdaRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

echo "✅ IAM policies attached"

echo ""
echo "============================================"
echo "✅ AWS resources setup complete!"
echo "Bucket name: $BUCKET_NAME"
echo "Role ARN: arn:aws:iam::$ACCOUNT_ID:role/JobProviderLambdaRole"
echo ""
echo "Next step: Run deploy_lambda.sh to deploy your functions"
echo "============================================"