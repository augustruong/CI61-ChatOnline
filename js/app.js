import InputWrapper from "./components/InputWrapper.js";
import RegisterForm from "./components/RegisterForm.js";
import LoginForm from "./components/LoginForm.js";
import AppStat from "./components/AppStat.js";
import UserActions from "./components/UserActions.js";
import MessageList from "./components/MessageList.js";
import SendMessageForm from "./components/SendMessageForm.js";

import AuthScreen from "./screens/AuthScreen.js";
import ChatScreen from "./screens/ChatScreen.js";

import "./router.js";

import { authStateChanged } from "./models/user.js";

authStateChanged((user) => {
    if (user != null) {
        router.navigate('/chat');
    } else {
        router.navigate('/auth');
    }
});