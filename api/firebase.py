#firebase.py
# import firebase_admin
# from firebase_admin import credentials, auth, initialize_app
# import os

# key_path = os.path.join(os.path.dirname(__file__), "firebase_key.json")
# # 讀取 Firebase Admin 金鑰
# cred = credentials.Certificate(key_path)
# firebase_admin.initialize_app(cred)

import firebase_admin
from firebase_admin import credentials, auth
import os

cred_path = os.path.join(os.path.dirname(__file__), "firebase_key.json")
cred = credentials.Certificate(cred_path)

# ✅ 確保只初始化一次
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)



