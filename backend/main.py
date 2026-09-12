from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import json

app = FastAPI(title="Platform Play API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (replace with PostgreSQL in production)
users: Dict[int, dict] = {}
agents: Dict[int, dict] = {}
transactions: list[dict] = []
lessons: list[dict] = [
    {
        "id": "1",
        "title": "Welcome to Platform Play",
        "content": "Learn how to start earning with AI.",
        "duration": 5,
        "order": 1,
    },
    {
        "id": "2",
        "title": "Understanding Affiliate Marketing",
        "content": "How affiliate marketing works and how to earn.",
        "duration": 10,
        "order": 2,
    },
    {
        "id": "3",
        "title": "Choosing Your Path",
        "content": "UGC, Affiliate, Freelance, or Micro-tasks.",
        "duration": 8,
        "order": 3,
    },
]

# WebSocket connections
active_connections: list[WebSocket] = []


@app.get("/")
async def root():
    return {"message": "Platform Play API"}


@app.get("/api/user")
async def get_user():
    return {"id": "1", "telegram_id": 123456, "username": "user", "goal": "Affiliate", "created_at": "2024-01-01"}


@app.get("/api/agent")
async def get_agent():
    return {
        "id": "1",
        "user_id": "1",
        "status": "active",
        "earnings": 125.50,
        "clicks": 1542,
        "posts_today": 23,
        "last_active": "2024-01-01T12:00:00Z",
    }


@app.post("/api/agent/start")
async def start_agent(goal: str):
    return {
        "id": "1",
        "user_id": "1",
        "status": "active",
        "earnings": 125.50,
        "clicks": 1542,
        "posts_today": 23,
        "last_active": "2024-01-01T12:00:00Z",
    }


@app.post("/api/agent/pause")
async def pause_agent():
    return {
        "id": "1",
        "user_id": "1",
        "status": "paused",
        "earnings": 125.50,
        "clicks": 1542,
        "posts_today": 23,
        "last_active": "2024-01-01T12:00:00Z",
    }


@app.get("/api/transactions")
async def get_transactions(limit: int = 10):
    return transactions[-limit:]


@app.get("/api/lessons")
async def get_lessons():
    return lessons


@app.post("/api/lessons/{lesson_id}/complete")
async def complete_lesson(lesson_id: str):
    return {"message": "Lesson completed", "lesson_id": lesson_id}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)

    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)

            # Broadcast to all connected clients
            for connection in active_connections:
                await connection.send_json(message)

    except WebSocketDisconnect:
        active_connections.remove(websocket)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
