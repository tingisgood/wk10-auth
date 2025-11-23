#api/middlewares/auth.py
from fastapi import Request, HTTPException
from firebase_admin import auth

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")

    token = auth_header.split(" ")[1]  # 拿到 JWT

    try:
        decoded = auth.verify_id_token(token)
        request.state.user = decoded
        return decoded 
    except:
        raise HTTPException(status_code=401, detail="Invalid Token")
