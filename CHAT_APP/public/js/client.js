const socket = io();

const chatbox = document.getElementById('chat-box');
const inputmessage = document.getElementById('inputmessgae');
const chatbtn = document.getElementById('chatbtn')

chatbtn.click = () =>{
    const message = inputmessage.value.trim();
}