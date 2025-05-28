src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";
 src="https://www.gstatic.com/firebasejs/8.0.2/firebase-auth.js";

  // Firebaseの設定と初期化
  var firebaseConfig = {
    apiKey: "AIzaSyD3ogaiRPtv870uTBDjI3S42LKTC1hlLrM",
    authDomain: "Pnuwiki2024.firebaseapp.com",
    databaseURL: "https://nuwiki2024.firebaseio.com",
    projectId: "nuwiki2024",
    storageBucket: "nuwiki2024.appspot.com",
    messagingSenderId: "117360974314",
    appId: "1:117360974314:web:b42c367177476d0b627a93",
    measurementId: "G-7M672MYCDY",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  document.getElementById('user').addEventListener('submit', function(event) {
    event.preventDefault(); // デフォルトの動作をキャンセル

    var username = document.getElementById("username").value;
    var role = document.getElementById("role").value;
    var grade = document.getElementById("grade").value;
    var department = document.getElementById("department").value;
    var clubs = document.getElementById("clubs").value;
    var passkey = document.getElementById("passkey").value;
    var user = firebase.auth().currentUser;

    if (user) {
      // ユーザーがログインしている場合
      var docId = user.uid; // ユーザーのUIDを取得

      if (username && role && grade && department && clubs) {
        if ((role === "管理者" && passkey === "2024wikicode") || (role !== "管理者" && passkey === "Nu2024@wiki")) {
          var info = Array.from({ length: 30 }, () => ""); // 30個の空の文字列を持つ配列を生成

          db.collection("user").doc(docId).set({
            name: username,
            role: role,
            grade: grade,
            department: department,
            clubs: clubs,
            info: info 
          })
          .then(function() {
            console.log("Document successfully written!");
            alert("ご協力ありがとうございます。画面変わるまでOKを押してお待ちください。");
            setTimeout(function() {
              window.location.href = "index.html";
            }, 3000);
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
            alert("データの送信に失敗しました：" + error);
          });
        } else {
          alert("パスキーが間違っています。");
        }
      } else {
        alert("すべてのフィールドを入力してください。");
      }

      document.getElementById('user').reset();
    } else {
      // ユーザーがログインしていない場合
      alert("ログインしていません。");
    }
  });
