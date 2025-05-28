function checkPassword() {
    var password = document.getElementById("password").value;
    
    if (password == "Nu2024@work") {
      window.location.href = "work_regist.html";
    } else {
      alert("パスワードが間違っています。");
    }
  }