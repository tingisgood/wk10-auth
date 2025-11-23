#api/middlewares/auth.py
# from fastapi import Request, HTTPException
# from firebase_admin import auth

# async def verify_token(request: Request):
#     auth_header = request.headers.get("Authorization")

#     if not auth_header:
#         raise HTTPException(status_code=401, detail="Missing Authorization Header")

#     token = auth_header.split(" ")[1]  # 拿到 JWT

#     try:
#         decoded = auth.verify_id_token(token)
#         request.state.user = decoded
#         return decoded 
#     except:
#         raise HTTPException(status_code=401, detail="Invalid Token")
from fastapi import Request, HTTPException
from firebase_admin import auth
import logging

logger = logging.getLogger("auth")

async def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    parts = auth_header.split(" ")
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Authorization Header format")

    token = parts[1]
    try:
        decoded = auth.verify_id_token(token)
        request.state.user = decoded
        logger.info(f"驗證成功 UID: {decoded['uid']}")
        return decoded
    except Exception as e:
        logger.error(f"JWT 驗證失敗: {e}")
        raise HTTPException(status_code=401, detail="Invalid Token")


