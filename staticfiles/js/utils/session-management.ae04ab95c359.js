
function manageSession(username){
    const sessionUser = getSession();
    if(!sessionUser){
        sessionStorage.setItem('username', username);
    }
}

function getSession(){
    const session = sessionStorage.getItem('username');
    if(!session){
        window.location.href = '';
    }
    return session;
}