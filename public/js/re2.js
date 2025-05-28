 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
   src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";
    // Firebase の設定
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
    // Firebase アプリの初期化
    firebase.initializeApp(firebaseConfig);

    function search() {
      var searchText = document.getElementById('search-text').value;
      if (!searchText) {
        alert('新歓名を入力してください。');
        return;
      }

      var db = firebase.firestore();
      var clubsPartyRef = db.collection('clubs_party');

      var searchResultsDiv = document.getElementById('search-results');
      searchResultsDiv.innerHTML = '';

      clubsPartyRef.where('eventName', '==', searchText).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          searchResultsDiv.innerHTML += "<p>新歓名: " + doc.data().eventName + ", ID: " + doc.id + "</p>";
        });
      });
    }
  