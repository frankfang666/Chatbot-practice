from fastapi import FastAPI, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel
from openai import OpenAI, AsyncOpenAI
from fastapi.responses import StreamingResponse
import uvicorn

# client = OpenAI()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return 'Home'


client = AsyncOpenAI()
@app.get('/query')
async def answer(query: str):
    data = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": query}],
        stream=True,
    )
    async def event_stream():
        async for chunk in data:
            yield chunk.choices[0].delta.content or ""
    return StreamingResponse(event_stream(), media_type="text/event-stream")

if __name__ == '__main__':
    uvicorn.run(app=app, host='127.0.0.1', port=3001)