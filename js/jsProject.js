var loginForm = document.getElementById("loginForm");
var loginButton = document.getElementById("logInButton");
var logInErrMsg = document.getElementById("loginErrMsg");


function verify(e){
    e.preventDefault();

    var username = document.getElementById("username").value;//loginForm.username.value;
    var password = document.getElementById("password").value;//loginForm.password.value;

    if(username === "user" && password === "pass") {
        alert("You have successfully logged in.")
        window.location.href = "toDoList.html";
    }
    else{
        alert("You entereted incorrect username or password")
    }


}

loginButton.addEventListener("click", function(e) { //for any click document 
    verify(e)}, false);