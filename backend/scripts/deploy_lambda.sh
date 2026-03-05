#!/bin/bash
# ============================================================
# DEPLOY LAMBDA FUNCTIONS + API GATEWAY
# Run AFTER setup_aws.sh
# ============================================================

REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/JobProviderLambdaRole"

echo "🚀 Deploying Lambda functions..."
echo "Waiting 10s for IAM role to propagate..."
sleep 10

# ─── PACKAGE & DEPLOY JOBS LAMBDA ────────────────────────────
echo ""
echo "📦 Packaging jobs_handler..."
cd lambda_functions
zip jobs_handler.zip jobs_handler.py

aws lambda create-function \
  --function-name JobProviderJobs \
  --runtime python3.11 \
  --role $ROLE_ARN \
  --handler jobs_handler.handler \
  --zip-file fileb://jobs_handler.zip \
  --region $REGION \
  2>/dev/null || aws lambda update-function-code \
    --function-name JobProviderJobs \
    --zip-file fileb://jobs_handler.zip \
    --region $REGION

echo "✅ JobProviderJobs Lambda deployed"

# ─── PACKAGE & DEPLOY APPLICATIONS LAMBDA ────────────────────
echo ""
echo "📦 Packaging applications_handler..."
zip applications_handler.zip applications_handler.py

aws lambda create-function \
  --function-name JobProviderApplications \
  --runtime python3.11 \
  --role $ROLE_ARN \
  --handler applications_handler.handler \
  --zip-file fileb://applications_handler.zip \
  --region $REGION \
  2>/dev/null || aws lambda update-function-code \
    --function-name JobProviderApplications \
    --zip-file fileb://applications_handler.zip \
    --region $REGION

echo "✅ JobProviderApplications Lambda deployed"

cd ..

# ─── CREATE API GATEWAY ───────────────────────────────────────
echo ""
echo "🌐 Creating API Gateway..."

API_ID=$(aws apigateway create-rest-api \
  --name "JobProviderAPI" \
  --region $REGION \
  --query 'id' --output text 2>/dev/null)

echo "✅ API Gateway created: $API_ID"

echo ""
echo "============================================"
echo "✅ Lambda deployment complete!"
echo "API Gateway ID: $API_ID"
echo ""
echo "Your API base URL will be:"
echo "https://$API_ID.execute-api.$REGION.amazonaws.com/prod"
echo ""
echo "Save this URL — you'll add it to your Expo app's services/ files"
echo "============================================"