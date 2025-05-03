from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ativar todo o codigo com uvicorn chatbot_api:app --reload

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user_message: str

@app.post("/chat")
async def chat_endpoint(msg: Message):
    user_msg = msg.user_message.lower()

    if "olá" in user_msg or "oi" in user_msg:
        response = "Oi! Como posso ajudar você hoje?"
    elif "tchau" in user_msg:
        response = "Tchau! Até a próxima!"
    elif "como vai" in user_msg or "como está" in user_msg or "está bem" in user_msg:
        response = "Estou ótimo! E você?"
    elif "qual seu nome" in user_msg:
        response = "Meu nome é FURIAbot! E o seu?"
    elif "gosto" in user_msg:
        response = "Fico feliz que goste! O que mais você gostaria de saber?"
    elif "jogo de hoje" in user_msg:
        response = "Hoje é muita FURIA no LoL! Venha torcer com a gente!"
    elif "quero" in user_msg and "fulano na" in user_msg and "furia" in user_msg:
        response = "Haha, manda pro Jaimão que dinheiro não é problema!"
    elif "entrar na" in user_msg and "furia" in user_msg:
        response = "Manda currículo pra cá https://99jobs.com/furia/jobs e venha ser feliz na casa furiosa!"
    else:
        response = "Desculpe, não entendi. Pode me dar mais informações?"

    return {"response": response}

@app.options("/chat")
async def handle_options():
    return {}
