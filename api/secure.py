# secure.py

from fastapi import APIRouter, Depends
from api.middlewares.auth import verify_token

router = APIRouter()

@router.get("/profile")
def get_profile(user = Depends(verify_token)):
    return {"uid": user["uid"], "email": user.get("email")}


