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

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

document.getElementById('user').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var role = document.getElementById("role").value;
    var grade = document.getElementById("grade").value;
    var department = document.getElementById("department").value;
    var clubs = document.getElementById("clubs").value;
    var user = firebase.auth().currentUser;

    var docId = user.uid;

    if (username && role && grade && department && clubs) {
        var info = Array.from({ length: 30 }, () => "");

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
        alert("すべてのフィールドを入力してください。");
    }

    document.getElementById('user').reset();
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userId = user.uid;
        var username = document.getElementById("username").value;
        var role = document.getElementById("role").value;
        var grade = document.getElementById("grade").value;
        var department = document.getElementById("department").value;
        var clubs = document.getElementById("clubs").value;

        if (username && role && grade && department && clubs) {
            var info = Array.from({ length: 30 }, () => "");

            db.collection("user").doc(userId).set({
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
            alert("すべてのフィールドを入力してください。");
        }

        document.getElementById('user').reset();
    } else {
        alert("ログインしていません。");
    }
});
