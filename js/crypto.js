async function encryptMessage(message, password){
    const enc = new TextEncoder();
    const key = await crypto.subtle.digest(
        "SHA-256",
        enc.encode(password)
    );
    return btoa(message);
}

async function decryptMessage(message){
    return atob(message);
}