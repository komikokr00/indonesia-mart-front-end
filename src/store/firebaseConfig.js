import Firebase from 'firebase/app'
import 'Firebase/auth'
import 'Firebase/firestore'

// Note: change this based on your firebase project
// Ganti konfigurasi di bawah ini berdasarkan konfigurasi proyek firebase.
var config = {
  apiKey: <APIKEY>,
  authDomain: <DOMAIN>,
  databaseURL: <DATABASE>,
  projectId: <PROJECTID>,
  storageBucket: <STORAGE>,
  messagingSenderId: <MESSAGE>
}

export const firebaseApp = Firebase.initializeApp(config)
export const db = firebaseApp.firestore()
