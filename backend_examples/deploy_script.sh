#!/bin/bash

# OpenAI API Update Deployment Script
# This script helps deploy the updated Lambda functions with the new OpenAI API

echo "🚀 Starting OpenAI API Update Deployment..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured. Please run 'aws configure' first."
    exit 1
fi

# Function to update a Lambda function
update_lambda_function() {
    local function_name=$1
    local zip_file=$2
    
    echo "📦 Updating Lambda function: $function_name"
    
    # Update function code
    aws lambda update-function-code \
        --function-name "$function_name" \
        --zip-file "fileb://$zip_file"
    
    # Update environment variables (if needed)
    aws lambda update-function-configuration \
        --function-name "$function_name" \
        --environment Variables="{OPENAI_API_KEY=$OPENAI_API_KEY}"
    
    echo "✅ Updated $function_name"
}

# Create deployment package
create_deployment_package() {
    echo "📦 Creating deployment package..."
    
    # Create temporary directory
    mkdir -p deploy_temp
    cd deploy_temp
    
    # Copy function code
    cp ../assistant_api_updated.py .
    
    # Install dependencies
    pip install -r ../requirements.txt -t .
    
    # Create zip file
    zip -r assistant_functions.zip .
    
    cd ..
    echo "✅ Deployment package created: deploy_temp/assistant_functions.zip"
}

# Main deployment process
main() {
    # Check if OpenAI API key is set
    if [ -z "$OPENAI_API_KEY" ]; then
        echo "❌ OPENAI_API_KEY environment variable not set."
        echo "Please set it with: export OPENAI_API_KEY='your-api-key'"
        exit 1
    fi
    
    # Create deployment package
    create_deployment_package
    
    # Update Lambda functions (adjust function names as needed)
    echo "🔄 Updating Lambda functions..."
    
    # You'll need to replace these with your actual Lambda function names
    # update_lambda_function "start-conversation-function" "deploy_temp/assistant_functions.zip"
    # update_lambda_function "ask-me-anything-function" "deploy_temp/assistant_functions.zip"
    # update_lambda_function "is-conversation-running-function" "deploy_temp/assistant_functions.zip"
    # update_lambda_function "load-conversation-function" "deploy_temp/assistant_functions.zip"
    # update_lambda_function "end-conversation-function" "deploy_temp/assistant_functions.zip"
    
    echo "⚠️  Please update the function names above with your actual Lambda function names"
    echo "⚠️  Then uncomment and run the update commands"
    
    # Cleanup
    rm -rf deploy_temp
    
    echo "🎉 Deployment completed!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Test your API endpoints"
    echo "2. Check CloudWatch logs for any errors"
    echo "3. Update any remaining old API calls"
}

# Run main function
main