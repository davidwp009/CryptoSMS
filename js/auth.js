const API_URL = "https://cytoms.vstart.com.ua/api";
const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const login = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;
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
            localStorage.setItem("token_expire",data.expire);
            window.location.href="chats.html";

        }
        else{
            alert("Wrong login or password");
        }
    }
    catch(err){
        console.log(err);
    }

});