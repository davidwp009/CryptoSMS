const API_URL = "https://cytoms.vstart.com.ua/api";

function getToken(){
    return localStorage.getItem("token");
}

async function apiRequest(url,method="GET",body=null){
    const options = {
        method:method,
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+getToken()
        }
    };

    if(body){
        options.body = JSON.stringify(body);
    }

    const response = await fetch(API_URL + url,options);
    return await response.json();
}