if (navigator.serviceWorker) {
  window.onload = () => {
    navigator.serviceWorker
      .register('../sw_cached_site.js')
      .then((register) => {
        console.log('Service Worker: Registered')
      })
      .catch((error) => {
        console.log(error)
      })
  };
}
