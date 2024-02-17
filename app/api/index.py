from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import json
from fastapi.middleware.cors import CORSMiddleware 
import time
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/basicStream")
def basicStream():
    def generate():
        for i in range(10):
            yield json.dumps({"number": i}) + "\n"
            time.sleep(1)
    return StreamingResponse(content=generate(),  media_type="application/json")
