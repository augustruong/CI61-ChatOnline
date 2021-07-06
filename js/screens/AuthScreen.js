const $template = document.createElement('template');
$template.innerHTML = `
    <div class="auth-screen">
        <login-form></login-form>
        <register-form></register-form>
    </div> 
`;

export default class AuthScreen extends HTMLElement {
    constructor() {
        super();
        this.appendChild($template.content.cloneNode(true));
    }
}

window.customElements.define('auth-screen', AuthScreen);