
(async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.ready
          .then(registration => registration.sync.register('database-sync'))
          .then(() => console.log("Serviço de sincronização em segundo plano registrado com sucesso"))
          .catch(err => console.error("Erro ao registrar o serviço de sincronização em segundo plano", err));
  }

  const periodicSyncPermission = await navigator.permissions.query({name: 'periodic-background-sync'});
  if (periodicSyncPermission.state == 'granted') {
    await navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.ready
          .then(registration => registration.periodicSync.register('database-sync-periodic', {minInterval: 5 * 1000 * 60}))
          .then(() => console.log("Serviço de sincronização periódica em segundo plano registrado com sucesso"))
        .catch(err => console.error("Erro ao registrar o serviço de sincronização periódica em segundo plano", err));
  } else {
    console.log('Requisitar periodic-background-sync');
  }
})();
