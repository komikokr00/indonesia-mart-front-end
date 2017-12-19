let getters = {
  isLoading (state) {
    return state.isLoading
  },
  isError (state) {
    return state.isError
  },
  error (state) {
    return state.error
  },
  errorMessage (state) {
    return state.errorMessage
  },
  dataAdmin (state) {
    return state.dataAdmin
  },
  favorit (state) {
    return state.favorit
  },
  kategoris (state) {
    return state.kategoris
  },
  kemasans (state) {
    return state.kemasans
  },
  kemasan (state) {
    return state.kemasan
  },
  kategori (state) {
    return state.kategori
  },
  kategorisSnapshots (state) {
    return state.kategorisSnapshots
  },
  getKategorisSnapshotsId (state) {
    if (state.kategorisSnapshots !== null && state.kategorisSnapshots !== undefined) {
      var out = state.kategorisSnapshots.filter((snap) => snap.id === state.kategori.id)
      if (out.length > 0) return out[0]
    }
    return null
  },
  barangs (state) {
    return state.barangs
  },
  barangsFavorit (state) {
    return state.barangsFavorit
  },
  barangsNamas (state) {
    var namas = []
    if (state.barangs !== null && state.barangs !== undefined) {
      state.barangs.map((itm) => {
        namas.push(itm.nama)
      })
    }
    return namas
  },
  barangsLastSnapshot (state) {
    return state.barangsLastSnapshot
  },
  barangsBeli (state) {
    return state.barangsBeli
  },
  barangsBeliJumlah (state) {
    return state.barangsBeliJumlah
  },
  barangsBeliTotalHarga (state) {
    return state.barangsBeliTotalHarga
  },
  orderId (state) {
    return state.orderId
  },
  orderCheck (state) {
    return state.orderCheck
  },
  orders (state) {
    return state.orders
  },
  pemesan (state) {
    return state.pemesan
  },
  IdToken (state) {
    return state.IdToken
  },
  currentUser (state) {
    return state.currentUser
  },
  isAdmin (state) {
    if (state.currentUser !== null && state.currentUser !== undefined) {
      if (state.currentUser.email !== undefined && state.currentUser.email !== null && state.currentUser.akses === 'admin') {
        return true
      }
    }
    return false
  },
  naviRutes (state) {
    return state.naviRutes
  },
  kataCari (state) {
    return state.kataCari
  },
  queryLimit (state) {
    return state.queryLimit
  }
}

export default getters
