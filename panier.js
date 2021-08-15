let cartTotal = 0;

(JSON.parse(localStorage.getItem('cart'))).forEach(function(productId) {
  fetch('http://localhost:3000/api/teddies/'+productId)
      .then(function(res){
        if (res.ok){
          return res.json();
        }
      })
      .then(function(teddy){
        cartTotal = cartTotal +(teddy.price/100);
        document.getElementById('panier').innerHTML = document.getElementById('panier').innerHTML +
        '<div class="row">\n' +     
            '<div class="card border-0 my-3 col-sm-12 col-xl-4">\n' +
              '<a href="./produit.html?id='+teddy._id+'">\n' +
                '<img src="'+teddy.imageUrl+'" width="100%" height="100%" alt="ours en peluche" >\n' +
              '</a> \n' +
            '</div>\n' +
            '<div class="card-body text-center col-4 ">\n' +
              '<h3 class="card-title">'+teddy.name+'</h3>\n' +
              '<p class="card-text ">'+(teddy.price/100)+' €</p>\n' +
              '<p class="card-description">'+teddy.description+'</p>\n' +
            '</div>\n' +
            '<div class="etoiles d-flex align-items-center justify-content-center col-sm-12 col-xl-2 ">\n' +
              '<i class="fas fa-star active"></i>\n' +
              '<i class="fas fa-star active"></i>\n' +
              '<i class="fas fa-star active"></i>\n' +
              '<i class="fas fa-star active"></i>\n' +
              '<i class="fas fa-star active"></i>\n' +
            '</div>\n'  +
            '<div class="d-flex align-items-center justify-content-center col-2">\n' +
              '<button onclick="supprTeddyToCart(this, \''+teddy._id+'\')" > <i class="fas fa-times"></i> </button>'+
            '</div>\n' +     
        '</div>';
        document.querySelector('#total').innerHTML = cartTotal + '€';
      })
      .catch(function(err){
        console.log(err);
      });
});


function supprTeddyToCart(element, teddyId) {
//récupération des peluches 
const cartTeddies = (JSON.parse(localStorage.getItem('cart')));
//récupération de l'index de la peluche que l'on veut supprimer
const index = cartTeddies.findIndex(productId => productId === teddyId);
//mise à jour du total du panier
fetch('http://localhost:3000/api/teddies/'+cartTeddies[index])
 .then(function(res){
   if (res.ok){
     return res.json();
   }
 })
 .then(function(teddy){
  cartTotal = cartTotal - (teddy.price/100);
  document.querySelector('#total').innerHTML = cartTotal + '€';
 })
 .catch(function(err){
  console.log(err);
});
//suppression de la peluche
cartTeddies.splice(index, 1);
//mise à jour du localstorage
localStorage.setItem('cart', JSON.stringify(cartTeddies));
//suppression de la peluche dans le DOM
element.parentNode.parentNode.remove();
}

async function checkFormAndPostRequest(e) {

  e.preventDefault();
  // On récupère les inputs depuis le DOM.
  const submit = document.querySelector("#submit");
  let inputName = document.querySelector("#name");
  let inputLastName = document.querySelector("#lastname");
  let inputPostal = document.querySelector("#postal");
  let inputCity = document.querySelector("#city");
  let inputAdress = document.querySelector("#adress");
  let inputMail = document.querySelector("#mail");
  let inputPhone = document.querySelector("#phone");
  let erreur = document.querySelector(".erreur");

  // Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on empêche l'envoi du formulaire. On vérifie aussi que le numéro est un nombre, sinon même chose.
  
    if (
      !inputName.value ||
      !inputLastName.value ||
      !inputPostal.value ||
      !inputCity.value ||
      !inputAdress.value ||
      !inputMail.value ||
      !inputPhone.value
    ) {
      erreur.innerHTML = "Vous devez renseigner tous les champs !";
    } else if (isNaN(inputPhone.value)) {
      erreur.innerText = "Votre numéro de téléphone n'est pas valide";
    } else {

      // Si le formulaire est valide, le tableau  order contiendra les produits ainsi que l'objet qui contient les infos de l'acheteur

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          city: inputCity.value,
          address: inputAdress.value,
          email: inputMail.value,
        },
        products: JSON.parse(localStorage.getItem('cart')),
      };

      // -------  Envoi de la requête POST au back-end --------
      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector("#total").innerHTML;
      priceConfirmation = priceConfirmation.split("€");
      

      // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
      const orderRequest= await fetch("http://localhost:3000/api/teddies/order", options);
      const orderJSON = await orderRequest.json();
      console.log(orderJSON)
      localStorage.clear();
      localStorage.setItem("orderId", orderJSON.orderId);
      localStorage.setItem("total", priceConfirmation[0]);

      //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
      document.location.href = "confirmation.html";
    }
}