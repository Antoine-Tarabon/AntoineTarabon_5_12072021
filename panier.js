(JSON.parse(localStorage.getItem('cart'))).forEach(function(teddy) {
    document.getElementById('panier').innerHTML = document.getElementById('panier').innerHTML +

    '            <div class="card border-0 my-3 col-4">\n' +
    '          <a href="./produit.html?id='+teddy._id+'">\n' +
    '              <img src="'+teddy.imageUrl+'" width="100%" height="100%" alt="ours en peluche" >\n' +
    '          </a> \n' +
    '            </div>\n' +
    '            <div class="card-body text-center col-4 ">\n' +
    '              <h3 class="card-title">'+teddy.name+'</h3>\n' +
    '              <p class="card-text ">'+(teddy.price/100)+' €</p>\n' +
    '              <p class="card-description">'+teddy.description+'</p>\n' +
    '              <p class="card-color">'+teddy.colors+'</p>\n' +
    '            </div>\n' +
    '              <div class="etoiles d-flex align-items-center justify-content-center col-2 ">\n' +
    '                <i class="fas fa-star active"></i>\n' +
    '                <i class="fas fa-star active"></i>\n' +
    '                <i class="fas fa-star active"></i>\n' +
    '                <i class="fas fa-star active"></i>\n' +
    '                <i class="fas fa-star active"></i>\n' +
    '          </div>\n'  +
    '          <div class="d-flex align-items-center justify-content-center col-2">\n' +
    '          <button onclick="supprTeddyToCart()" > <i class="fas fa-times"></i> </button>'
});
console.log(localStorage)
function supprTeddyToCart(){
  localStorage.removeItem(teddy);
}


window.addEventListener("load", function () {
    function sendData() {
      let XHR = new XMLHttpRequest();
  
      // Liez l'objet FormData et l'élément form
      let FD = new FormData(form);
  
      // Définissez ce qui se passe si la soumission s'est opérée avec succès
      XHR.addEventListener("load", function(event) {
        alert(event.target.responseText);
      });
  
      // Definissez ce qui se passe en cas d'erreur
      XHR.addEventListener("error", function(event) {
        alert('Oups! Quelque chose s\'est mal passé.');
      });
  
      // Configurez la requête
      XHR.open("POST", "http://localhost:3000/api/teddies/order");
  
      // Les données envoyées sont ce que l'utilisateur a mis dans le formulaire
      XHR.send(FD);
    }
  
    // Accédez à l'élément form …
    let form = document.getElementById("myForm");
  
    // … et prenez en charge l'événement submit.
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      sendData();
    });
  });