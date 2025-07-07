# OpenAI API Update Guide 2024-2025

## Overview
Your assistant appears to be broken due to recent changes in the OpenAI API. Based on my analysis, your React frontend calls a backend API at `https://api.aboodaniel.pl/` which handles the OpenAI integration. The issues are likely in your backend Lambda functions.

## Major Breaking Changes

### 1. OpenAI Python Client Library v1.0+ Changes

**Old Code (Deprecated):**
```python
import openai

openai.api_key = "your-api-key"

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}]
)
```

**New Code (Required):**
```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="gpt-4o",  # Updated model
    messages=[{"role": "user", "content": "Hello"}]
)

# Access response content differently
content = response.choices[0].message.content
```

### 2. Deprecated Models

Several models have been deprecated and removed:

| Deprecated Model | Replacement | Status |
|-----------------|-------------|---------|
| `gpt-4-32k-0314` | `gpt-4o` | Removed June 2025 |
| `gpt-4-32k-0613` | `gpt-4o` | Removed June 2025 |
| `text-davinci-003` | `gpt-3.5-turbo-instruct` | Removed |
| `gpt-4-vision-preview` | `gpt-4o` | Deprecated |

### 3. Assistant API Changes

**Old Assistant API Pattern:**
```python
import openai

# Old way - likely causing errors
assistant = openai.beta.assistants.create(...)
thread = openai.beta.threads.create()
```

**New Assistant API Pattern:**
```python
from openai import OpenAI

client = OpenAI(api_key="your-api-key")

# Create assistant
assistant = client.beta.assistants.create(
    name="Personal Assistant",
    instructions="You are a helpful assistant...",
    model="gpt-4o",  # Use latest model
    tools=[{"type": "code_interpreter"}]
)

# Create thread
thread = client.beta.threads.create()

# Add message
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Your message here"
)

# Run assistant
run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assistant.id
)

# Wait for completion
while run.status in ['queued', 'in_progress', 'cancelling']:
    time.sleep(1)
    run = client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
    )

# Get messages
messages = client.beta.threads.messages.list(thread_id=thread.id)
```

## Required Backend Updates

Your backend Lambda functions need these updates:

### 1. Update Dependencies

**requirements.txt:**
```
openai>=1.50.0  # Latest version
```

### 2. Update Lambda Function Code

**Before (Broken):**
```python
import openai

def lambda_handler(event, context):
    openai.api_key = os.environ['OPENAI_API_KEY']
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages
    )
    
    return response['choices'][0]['message']['content']
```

**After (Fixed):**
```python
from openai import OpenAI
import os
import json

def lambda_handler(event, context):
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    try:
        response = client.chat.completions.create(
            model="gpt-4o",  # Updated model
            messages=messages,
            max_tokens=4000,
            temperature=0.7
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'content': response.choices[0].message.content
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
```

### 3. Assistant API Updates

**Updated Assistant Functions:**
```python
from openai import OpenAI
import time

def start_conversation_with_me(event, context):
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    # Create assistant with updated model
    assistant = client.beta.assistants.create(
        name="Daniel's Assistant",
        instructions="You are Daniel's personal assistant...",
        model="gpt-4o",  # Updated from gpt-4
        tools=[{"type": "code_interpreter"}]
    )
    
    # Create thread
    thread = client.beta.threads.create()
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'thread_id': thread.id,
            'assistant_id': assistant.id
        })
    }

def ask_me_anything(event, context):
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    body = json.loads(event['body'])
    
    # Add message to thread
    message = client.beta.threads.messages.create(
        thread_id=body['thread_id'],
        role="user",
        content=body['message']
    )
    
    # Run assistant
    run = client.beta.threads.runs.create(
        thread_id=body['thread_id'],
        assistant_id=body['assistant_id']
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps({'run_id': run.id})
    }

def is_conversation_running(event, context):
    client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])
    
    run = client.beta.threads.runs.retrieve(
        thread_id=event['queryStringParameters']['thread_id'],
        run_id=event['queryStringParameters']['run_id']
    )
    
    is_running = run.status in ['queued', 'in_progress', 'cancelling']
    
    return {
        'statusCode': 200,
        'body': json.dumps({'isRunning': is_running})
    }
```

## Environment Variables

Make sure these are set in your Lambda environment:
```
OPENAI_API_KEY=your-actual-openai-api-key
```

## Model Recommendations

- **Replace `gpt-4`** → **`gpt-4o`** (better performance, lower cost)
- **Replace `gpt-3.5-turbo`** → **`gpt-4o-mini`** (faster, cheaper)
- **Remove any `gpt-4-32k` variants** → **`gpt-4o`** (128k context)

## Testing Your Fixes

1. Update your Lambda function dependencies
2. Deploy the updated code with new OpenAI client usage
3. Test the API endpoints:
   - `/start_conversation_with_me`
   - `/ask_me_anything`
   - `/is_conversation_running`
   - `/load_conversation_with_me`

## Common Error Messages & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `APIRemovedInV1` | Using old client syntax | Update to new client pattern |
| `model_not_found` | Deprecated model | Switch to `gpt-4o` or `gpt-4o-mini` |
| `AttributeError: module 'openai' has no attribute 'ChatCompletion'` | Wrong import | Use `from openai import OpenAI` |

## Next Steps

1. **Backup your current Lambda functions**
2. **Update the OpenAI client library** in your requirements.txt
3. **Refactor your Lambda functions** to use the new client pattern
4. **Update model names** to use current models
5. **Test thoroughly** before deploying to production

Your React frontend code looks fine and doesn't need changes - the issue is entirely in the backend API integration.