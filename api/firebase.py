#firebase.py
import firebase_admin
from firebase_admin import credentials, auth
import os

# 讀取 Firebase Admin 金鑰
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred)
