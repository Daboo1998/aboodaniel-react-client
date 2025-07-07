#!/usr/bin/env python3
"""
Test script to verify OpenAI API integration is working correctly.
Run this script to test your updated Lambda functions.
"""

import requests
import json
import time
import os
from typing import Dict, Any, Optional


# Configuration
API_BASE_URL = "https://api.aboodaniel.pl"
API_KEY = os.environ.get("AWS_LAMBDA_API_KEY")  # Your Lambda API key

# Headers for API requests
HEADERS = {
    "Content-Type": "application/json",
    "x-api-key": API_KEY
}


def test_api_endpoint(method: str, endpoint: str, data: Optional[Dict[Any, Any]] = None, params: Optional[Dict[str, str]] = None):
    """Test an API endpoint and return the response."""
    url = f"{API_BASE_URL}{endpoint}"
    
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=HEADERS, params=params)
        elif method.upper() == "POST":
            response = requests.post(url, headers=HEADERS, json=data)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        print(f"🔍 Testing {method} {endpoint}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            print(f"   ✅ Success")
            return response.json()
        else:
            print(f"   ❌ Error: {response.text}")
            return None
            
    except Exception as e:
        print(f"   💥 Exception: {str(e)}")
        return None


def test_conversation_flow():
    """Test the complete conversation flow."""
    print("🧪 Testing Complete Conversation Flow")
    print("=" * 50)
    
    # Step 1: Start conversation
    print("\n1️⃣ Starting conversation...")
    start_response = test_api_endpoint("GET", "/start_conversation_with_me", params={"isPrivate": "false"})
    
    if not start_response:
        print("❌ Failed to start conversation")
        return
    
    thread_id = start_response.get("thread_id")
    assistant_id = start_response.get("assistant_id")
    
    print(f"   Thread ID: {thread_id}")
    print(f"   Assistant ID: {assistant_id}")
    
    # Step 2: Send a message
    print("\n2️⃣ Sending message...")
    message_data = {
        "thread_id": thread_id,
        "assistant_id": assistant_id,
        "message": "Hello! Can you tell me about Daniel Aboo?",
        "isLastMessage": False
    }
    
    ask_response = test_api_endpoint("POST", "/ask_me_anything", data=message_data)
    
    if not ask_response:
        print("❌ Failed to send message")
        return
    
    run_id = ask_response.get("run_id")
    print(f"   Run ID: {run_id}")
    
    # Step 3: Wait for completion
    print("\n3️⃣ Waiting for response...")
    max_attempts = 30
    attempts = 0
    
    while attempts < max_attempts:
        status_response = test_api_endpoint(
            "GET", 
            "/is_conversation_running",
            params={"run_id": run_id, "thread_id": thread_id}
        )
        
        if status_response and not status_response.get("isRunning"):
            print(f"   ✅ Conversation completed after {attempts + 1} attempts")
            break
        
        attempts += 1
        time.sleep(2)
        print(f"   ⏳ Still running... (attempt {attempts}/{max_attempts})")
    
    if attempts >= max_attempts:
        print("   ⚠️ Timeout waiting for response")
        return
    
    # Step 4: Load conversation
    print("\n4️⃣ Loading conversation...")
    load_response = test_api_endpoint(
        "GET", 
        "/load_conversation_with_me",
        params={"thread_id": thread_id}
    )
    
    if load_response:
        print(f"   ✅ Loaded {len(load_response)} messages")
        for i, msg in enumerate(load_response):
            role = msg.get("role", "unknown")
            content_preview = str(msg.get("content", ""))[:100] + "..." if len(str(msg.get("content", ""))) > 100 else str(msg.get("content", ""))
            print(f"   Message {i+1} ({role}): {content_preview}")
    
    # Step 5: End conversation
    print("\n5️⃣ Ending conversation...")
    end_response = test_api_endpoint("POST", "/end_conversation_with_me", data={"thread_id": thread_id})
    
    if end_response:
        print("   ✅ Conversation ended successfully")
    
    print("\n🎉 Conversation flow test completed!")


def test_simple_chat():
    """Test simple chat completion if available."""
    print("\n🧪 Testing Simple Chat Completion")
    print("=" * 40)
    
    test_data = {
        "message": "Hello! This is a test message."
    }
    
    response = test_api_endpoint("POST", "/simple_chat_completion", data=test_data)
    
    if response:
        print(f"   Response: {response.get('response', 'No response')}")
        print(f"   Model: {response.get('model', 'Unknown')}")
        usage = response.get('usage', {})
        print(f"   Tokens: {usage.get('total_tokens', 'Unknown')}")


def check_prerequisites():
    """Check if all prerequisites are met."""
    print("🔍 Checking Prerequisites")
    print("=" * 30)
    
    if not API_KEY:
        print("❌ AWS_LAMBDA_API_KEY environment variable not set")
        print("   Please set it with: export AWS_LAMBDA_API_KEY='your-api-key'")
        return False
    
    print("✅ API key is set")
    
    # Test basic connectivity
    try:
        response = requests.get(f"{API_BASE_URL}/health", timeout=10)
        print("✅ API endpoint is reachable")
    except Exception as e:
        print(f"⚠️ API endpoint test failed: {str(e)}")
    
    return True


def main():
    """Main test function."""
    print("🧪 OpenAI API Integration Test Suite")
    print("=" * 50)
    
    if not check_prerequisites():
        return
    
    # Test conversation flow
    test_conversation_flow()
    
    # Test simple chat (if available)
    test_simple_chat()
    
    print("\n📊 Test Summary")
    print("=" * 20)
    print("If you see ✅ for most tests, your API integration is working!")
    print("If you see ❌ or 💥, check your Lambda function logs in CloudWatch.")


if __name__ == "__main__":
    main()