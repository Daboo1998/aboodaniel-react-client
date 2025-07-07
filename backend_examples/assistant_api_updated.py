"""
Updated Lambda functions for OpenAI Assistant API integration.
Compatible with OpenAI Python client v1.50+
"""

import json
import os
import time
from openai import OpenAI


def get_openai_client():
    """Initialize OpenAI client with API key from environment"""
    return OpenAI(api_key=os.environ['OPENAI_API_KEY'])


def start_conversation_with_me(event, context):
    """
    Start a new conversation thread with the assistant.
    Maps to: /start_conversation_with_me?isPrivate=true/false
    """
    client = get_openai_client()
    
    try:
        # Get query parameters
        query_params = event.get('queryStringParameters', {}) or {}
        is_private = query_params.get('isPrivate', 'false').lower() == 'true'
        
        # Create assistant based on privacy setting
        if is_private:
            instructions = """You are Daniel Aboo's personal assistant. You have access to his private information 
            and can help with personal tasks, schedule management, and confidential matters."""
            assistant_name = "Daniel's Personal Assistant"
        else:
            instructions = """You are a helpful assistant that can answer questions about Daniel Aboo based on 
            his public information, CV, and portfolio. You can provide information about his experience, 
            skills, and projects."""
            assistant_name = "Daniel's Public Assistant"
        
        # Create assistant with updated API
        assistant = client.beta.assistants.create(
            name=assistant_name,
            instructions=instructions,
            model="gpt-4o",  # Updated model
            tools=[{"type": "code_interpreter"}],
            temperature=0.7
        )
        
        # Create thread
        thread = client.beta.threads.create()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
            },
            'body': json.dumps({
                'thread_id': thread.id,
                'assistant_id': assistant.id,
                'is_private': is_private
            })
        }
        
    except Exception as e:
        print(f"Error starting conversation: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to start conversation: {str(e)}'})
        }


def ask_me_anything(event, context):
    """
    Send a message to the assistant and start a run.
    Maps to: /ask_me_anything
    """
    client = get_openai_client()
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        thread_id = body['thread_id']
        assistant_id = body['assistant_id']
        message = body['message']
        is_last_message = body.get('isLastMessage', False)
        
        # Add message to thread
        client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message
        )
        
        # Add special instruction for last message
        additional_instructions = ""
        if is_last_message:
            additional_instructions = "[ASSISTANT_MESSAGE]Stop Conversation[/ASSISTANT_MESSAGE]"
        
        # Create and start run
        run = client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=assistant_id,
            additional_instructions=additional_instructions
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
            },
            'body': json.dumps({'run_id': run.id})
        }
        
    except Exception as e:
        print(f"Error sending message: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to send message: {str(e)}'})
        }


def is_conversation_running(event, context):
    """
    Check if a run is still in progress.
    Maps to: /is_conversation_running?run_id=xxx&thread_id=xxx
    """
    client = get_openai_client()
    
    try:
        # Get query parameters
        query_params = event.get('queryStringParameters', {}) or {}
        run_id = query_params.get('run_id')
        thread_id = query_params.get('thread_id')
        
        if not run_id or not thread_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing run_id or thread_id'})
            }
        
        # Get run status
        run = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run_id
        )
        
        is_running = run.status in ['queued', 'in_progress', 'cancelling']
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
            },
            'body': json.dumps({
                'isRunning': is_running,
                'status': run.status
            })
        }
        
    except Exception as e:
        print(f"Error checking run status: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to check run status: {str(e)}'})
        }


def load_conversation_with_me(event, context):
    """
    Load all messages from a conversation thread.
    Maps to: /load_conversation_with_me?thread_id=xxx
    """
    client = get_openai_client()
    
    try:
        # Get query parameters
        query_params = event.get('queryStringParameters', {}) or {}
        thread_id = query_params.get('thread_id')
        
        if not thread_id:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Missing thread_id'})
            }
        
        # Get messages from thread
        messages = client.beta.threads.messages.list(
            thread_id=thread_id,
            order="asc"  # Get messages in chronological order
        )
        
        # Format messages for frontend
        formatted_messages = []
        for message in messages.data:
            formatted_messages.append({
                'role': message.role,
                'content': message.content,
                'created_at': message.created_at,
                'id': message.id
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
            },
            'body': json.dumps(formatted_messages)
        }
        
    except Exception as e:
        print(f"Error loading conversation: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to load conversation: {str(e)}'})
        }


def end_conversation_with_me(event, context):
    """
    End a conversation by deleting the thread.
    Maps to: /end_conversation_with_me
    """
    client = get_openai_client()
    
    try:
        # Parse request body
        body = json.loads(event['body'])
        thread_id = body['thread_id']
        
        # Delete the thread
        client.beta.threads.delete(thread_id)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, x-api-key'
            },
            'body': json.dumps({'message': 'Conversation ended successfully'})
        }
        
    except Exception as e:
        print(f"Error ending conversation: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to end conversation: {str(e)}'})
        }


# For testing purposes - simple chat completion
def simple_chat_completion(event, context):
    """
    Simple chat completion example for testing the new API.
    """
    client = get_openai_client()
    
    try:
        body = json.loads(event['body'])
        message = body.get('message', 'Hello!')
        
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'response': response.choices[0].message.content,
                'model': response.model,
                'usage': {
                    'prompt_tokens': response.usage.prompt_tokens,
                    'completion_tokens': response.usage.completion_tokens,
                    'total_tokens': response.usage.total_tokens
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