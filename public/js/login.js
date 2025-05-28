src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js";
   src="https://www.gstatic.com/firebasejs/8.0.2/firebase-auth.js";
  src="https://www.gstatic.com/firebasejs/8.0.2/firebase-database.js";
  src="https://www.gstatic.com/firebasejs/ui/3.5.2/firebase-ui-auth__ja.js"

  var firebaseConfig = {
    apiKey: "AIzaSyD3ogaiRPtv870uTBDjI3S42LKTC1hlLrM",
    authDomain: "nuwiki2024.firebaseapp.com",
    databaseURL: "https://nuwiki2024-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nuwiki2024",
    storageBucket: "nuwiki2024.appspot.com",
    messagingSenderId: "117360974314",
    appId: "1:117360974314:web:61f450a0ae18d958627a93",
    measurementId: "G-PWX9FWE8T3"
  };
  firebase.initializeApp(firebaseConfig);

  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // ログイン成功時の処理を書きます
        document.getElementById('firebaseui-auth-container').innerHTML = 'ログイン完了です。画面が切り替わるまで少々お待ちください';
        setTimeout(function() {
          window.location.assign("user.html");
        }, 3000); // 3秒待ってからリダイレクトする
        return false;
      },
      uiShown: function() {
        // UIが表示された時の処理を書きますa
      }
    },
    signInSuccessUrl: 'user.html',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE, // 既存のアカウントでのログイン時に新規登録画面を表示しないようにする
    signInFlow: 'popup' // ポップアップモードに変更する
  };
  ui.start('#firebaseui-auth-container', uiConfig);