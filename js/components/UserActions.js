import { createConversation, getConversationById } from "../models/conversation.js";
import { getFlirtingUsers, updateCurrentUser, updateUser } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="user-actions">
        <div class="status-free"> 
            <button class="action-btn flirt-btn">Let's flirt</button> 
            <button class="action-btn bite-btn">Bite</button>    
        </div>

        <div class="status-flirting">
            <button class="action-btn stop-flirting-btn">Stop Flirting</button>
        </div>

        <div class="status-chatting">
            <button class="action-btn end-conversation-btn">End conversation</button>
        </div>
    </div>
`

export default class UserActions extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$statusFree = this.querySelector('.status-free');
        this.$statusFlirting = this.querySelector('.status-flirting');
        this.$statusChatting = this.querySelector('.status-chatting');

        this.$flirtBtn = this.querySelector('.flirt-btn');
        this.$biteBtn = this.querySelector('.bite-btn');
        this.$stopFlirtingBtn = this.querySelector('.stop-flirting-btn');
        this.$endConversationBtn = this.querySelector('.end-conversation-btn');
    
        this.randomUser = null;
    }

    static get observedAttributes() {
        return ['status'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'status') {
            this.$statusFree.style.display = 'none';
            this.$statusFlirting.style.display = 'none';
            this.$statusChatting.style.display = 'none';

            if (newValue == 'free') {
                this.$statusFree.style.display = 'block';
            } else if (newValue == 'flirting') {
                this.$statusFlirting.style.display = 'block';
            } else if (newValue == 'chatting') {
                this.$statusChatting.style.display = 'block';
            } 
        }
    }
    
    connectedCallback() {
        this.$flirtBtn.addEventListener('click',() => {
            updateCurrentUser({status: 'flirting'});
        });

        this.$biteBtn.addEventListener('click', async () => {
            // lay toan bo flirting users
            let flirtingUsers = await getFlirtingUsers();

            if (flirtingUsers.length == 0) {
                alert("No flirting users");
                return;
            }

            //chon ngau nhien
            let randomIndex = Math.floor(Math.random() * flirtingUsers.length())
            let randomUser = flirtingUsers[randomIndex];

            // this.saveRandomUser(randomUser.id)

            let currentUser = firebase.auth().currentUser;
            //ghep doi

            //tao 1 conversation
            let newConversation = await createConversation([currentUser.uid, randomUser.id]);
            
            updateCurrentUser({ status: 'chatting', currentConversation: newConversation.id})
            updateUser(randomUser.id, {status: 'chatting', currentConversation: newConversation.id});
        });

        this.$stopFlirtingBtn.addEventListener('click',() => {
            updateCurrentUser({status: 'free'});
        });

        this.$endConversationBtn.addEventListener('click', async () => {
            // lấy ra id của conversation
            let conversationId = this.getAttribute('conversation-id');
            // lấy được conversation hiện tại từ firestore
            let currentConversation = await getConversationById(conversationId);
            // lấy được những người dùng tham gia
            let memberIds = currentConversation.users;
            // cập nhật trạng thái của người dùng tham gia
            for(let memberId of memberIds) {
                updateUser(memberId, {status: 'free', currentConversation: ''});
            }
        });
    }

    // saveRandomUser(userId) {
    //     localStorage.setItem('random-user-id',userId);
    // }

    // getRandomUser() {
    //     return localStorage.getItem('random-user-id');
    // }
}

window.customElements.define('user-actions', UserActions);