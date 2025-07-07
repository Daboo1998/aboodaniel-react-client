"""
Simple example of the NEW OpenAI Responses API
This replaces the old Assistants API pattern
"""

from openai import OpenAI
import os

# Initialize client (same as before)
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

def simple_conversation_example():
    """Example of a multi-turn conversation using Responses API"""
    
    # First message - no previous_response_id needed
    print("🤖 Starting conversation...")
    
    response1 = client.responses.create(
        model="gpt-4o",
        instructions="You are a helpful assistant that remembers context.",
        input="Hi! My name is Daniel. What's the weather like today?",
    )
    
    print(f"Assistant: {response1.output_text}")
    response_id = response1.id  # Save this for next message
    
    # Second message - use previous_response_id to maintain context
    print("\n🤖 Continuing conversation...")
    
    response2 = client.responses.create(
        model="gpt-4o", 
        input="What was my name again?",  # Test if it remembers
        previous_response_id=response_id  # This maintains conversation context!
    )
    
    print(f"Assistant: {response2.output_text}")
    
    # The assistant should remember "Daniel" from the first message!
    
    return response2.id  # Return latest response ID

def conversation_with_tools():
    """Example using built-in tools like web search"""
    
    response = client.responses.create(
        model="gpt-4o",
        instructions="You are a helpful assistant with access to web search.",
        input="What's the latest news about AI in 2025?",
        tools=[
            {"type": "web_search"},  # Built-in web search!
            {"type": "file_search"}  # Built-in file search!
        ]
    )
    
    print(f"Assistant with web search: {response.output_text}")
    return response.id

def lambda_handler_example(event, context):
    """
    Example Lambda function using Responses API
    This is much simpler than the old Assistants API!
    """
    
    try:
        # Parse the request
        import json
        body = json.loads(event['body'])
        
        user_message = body['message']
        previous_response_id = body.get('previous_response_id')
        
        # Create response (ONE API CALL vs multiple with Assistants API)
        response = client.responses.create(
            model="gpt-4o",
            instructions="You are Daniel's helpful assistant.",
            input=user_message,
            previous_response_id=previous_response_id  # Maintains conversation
        )
        
        # Return the response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response_id': response.id,  # Frontend saves this for next message
                'content': response.output_text,
                'model': response.model,
                'usage': {
                    'total_tokens': response.usage.total_tokens if response.usage else 0
                }
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }

if __name__ == "__main__":
    # Test the new API
    print("=== Testing Responses API ===")
    
    try:
        # Simple conversation
        simple_conversation_example()
        
        print("\n" + "="*50)
        
        # Conversation with tools
        conversation_with_tools()
        
    except Exception as e:
        print(f"Error: {e}")
        print("Make sure you have OPENAI_API_KEY set and openai>=1.50.0 installed")