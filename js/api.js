const API_URL = "https://cryptosms.wstart.com.ua/api";
const form = document.getElementById("loginForm");
form.addEventListener("submit", async function(e){
e.preventDefault();
const login = document.getElementById("login").value;
const password = document.getElementById("password").value;

try{
const response = await fetch(API_URL + "/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
login:login,
password:password
})
});

const data = await response.json();
if(data.token){
localStorage.setItem("token",data.token);
window.location.href="chats.html";
}
else{
alert("Wrong login or password");
}

}catch(error){
console.log(error);
}
});