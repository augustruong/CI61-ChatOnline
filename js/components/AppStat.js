import { getAllUsers, listenAllUsers } from "../models/user.js";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="app-stat">
        <div>
            <i class="fas fa-users"></i><span class="free-user-count">100</span>
        </div>

        <div>
        <i class="fas fa-comments"></i><span class="chatting-user-count">100</span>
        </div>

        <div>
            <i class="fas fa-heart"></i><span class="flirting-user-count">100</span>
        </div>
    </div>
`;

export default class AppStat extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$freeCount = this.querySelector('.free-user-count');
        this.$flirtingCount = this.querySelector('.flirting-user-count');
        this.$chattingCount = this.querySelector('.chatting-user-count');
    }


    connectedCallback() {
        listenAllUsers((data) => {
            let freeUserCount = 0;
            let flirtingUserCount = 0;
            let chattingUserCount = 0;
    
            for(let user of data) {
                if (user.status == 'free') freeUserCount++;
                if (user.status == 'flirting') flirtingUserCount++;
                if (user.status == 'chatting') chattingUserCount++;
            }
    
            this.$freeCount.innerHTML = freeUserCount;
            this.$flirtingCount.innerHTML = flirtingUserCount;
            this.$chattingCount.innerHTML = chattingUserCount;
        });

        // realtime update: websocket, ajax polling, ajax long polling
        // onSnapshot
        
       
    }
}

window.customElements.define('app-stat', AppStat);
