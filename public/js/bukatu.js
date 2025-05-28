 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";

const firebaseConfig = {
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
const db = firebase.firestore();

// Firestoreからデータを取得し、カレンダーに表示
db.collection('clubs_party').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const today = new Date();
        const eventDate = new Date(data.date);
        if (eventDate >= today) {
            // カレンダーにデータを追加するコードをここに追加
            const calendarDiv = document.getElementById('calendar');
            const eventDiv = document.createElement('div');
            eventDiv.textContent = data.eventName;
            eventDiv.dataset.date = data.date;
            calendarDiv.appendChild(eventDiv);
        }
    });
});

// 日付をクリックしたときのイベントハンドラ
document.getElementById('calendar').addEventListener('click', function(event) {
    const date = event.target.dataset.date;
    if (!date) return;

    // 選択した日付の新歓の詳細を表示
    db.collection('clubs_party').where('date', '==', date).get().then((querySnapshot) => {
        const detailsDiv = document.getElementById('details');
        detailsDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // 新歓の詳細を表示するコードをここに追加
            const detailDiv = document.createElement('div');
            detailDiv.textContent = data.description;
            detailsDiv.appendChild(detailDiv);
        });
    });
});

// 絞り込み機能
document.getElementById('filter').addEventListener('change', function(event) {
    const filterType = event.target.dataset.filterType;
    const filterValue = event.target.value;

    // 絞り込み条件に一致する新歓を表示
    db.collection('clubs_party').where(filterType, '==', filterValue).get().then((querySnapshot) => {
        const calendarDiv = document.getElementById('calendar');
        calendarDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // カレンダーにデータを追加するコードをここに追加
            const eventDiv = document.createElement('div');
            eventDiv.textContent = data.eventName;
            eventDiv.dataset.date = data.date;
            calendarDiv.appendChild(eventDiv);
        });
    });
});