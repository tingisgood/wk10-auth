// login.jsx
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../lib/firebase";

import React, { useState } from 'react';
import petsIcon from "../assets/petsIcon.png";

const PET_ICON_URL = "https://placehold.co/40x40/B88C6E/FFF?text=%E7%88%AA%E5%8D%B0"; 

const Login = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentTab, setCurrentTab] = useState('signIn');

  const ACCENT_COLOR = '#D6B788'; 
  const LIGHT_ACCENT_COLOR = '#D4A48A'; 
  const CARD_BG = '#FFF7E6'; 
  const APP_BG = '#FDF8F0'; 
  const isSignIn = currentTab === 'signIn';
  const buttonText = isSignIn ? '登 入' : '註 冊';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (isSignIn) {
      // ----- Firebase 登入 -----
      try {
        const userCredential = await signInWithEmailAndPassword(auth, loginId, password);

        // ✅ **改動點 1: 取得 Firebase ID Token**
        const token = await userCredential.user.getIdToken();
        console.log("JWT Token:", token);

        setMessage({ type: 'success', text: '登入成功！' });

        // --------- Step 2: 呼叫 Secured API ---------
        const response = await fetch("https://wk10-auth.onrender.com/secure/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ Bearer token 格式
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Secured API 失敗，HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log("Secured API 回傳資料：", data); 

      } catch (error) {
        console.error("登入錯誤:", error); // ✅ **改動點 2: 印出錯誤**
        setMessage({ type: 'error', text: '帳號或密碼錯誤，請再試一次。' });
      }

    } else {
      // ----- Firebase 註冊 -----
      try {
        const userCred = await createUserWithEmailAndPassword(auth, loginId, password);

        const uid = userCred.user.uid;
        console.log("新用戶 UID:", uid);

        setMessage({ type: 'success', text: `註冊成功！歡迎你 ${nickname}` });

        // 清空表單
        setRealName('');
        setNickname('');
        setPhoneNumber('');
        setAddress('');
        setLoginId('');
        setPassword('');

      } catch (error) {
        console.error("註冊錯誤:", error); // ✅ **改動點 3: 印出錯誤**
        setMessage({ type: 'error', text: '註冊失敗，請確認帳號格式是否正確或已存在。' });
      }
    }

    setLoading(false);
  };

  return (
    <div 
      className="h-187 flex items-start px-2 py-6 justify-center font-inter transition-colors duration-500"
      style={{ backgroundColor: APP_BG }}
    >
      <div 
        className="w-full max-w-sm sm:max-w-md rounded-2xl shadow-xl overflow-hidden" 
        style={{ backgroundColor: CARD_BG }}
      >
        <div className="p-8 pb-4 text-gray-800 text-center">
          <div className="flex justify-center items-center mb-4">
            <img src={petsIcon} alt="寵物之家標誌" className="w-8 h-8 object-contain" />
            <span className="text-3xl font-bold ml-2 text-gray-800">浪浪主人</span> 
          </div>
          <p className="text-sm text-gray-500 mb-6">收養代替購買：給浪浪溫暖的家</p>
          <div className="flex justify-center border-b border-gray-300 mb-8 text-sm font-semibold">
            <button
              onClick={() => setCurrentTab('signIn')}
              className={`px-4 py-2 uppercase tracking-wider transition duration-200 ${
                isSignIn ? 'text-gray-800 border-b-2 font-bold' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={isSignIn ? { borderColor: ACCENT_COLOR } : {}}
            >
              登入 (SIGN IN)
            </button>
            <button
              onClick={() => setCurrentTab('signUp')}
              className={`px-4 py-2 uppercase tracking-wider transition duration-200 ${
                !isSignIn ? 'text-gray-800 border-b-2 font-bold' : 'text-gray-500 hover:text-gray-700'
              }`}
              style={!isSignIn ? { borderColor: ACCENT_COLOR } : {}}
            >
              註冊 (SIGN UP)
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pt-0 pb-8 space-y-6">
          {message.text && (
            <div 
              className={`p-3 rounded-lg text-sm font-medium ${
                message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {isSignIn && (
            <>
              <div>
                <input
                  id="loginId"
                  name="loginId"
                  type="text"
                  autoComplete="username"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  disabled={loading}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150 sm:text-base bg-white"
                  placeholder="請輸入您的帳號"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 transition duration-150 sm:text-base bg-white"
                  placeholder="請輸入密碼"
                />
              </div>
            </>
          )}

          {!isSignIn && (
            <>
              {/* 註冊欄位保持原樣 */}
            </>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-lg font-bold text-white transition duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-opacity-90 transform hover:scale-[1.01] active:scale-[0.98]'
              }`}
              style={{ backgroundColor: ACCENT_COLOR }}
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
