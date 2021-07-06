import { getDataFromDoc } from "../utils.js";

export async function createConversation(users) {
    let response = await firebase.firestore().collection('conversations').add({
        users: users,
        messages: []
    });
    return response;
}

export async function getConversationById(id) {
    let response = await firebase.firestore().collection('conversations').doc(id).get();
    return getDataFromDoc(response);
}

export function listenConversation(id,callback) {
    firebase.firestore().collection('conversations').doc(id).onSnapshot((response) => {
        callbakck(getDataFromfDoc(response));
    })
}

export async function addMessage(id, messageContent) {
    let currentUser = firebase.auth().currentUser;
    let message = {
        content: messageContent,
        userId: currentUser.uid,
        dateModified: new Date().toISOString()
    }
    await firebase.firestore().collection('conversations').doc(id).update({
        messages: firebase.firestore.FieldValue.arrayUnion(message)
    });
}