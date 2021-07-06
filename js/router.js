var root = null;
var useHash = true; // Defaults to: false
var hash = '#'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router.on('/home', function() {
    document.getElementById('app').innerHTML = 'Homepage';
}).resolve();

router.on('/auth', function() {
    document.getElementById('app').innerHTML = '<auth-screen></auth-screen>';
}).resolve();

router.on('/chat', function() {
    let currentUser = firebase.auth().currentUser;
    if (currentUser == null) {
        router.navigate('/auth');
        return;
    }
    
    document.getElementById('app').innerHTML = '<chat-screen></chat-screen>';
}).resolve();

window.router = router;