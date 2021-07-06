import { listenCurrentUser } from "../models/user";

const $template = document.createElement('template');
$template.innerHTML = `
    <div class="message-list">
        <message-container content="Ăn cơm chưa" owned="true"></message-container>
        <message-container content="Rồi" owned="false"></message-container>
        <message-container content="Ăn cơm với gì" owned="true"></message-container>
        <message-container content="Ăn cơm với rau muống :D" owned="false"></message-container>
    </div>
`;

export default class MessageList extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$list = this.querySelector('.message-list');
    }

    static get observedAttributes() {
        return ['messages']; // json
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        let currentUser = firebase.auth().currentUser;
        
        if(attrName == 'messages') {
            let data = JSON.parse(newValue);
            //console.log(data);
            this.$list.innerHTML = '';
            for (let message of data) {
                let $messageContainer = new MessageContainer();
                $messageContainer.setAttribute('content',message.content);
                $messageContainer.setAttribute('owned',message.userId == currentUser.uid);

                this.$list.appendChild($messageContainer);
            }
        }
    }
}

window.customElements.define('message-list', MessageList);