const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteSpamPosts = functions.https.onRequest(async (req, res) => {
  const db = admin.firestore();
  const spamString = 'Chitanda Eru is so cute'; // ここに特定の文字列を設定します

  const snapshot = await db.collection('circles').get();

  const batch = db.batch();
  let spamCount = 0; // スパム投稿の削除数をカウントする変数
  let deleteCount = 0; // 削除した投稿の数をカウントする変数

  snapshot.docs.forEach((doc) => {
    const name = doc.data().name;
    if (name && name.startsWith(spamString) && deleteCount < 3000) {
      batch.delete(doc.ref);
      spamCount++; // スパム投稿が見つかった場合、カウントを増やす
      deleteCount++; // 削除した投稿の数を増やす
    }
  });

  await batch.commit();

  res.send(`Spam posts deleted successfully. Total spam posts removed: ${spamCount}`);
});
