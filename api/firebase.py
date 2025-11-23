#firebase.py
import firebase_admin
from firebase_admin import credentials, auth, initialize_app
import os

key_path = os.path.join(os.path.dirname(__file__), "firebase_key.json")
# 讀取 Firebase Admin 金鑰
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

