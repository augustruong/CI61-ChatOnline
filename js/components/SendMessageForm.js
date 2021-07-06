import { addMessage } from "../models/conversation";

const $template = document.createElement('template');
$template.innerHTML = `
    <form class="send-message-form">
        <input type="text" class="message-content" placeholder='Enter message content'>
        <button>Send</button>
    </form>
`;

export default class SendMessageForm extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$form = this.querySelector('.send-message-form');
        this.$content = this.querySelector('.message-content');
    }

    static get observedAttributes() {
        return ['conversation-id'];
    }

    connectedCallback() {
        this.$form.onsubmit = async (event) => {
            event.preventDefault();
            let messageContent = this.$content.nodeValue.trim();
            if (messageContent == '') return;

            let conversationId = this.getAttribute('conversation-id');
            await addMessage(conversationId, messageContent);

            this.$content.value = '';
        }
    }
}

window.customElements.define('send-message-form', SendMessageForm);