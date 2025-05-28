// script.js
function checkPassword() {
    var password = document.getElementById("password").value;
    
    if (password === "Nu2024@wiki") {
      window.location.href = "touroku.html";
    } else {
      alert("パスワードが間違っています。");
    }
  }
  