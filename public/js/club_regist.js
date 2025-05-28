 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";
src="https://www.gstatic.com/firebasejs/8.2.1/firebase-storage.js";


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
// 写真のURLとpartyを含むデータを作成

document.getElementById('addSchedule').addEventListener('click', function() {
const div = document.createElement('div');
div.className = 'schedule';
div.innerHTML = `
    <div class="schedule">
        <div class="box">
            <label><span>月</span>
                <input type="number" class="month" min="1" max="12" required pattern="\d*">
            </label>
        </div>
        <div class="box">
            <label><span>イベント名</span>
                <input type="text" class="eventName">
            </label>
        </div>
        <div class="box">
            <label><span>期間</span>
                <input type="text" class="period">
            </label>
        </div>
        <div class="box">
            <label><span>内容</span>
                <textarea class="content"></textarea>
            </label>
        </div>
        <div class="box">
            <label><span>費用</span>
                <input type="number" class="cost" pattern="\d*">
            </label>
        </div>
    </div>
`;
document.getElementById('schedules').appendChild(div);
});

document.getElementById('addItem').addEventListener('click', function() {
const div = document.createElement('div');
div.className = 'item';
div.innerHTML = `
    <div class="item">
        <div class="box">
            <label>物品: 
                <input type="text" class="itemName">
            </label>
        </div>
        <div class="box">
            <label>値段:
                <input type="number" class="price" pattern="\d*">
            </label>
        </div>
    </div>
`;
document.getElementById('items').appendChild(div);
});


document.querySelector('.send').addEventListener('click', function(event) {
event.preventDefault();

// 写真のinput要素を取得
const photo1 = document.getElementById('photo1').files[0];
const photo2 = document.getElementById('photo2').files[0];

const voice1 = document.getElementById('voice1').value;
const voice2 = document.getElementById('voice2').value;

// 週間スケジュールを取得
const mondayActive = document.getElementById('mondayActive').checked;
const mondayContent = document.getElementById('mondayContent').value;
const mondayStart = document.getElementById('mondayStart').value;
const mondayEnd = document.getElementById('mondayEnd').value;
const tuesdayActive = document.getElementById('tuesdayActive').checked;
const tuesdayContent = document.getElementById('tuesdayContent').value;
const tuesdayStart = document.getElementById('tuesdayStart').value; // 追加
const tuesdayEnd = document.getElementById('tuesdayEnd').value; // 追加
const wednesdayActive = document.getElementById('wednesdayActive').checked;
const wednesdayContent = document.getElementById('wednesdayContent').value;
const wednesdayStart = document.getElementById('wednesdayStart').value; // 追加
const wednesdayEnd = document.getElementById('wednesdayEnd').value; // 追加
const thursdayActive = document.getElementById('thursdayActive').checked;
const thursdayContent = document.getElementById('thursdayContent').value;
const thursdayStart = document.getElementById('thursdayStart').value; // 追加
const thursdayEnd = document.getElementById('thursdayEnd').value; // 追加
const fridayActive = document.getElementById('fridayActive').checked;
const fridayContent = document.getElementById('fridayContent').value;
const fridayStart = document.getElementById('fridayStart').value; // 追加
const fridayEnd = document.getElementById('fridayEnd').value; // 追加
const saturdayActive = document.getElementById('saturdayActive').checked;
const saturdayContent = document.getElementById('saturdayContent').value;
const saturdayStart = document.getElementById('saturdayStart').value; // 追加
const saturdayEnd = document.getElementById('saturdayEnd').value; // 追加
const sundayActive = document.getElementById('sundayActive').checked;
const sundayContent = document.getElementById('sundayContent').value;
const sundayStart = document.getElementById('sundayStart').value;
const sundayEnd = document.getElementById('sundayEnd').value;
const schedules = Array.from(document.querySelectorAll('.schedule')).map(schedule => ({
    month: schedule.querySelector('.month').value,
    eventName: schedule.querySelector('.eventName').value,
    period: schedule.querySelector('.period').value,
    content: schedule.querySelector('.content').value,
    cost: schedule.querySelector('.cost').value
}));

// 新たに追加されたアイテムのデータを取得
const items = Array.from(document.querySelectorAll('.item')).map(item => ({
    itemName: item.querySelector('.itemName').value,
    price: item.querySelector('.price').value
}));

// 写真をFirebase Storageにアップロードする関数
// 写真をFirebase Storageにアップロードする関数
const uploadPhoto = async (photo, name) => {
if (!photo) return null;
const storageRef = firebase.storage().ref();

// 現在の日時を取得
const now = new Date();
const timestamp = now.getFullYear() + '_' + (now.getMonth() + 1) + '_' + now.getDate() + '_' + now.getHours() + '_' + now.getMinutes() + '_' + now.getSeconds();

// ファイル名に日時を追加
const uniqueName = name + '_' + timestamp;

const photoRef = storageRef.child('photos/' + uniqueName);
try {
    await photoRef.put(photo);
    return await photoRef.getDownloadURL();
} catch (error) {
    throw new Error('写真のアップロードに失敗しました: ' + error.message);
}
};

// 30個の空の要素を持つarray型のpartyを作成する関数
const createPartyArray = () => {
    return new Array(30).fill('');
};

// 写真をアップロード
Promise.all([
    uploadPhoto(photo1, 'photo1'),
    uploadPhoto(photo2, 'photo2')
]).then(([photo1Url, photo2Url]) => {
    // 写真のURLとpartyを含むデータを作成
    const contactTwitter = document.getElementById('contactTwitter').value;
    const contactInstagram = document.getElementById('contactInstagram').value;
    const contactDiscord = document.getElementById('contactDiscord').value;
    const contactweb = document.getElementById('contactweb').value;
    const data = {
        name: document.getElementById('name').value,
    frequency: document.getElementById('frequency').value,
    annualFee: document.getElementById('annualFee').value,
    eventFee: document.getElementById('eventFee').value,
    members: document.getElementById('members').value,
    appeal: document.getElementById('appeal').value,
    caution: document.getElementById('caution').value,
    tag1: document.getElementById('tag1').checked,
    tag2: document.getElementById('tag2').checked,
    tag3: document.getElementById('tag3').checked,
    tag4: document.getElementById('tag4').checked,
    tag5: document.getElementById('tag5').checked,
    tag6: document.getElementById('tag6').checked,
    tag7: document.getElementById('tag7').checked,
    tag8: document.getElementById('tag8').checked,
    tag9: document.getElementById('tag9').checked,
    schedules: schedules,
    items: items,
    weeklySchedule: {
        monday: { active: mondayActive, content: mondayContent, start: mondayStart, end: mondayEnd },
        tuesday: { active: tuesdayActive, content: tuesdayContent, start: tuesdayStart, end: tuesdayEnd },
        wednesday: { active: wednesdayActive, content: wednesdayContent, start: wednesdayStart, end: wednesdayEnd },
        thursday: { active: thursdayActive, content: thursdayContent, start: thursdayStart, end: thursdayEnd },
        friday: { active: fridayActive, content: fridayContent, start: fridayStart, end: fridayEnd },
        saturday: { active: saturdayActive, content: saturdayContent, start: saturdayStart, end: saturdayEnd },
        sunday: { active: sundayActive, content: sundayContent, start: sundayStart, end: sundayEnd }
    },
    membersVoice: [voice1, voice2],
    participation: document.getElementById('participation').value,
    contact: { twitter: contactTwitter, instagram: contactInstagram, discord: contactDiscord, web: contactweb },
    photo1: photo1Url,
    photo2: photo2Url
    };
   
    // Firestoreにデータを保存
    db.collection('circles').add(data)
        .then(() => {
            alert('サークル情報が正常に保存されました！');
            location.reload(); //保存後にページをリロードしてフォームをクリアする
        })
        .catch(error => {
            alert('サークル情報の保存中にエラーが発生しました：' + error.message);
        });
}).catch(error => {
    alert('写真のアップロード中にエラーが発生しました：' + error.message);
});
});
