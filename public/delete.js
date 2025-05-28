const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.deleteSpamPosts = functions.https.onRequest(async (req, res) => {
  const db = admin.firestore();
  const spamString = 'chitanda eru is cute'; // ここに特定の文字列を設定します

  const snapshot = await db.collection('circles').get();

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    const name = doc.data().name;
    if (name && name.startsWith(spamString)) {
      batch.delete(doc.ref);
    }
  });

  await batch.commit();

  res.send('Spam posts deleted successfully.');
});
