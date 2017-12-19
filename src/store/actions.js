import { db, firebaseApp } from './firebaseConfig'

let actions = {
  getDbUser ({commit}, payload) {
    db.collection('users').where('email', '==', payload).onSnapshot(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        commit('setCurrentUser', documentSnapshot.data())
      })
      commit('setLoading', false)
    }, err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  },
  signInUser ({commit, dispatch}, payload) {
    commit('setLoading', true)
    firebaseApp.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then((user) => {
      dispatch('getDbUser', user.email)
      commit('setIdToken', user.getIdToken())
      commit('setLoading', false)
    })
    .catch(error => {
      commit('setError', error)
      commit('setLoading', false)
    })
  },
  getDbKategoris ({commit, getters}) {
    if (getters.kategoris === null || getters.kategoris === undefined) {
      commit('setLoading', true)
      db.collection('kategoris').orderBy('index', 'asc').onSnapshot(querySnapshot => {
        commit('setKategoris', [])
        querySnapshot.forEach(documentSnapshot => {
          var val = documentSnapshot.data()
          val.id = documentSnapshot.id
          commit('pushKategoris', val)
        })
        commit('setLoading', false)
      }, err => {
        console.log(`Encountered error: ${err}`)
        commit('setLoading', false)
      })
    }
  },
  deleteDbKategori ({commit}, payload) {
    commit('setLoading', true)
    db.collection('kategoris').doc(payload.id).delete().then(function () {
      commit('setLoading', false)
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      console.error('Error removing document: ', error)
      commit('setLoading', false)
    })
  },
  tambahDbKategori ({commit}, payload) {
    commit('setLoading', true)
    payload.index = Number(payload.index)
    db.collection('kategoris').add(payload)
    .then(function (docRef) {
      commit('setLoading', false)
      // console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
      commit('setLoading', false)
    })
  },
  setDbKategoris ({commit}, payload) {
    commit('setLoading', true)
    payload.map((itm) => {
      commit('setLoading', true)
      db.collection('kategoris').doc(itm.id).update({
        nama: itm.nama, icon: itm.icon, index: Number(itm.index)
      })
      .then(function () {
        commit('setLoading', false)
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
        commit('setLoading', false)
      })
    })
  },
  getDbBarangsFavorit ({commit, getters}, payload) {
    commit('setLoading', true)
    var dbref = db.collection('barangs').orderBy('likes', 'desc')
    if (getters.barangsFavorit === null || getters.barangsFavorit === undefined) {
      commit('setBarangsFavorit', [])
    }
    if (payload.limit !== null && payload.limit !== undefined && payload.limit !== 0) {
      dbref = dbref.limit(payload.limit)
    }
    var snapshot = null
    if (getters.kategorisSnapshots !== null && getters.kategorisSnapshots !== undefined) {
      snapshot = getters.getKategorisSnapshotsId
    } else {
      commit('setKategorisSnapshots', [])
    }
    if (snapshot !== null && snapshot !== undefined) {
      dbref = dbref.startAfter(snapshot.snapshot.docs[snapshot.snapshot.docs.length - 1])
      if (!payload.continue) return
      if (snapshot.stop) {
        return
      }
    } else {
      snapshot = {}
      snapshot.snapshot = null
    }
    commit('setLoading', true)
    dbref.onSnapshot(querySnapshot => {
      commit('setLoading', true)
      commit('pushKategorisSnapshots', {id: getters.kategori.id, snapshot: querySnapshot, stop: false})
      querySnapshot.forEach(documentSnapshot => {
        var val = documentSnapshot.data()
        val.id = documentSnapshot.id
        commit('pushBarangsFavorit', val)
      })
      if (querySnapshot.size < 1) {
        commit('pushKategorisSnapshots', {id: getters.kategori.id, snapshot: snapshot.snapshot, stop: true})
        commit('setLoading', false)
      }
      commit('setLoading', false)
    }, err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  },
  getDbBarangs ({commit, getters}, payload) {
    commit('setLoading', true)
    var dbref = db.collection('barangs').orderBy('likes', 'desc')
    if (getters.barangs === null || getters.barangs === undefined) {
      commit('setBarangs', [])
      if (getters.barangs.length === 0) commit('setBarangsLastSnapshot', null)
    }
    if (getters.barangsLastSnapshot !== null && getters.barangsLastSnapshot !== undefined) {
      dbref = dbref.startAfter(getters.barangsLastSnapshot)
      if (!payload.continue) return
    }
    if (payload.limit !== null && payload.limit !== undefined && payload.limit !== 0) {
      dbref = dbref.limit(payload.limit)
    }
    dbref.onSnapshot(querySnapshot => {
      commit('setLoading', true)
      querySnapshot.forEach(documentSnapshot => {
        var val = documentSnapshot.data()
        val.id = documentSnapshot.id
        commit('pushBarangs', val)
        commit('setBarangsLastSnapshot', documentSnapshot)
      })
      commit('setLoading', false)
    }, err => {
      commit('setLoading', false)
      console.log(`Encountered error: ${err}`)
    })
  },
  getDbBarangsKategoris ({commit, getters}, payload) {
    if (getters.kategori.id !== null && getters.kategori.id !== undefined) {
      var dbref = null
      if (getters.isAdmin) {
        dbref = db.collection('barangs').where('kategori', '==', getters.kategori.id)
      } else {
        dbref = db.collection('barangs').where('kategori', '==', getters.kategori.id).orderBy('jenis', 'asc')
        if (payload.limit !== null && payload.limit !== undefined && payload.limit !== 0) {
          dbref = dbref.limit(payload.limit)
        }
      }
      var snapshot = null
      if (getters.kategorisSnapshots !== null && getters.kategorisSnapshots !== undefined) {
        snapshot = getters.getKategorisSnapshotsId
      } else {
        commit('setKategorisSnapshots', [])
      }
      if (snapshot !== null && snapshot !== undefined) {
        dbref = dbref.startAfter(snapshot.snapshot.docs[snapshot.snapshot.docs.length - 1])
        if (!payload.continue) return
        if (snapshot.stop) {
          return
        }
      } else {
        snapshot = {}
        snapshot.snapshot = null
      }
      commit('setLoading', true)
      dbref.onSnapshot(querySnapshot => {
        commit('setLoading', true)
        commit('pushKategorisSnapshots', {id: getters.kategori.id, snapshot: querySnapshot, stop: false})
        querySnapshot.forEach(documentSnapshot => {
          var val = documentSnapshot.data()
          val.id = documentSnapshot.id
          commit('pushBarangs', val)
        })
        if (querySnapshot.size < 1) {
          commit('pushKategorisSnapshots', {id: getters.kategori.id, snapshot: snapshot.snapshot, stop: true})
          commit('setLoading', false)
        }
        commit('setLoading', false)
      }, err => {
        console.log(`Encountered error: ${err}`)
        commit('setLoading', false)
      })
    }
  },
  tambahDbBarang ({commit}, payload) {
    commit('setLoading', true)
    payload.likes = Number(payload.likes)
    payload.harga = Number(payload.harga)
    db.collection('barangs').add(payload)
    .then(function (docRef) {
      commit('setLoading', false)
      // console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      commit('setLoading', false)
      console.error('Error adding document: ', error)
    })
  },
  deleteDbBarang ({commit}, payload) {
    commit('setLoading', true)
    db.collection('barangs').doc(payload.id).delete().then(function () {
      commit('setLoading', false)
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      console.error('Error removing document: ', error)
      commit('setLoading', false)
    })
  },
  setDbBarang ({commit}, payload) {
    commit('setLoading', true)
    var itm = {...payload}
    delete itm.id
    itm.likes = Number(payload.likes)
    itm.harga = Number(payload.harga)
    db.collection('barangs').doc(payload.id).update(itm)
    .then(function () {
      commit('setLoading', false)
      console.log('Document successfully updated!')
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      commit('setLoading', false)
      console.error('Error updating document: ', error)
    })
  },
  setDbBarangs ({commit}, payload) {
    commit('setLoading', true)
    payload.map((itm) => {
      commit('setLoading', true)
      db.collection('barangs').doc(itm.id).update({
        detil: itm.detil, harga: Number(itm.harga), img: itm.img, kategori: itm.kategori, likes: Number(itm.likes), nama: itm.nama
      })
      .then(function () {
        commit('setLoading', false)
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        commit('setLoading', false)
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
    })
  },
  getDbKemasans ({commit, getters}) {
    if (getters.kemasans === null || getters.kemasans === undefined) {
      commit('setLoading', true)
      db.collection('kemasans').orderBy('index', 'asc').onSnapshot(querySnapshot => {
        commit('setLoading', true)
        commit('setKemasans', [])
        querySnapshot.forEach(documentSnapshot => {
          var val = documentSnapshot.data()
          val.id = documentSnapshot.id
          commit('pushKemasans', val)
        })
        commit('setLoading', false)
      }, err => {
        commit('setLoading', false)
        console.log(`Encountered error: ${err}`)
      })
    }
  },
  deleteDbKemasan ({commit}, payload) {
    commit('setLoading', true)
    db.collection('kemasans').doc(payload.id).delete().then(function () {
      commit('setLoading', false)
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      commit('setLoading', false)
      console.error('Error removing document: ', error)
    })
  },
  tambahDbKemasan ({commit}, payload) {
    commit('setLoading', true)
    payload.index = Number(payload.index)
    payload.harga = Number(payload.harga)
    db.collection('kemasans').add(payload)
    .then(function (docRef) {
      commit('setLoading', false)
      // console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      commit('setLoading', false)
      console.error('Error adding document: ', error)
    })
  },
  setDbKemasan ({commit}, payload) {
    commit('setLoading', true)
    payload.map((itm) => {
      commit('setLoading', true)
      db.collection('kemasans').doc(itm.id).update({
        nama: itm.nama, detil: itm.detil, index: Number(itm.index), harga: Number(itm.harga)
      })
      .then(function () {
        commit('setLoading', false)
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        commit('setLoading', false)
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
    })
  },
  updateDbLikes ({commit}, payload) {
    commit('setLoading', true)
    payload.map((itm) => {
      commit('setLoading', true)
      db.collection('barangs').doc(itm.id).update({
        likes: Number(itm.likes) + 1
      })
      .then(function () {
        commit('setLoading', false)
        console.log('Document successfully updated!')
      })
      .catch(function (error) {
        commit('setLoading', false)
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      })
    })
  },
  submitOrder ({commit, getters}) {
    commit('setLoading', true)
    db.collection('orders').add({
      barangs: getters.barangsBeli, pemesan: getters.pemesan, kemasan: getters.kemasan, biaya: getters.barangsBeliTotalHarga, bayar: false, kirim: false, sampai: false
    })
    .then(function (docRef) {
      commit('setLoading', false)
      commit('setOrderId', docRef.id)
      // console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      commit('setLoading', false)
      console.error('Error adding document: ', error)
    })
  },
  getDbOrderId ({commit}, payload) {
    var docRef = db.collection('orders').doc(payload.orderId)
    return docRef.get().then((snap) => {
      if (snap.exists) {
        if ((snap.get('kode') === payload.kode) && (snap.get('pemesan').email === payload.email)) {
          return snap
        }
      }
      return null
    }).then((snap) => {
      if (snap !== null && snap !== undefined) {
        var val = snap.data()
        val.id = snap.id
        commit('setOrderCheck', val)
      }
    })
    .catch(err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  },
  getDbOrders ({commit}, payload) {
    var docRef = db.collection('orders').where('date', '>=', payload.datefrom).where('date', '<=', payload.dateuntil).orderBy('date')
    commit('setLoading', true)
    return docRef.onSnapshot(querySnapshot => {
      commit('setOrders', [])
      querySnapshot.forEach(documentSnapshot => {
        var val = documentSnapshot.data()
        val.id = documentSnapshot.id
        commit('pushOrders', val)
      })
      commit('setLoading', false)
    }, err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  },
  setDbOrder ({commit}, payload) {
    db.collection('orders').doc(payload.id).update(payload.data)
    .catch(err => {
      console.log(`Encountered error: ${err}`)
    })
  },
  setDbOrderBarang ({commit}, payload) {
    db.collection('orders').doc(payload.id).update(payload.data)
    .catch(err => {
      console.log(`Encountered error: ${err}`)
    })
  },
  getDbDataAdmin ({commit}) {
    commit('setLoading', true)
    db.collection('akun').doc('admin').get().then((snap) => {
      if (snap.exists && snap !== null && snap !== undefined) {
        var val = snap.data()
        val.id = snap.id
        commit('setDataAdmin', val)
      }
    })
    .catch(err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  },
  setDbDataAdmin ({commit}, payload) {
    commit('setLoading', true)
    db.collection('akun').doc('admin').set(payload)
    .catch(err => {
      console.log(`Encountered error: ${err}`)
      commit('setLoading', false)
    })
  }
}

export default actions
