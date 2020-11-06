
  var dbPromised = idb.open('football', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('matches', { 'keyPath': 'id' })
        upgradeDb.createObjectStore('teams', { 'keyPath': 'id' })
    }
  });

  var insertTeam = (team) => {
    dbPromised.then(db => {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams')
      team.createdAt = new Date().getTime()
      store.put(team)
      return tx.complete;
    }).then(() => {
      M.toast({ html: `${team.name} berhasil disimpan!` })
      console.log('Team berhasil disimpan');
    }).catch(err => {
      console.error('Team gagal disimpan', err);
    });
  }

  
var deleteTeam = (teamId) => {
  dbPromised.then(db => {
    var tx = db.transaction('teams', 'readwrite');
    var store = tx.objectStore('teams');
    store.delete(teamId);
    return tx.complete;
  }).then(() => {
    M.toast({ html: 'Team dihapus!' });
    SaveTeams();
  }).catch(err => {
    console.error('Error: ', err);
  });
}

var getSaveTeams = () => {
  return dbPromised.then(db => {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  })
}