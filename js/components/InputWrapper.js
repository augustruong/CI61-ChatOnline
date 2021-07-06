const $template = document.createElement('template');
$template.innerHTML = `
    <div class="input-wrapper">
        <input type="text" class="input-main" placeholder="Enter content">
        <div class="input-error"></div>
    </div>
`;

export default class InputWrapper extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));

        this.$main = this.querySelector('.input-main');
        this.$error = this.querySelector('.input-error');
    }

    static get observedAttributes() {
        return ['placeholder','type','error'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName == 'placeholder') {
            this.$main.placeholder = newValue;
        } else if (attrName == 'type') {
            this.$main.type = newValue;
        } else if (attrName == 'error') {
            this.$error.innerHTML = newValue;
        }
    }

    get value() {
        return this.$main.value;
    }

    /* Kiem tra tinh hop le voi condition, neu k thoa man thi in ra message
     *@param {Function} condition
     *@param {String} message
     *@return {Boolean}
    */

    validate(condition, message) {
        if (condition(this.value)) {
            this.setAttribute('error','');
            return true;
        }

        this.setAttribute('error', message);
        return false;
    }
}

window.customElements.define('input-wrapper', InputWrapper);