src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js";
 src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js";

 var firebaseConfig = {
    apiKey: "AIzaSyD3ogaiRPtv870uTBDjI3S42LKTC1hlLrM",
    authDomain: "Pnuwiki2024.firebaseapp.com",
    databaseURL: "https://nuwiki2024.firebaseio.com",
    projectId: "nuwiki2024",
    storageBucket: "nuwiki2024.appspot.com",
    messagingSenderId: "117360974314",
    appId: "1:117360974314:web:b42c367177476d0b627a93",
    measurementId: "G-7M672MYCDY"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

function search() {
    var nameSearch = document.getElementById('nameSearch').value.toLowerCase();
    var frequencySearch = document.getElementById('frequencySearch').value;
    var annualFeeSearch = document.getElementById('annualFeeSearch').value;
    var tag1Search = document.getElementById('tag1').checked;
    var tag2Search = document.getElementById('tag2').checked;
    var tag3Search = document.getElementById('tag3').checked;
    var tag4Search = document.getElementById('tag4').checked;
    var tag5Search = document.getElementById('tag5').checked;
    var tag6Search = document.getElementById('tag6').checked;
    var tag7Search = document.getElementById('tag7').checked;
    var tag8Search = document.getElementById('tag8').checked;
    var tag9Search = document.getElementById('tag9').checked;

    db.collection("circles").get().then((querySnapshot) => {
        var clubListDiv = document.getElementById('club-list');
        clubListDiv.innerHTML = '';
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            var name = data.name.toLowerCase();
            var frequency = data.frequency;
            var annualFee = data.annualFee;
            var tag1 = data.tag1;
            var tag2 = data.tag2;
            var tag3 = data.tag3;
            var tag4 = data.tag4;
            var tag5 = data.tag5;
            var tag6 = data.tag6;
            var tag7 = data.tag7;
            var tag8 = data.tag8;
            var tag9 = data.tag9;

            if ((nameSearch && !name.includes(nameSearch)) ||
                (frequencySearch && frequency <frequencySearch) ||
                (annualFeeSearch && annualFee > annualFeeSearch) ||
                (tag1Search && !tag1) ||
                (tag2Search && !tag2) ||
                (tag3Search && !tag3) ||
                (tag4Search && !tag4) ||
                (tag5Search && !tag5) ||
                (tag6Search && !tag6) ||
                (tag7Search && !tag7) ||
                (tag8Search && !tag8) ||
                (tag9Search && !tag9)) {
                return;
            }

            var appeal = data.appeal;
            var clubDiv = document.createElement('div');
            clubDiv.className = 'club-box';
            var clubLink = document.createElement('a');
            clubLink.textContent = name;
            clubLink.href = 'club_detail.html?clubId=' + doc.id;
            clubDiv.appendChild(clubLink);
            clubDiv.appendChild(document.createTextNode(' - ' + appeal));
            clubListDiv.appendChild(clubDiv);
        });
    });
}

function resetSearch() {
    document.getElementById('nameSearch').value = '';
    document.getElementById('frequencySearch').value = '';
    document.getElementById('annualFeeSearch').value = '';
    document.getElementById('tag1').checked = false;
    document.getElementById('tag2').checked = false;
    document.getElementById('tag3').checked = false;
    document.getElementById('tag4').checked = false;
    document.getElementById('tag5').checked = false;
    document.getElementById('tag6').checked = false;
    document.getElementById('tag7').checked = false;
    document.getElementById('tag8').checked = false;
    document.getElementById('tag9').checked = false;
    search();
}

window.onload = search;