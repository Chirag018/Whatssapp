const socket=io()
let name;

let textArea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message_area')
do{
    name=prompt('Enter your name :')

}while(!name)

textArea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter')
    sendMessage(e.target.value);
})


function sendMessage(message)
{
    let msg={
        user:name,
        message:message.trim(),
    }

    appendMessage(msg,'outgoing')
    textArea.value=''
    scrollToBottom()

    socket.emit('message',msg)
}

function appendMessage(message,type)
{
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markUp=`
    <h4>${message.user}</h1>
    <p>${message.message}</p>
    `

    mainDiv.innerHTML=markUp
    messageArea.appendChild(mainDiv);
}

socket.on('message',(msg)=>{
//    console.log(msg )
appendMessage(msg,'incoming')
scrollToBottom();
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}