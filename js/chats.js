let currentChat = null;
async function loadChats(){
    const data = await apiRequest("/chats");
    const list = document.getElementById("chatList");
    list.innerHTML="";
    data.forEach(chat=>{
        const div = document.createElement("div");
        div.className="chat-item";
        div.innerHTML = `
        <div class="chat-name">${chat.name}</div>
        <div class="chat-date">${chat.last_message_date}</div>
        `;
        div.onclick = function(){
            openChat(chat.id);
        };

        list.appendChild(div);
    });

}

function openChat(id,name){
    
currentChat = id;
document.getElementById("chatName").innerText = name;
loadMessages(id);

}

loadChats(
    div.onclick = function(){
    openChat(chat.id,chat.name);
}
);

function openAddChat(){
document.getElementById("addChatPopup").style.display="flex";

}

function closeAddChat(){
document.getElementById("addChatPopup").style.display="none";
}

async function createChat(){

const code = document.getElementById("chatUserCode").value;
const name = document.getElementById("chatNameInput").value;
const password = document.getElementById("chatPasswordInput").value;
await apiRequest("/chats","POST",{
code:code,
name:name,
password:password
});

closeAddChat();
loadChats();
}

let deleteChatId = null;
function openDeleteChat(id){
deleteChatId = id;
document.getElementById("deleteChatPopup").style.display="flex";
}

function closeDeleteChat(){
document.getElementById("deleteChatPopup").style.display="none";
}

async function confirmDeleteChat(){

await apiRequest("/chats/"+deleteChatId,"DELETE");
closeDeleteChat();
loadChats();

}