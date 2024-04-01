const socket = io()
let user1;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
    user1 = prompt('Please enter your name: ')
} while(!user1)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: user1,
        message: message.trim()
    }

    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    
    // Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup

    messageArea.appendChild(mainDiv)
}

//receive

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}