import { listenCurrentUser } from "../models/user.js";
import { getConversationById, listenConversation } from "../models/conversation.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="chat-screen">
        <div class="aside-left"> 
            <app-stat></app-stat>
            <user-actions></user-actions>
        </div>

        <div class="chat-container"> 
            <message-list></message-list>
            <send-message-form></send-message-form>
        </div>
    </div>
`;

let messages = [
    {content: 'No conversation, flirt or bite to start'}
];

export default class ChatScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$userActions = this.querySelector('user-actions');
        this.$messageList = this.querySelector('message-list');
        this.$sendMessageForm = this.querySelector('send-message-form')
    }

    connectedCallback() {
        listenCurrentUser(async (user) => {
            this.$userActions.setAttribute('status', user.status);
            this.$userActions.setAttribute('conversation-id', user.currentConversation);
            
            this.$sendMessageForm.setAttribute('conversation-id',user.currentConversation);
            
            if (user.currentConversation) {
                listenConversation(user.currentConversation,(conversation) => {
                //Lay messages tu conversation
                let messages = conversation.messages;
                //do du lieu messages vao message-list
                this.$messageList.setAttribute('messages', JSON.stringify('messages'));
                });  
            } else {
                this.$messageList.setAttribute('messages','[]');
            }
        });
    }
}

window.customElements.define('chat-screen', ChatScreen);