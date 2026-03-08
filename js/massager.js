let currentChat = null;
const password = "chatpassword";

/* ОТРИМАННЯ ПОВІДОМЛЕНЬ */

async function loadMessages(chatId, page = 1){

    currentChat = chatId;
    const data = await apiRequest("/messages?chat=" + chatId + "&page=" + page);
    const box = document.getElementById("messages");
    box.innerHTML = "";

    for(const msg of data.messages){
        const div = document.createElement("div");
        div.className = "message";
        if(msg.sender === "me"){
            div.classList.add("my");
        }

        let text = msg.text;

        try{
            const encrypted = JSON.parse(msg.text);
            text = await decryptMessage(
                encrypted.data,
                encrypted.iv,
                password
            );
        }catch(e){
            text = msg.text;
        }
        div.innerHTML = `
        <div class="text">${text}</div>
        <div class="date">${msg.date}</div>
        `;
        box.appendChild(div);
    }
    box.scrollTop = box.scrollHeight;
}


/* ВІДПРАВКА ПОВІДОМЛЕННЯ */

async function sendMessage(){
    const input = document.getElementById("messageInput");
    const text = input.value.trim();

    if(!text || !currentChat) return;
    const encrypted = await encryptMessage(text, password);
    await apiRequest("/messages", "POST", {
        chat_id: currentChat,
        text: JSON.stringify(encrypted)
    });

    input.value = "";
    loadMessages(currentChat);
}

/* ENTER для відправки */

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("messageInput");

    if(input){
        input.addEventListener("keypress", function(e){
            if(e.key === "Enter"){
                e.preventDefault();
                sendMessage();
            }
        });
    }
});


// async function loadMessages(chatId,page=1){
//     const data = await apiRequest("/messages?chat="+chatId+"&page="+page);
//     const box = document.getElementById("messages");
//     box.innerHTML="";
//     data.messages.forEach(msg=>{
//         const div = document.createElement("div");
//         div.className="message";
//         div.innerHTML = `
//         <div class="text">${msg.text}</div>
//         <div class="date">${msg.date}</div>
//         `;
//         box.appendChild(div);
//     });

// }

// async function sendMessage(){
//     const input = document.getElementById("messageInput");
//     const text = input.value;
//     if(!text) return;
//     const password = "chatpassword";
//     const encrypted = await encryptMessage(text,password);
//     await apiRequest("/messages","POST",{
//         chat_id:currentChat,
//         text:JSON.stringify(encrypted)

//     });

//     input.value="";
//     loadMessages(currentChat);

// }