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

function supprTeddyToCart() {
const teddy = (JSON.parse(localStorage.getItem('cart')));
const indice = teddy.findIndex(teddy => teddy.name === "Norbert");
console.log(indice); 
console.log(teddy[indice]); 
}


function checkFormAndPostRequest() {

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
  submit.addEventListener("click", (e) => {
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
      e.preventDefault();
    } else if (isNaN(inputPhone.value)) {
      e.preventDefault();
      erreur.innerText = "Votre numéro de téléphone n'est pas valide";
    } else {

      // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits acheté, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
      let productsBought = [];
      productsBought.push(copyOfLS);

      const order = {
        contact: {
          firstName: inputName.value,
          lastName: inputLastName.value,
          city: inputCity.value,
          address: inputAdress.value,
          email: inputMail.value,
        },
        products: productsBought,
      };

      // -------  Envoi de la requête POST au back-end --------
      // Création de l'entête de la requête
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceConfirmation = document.querySelector(".total").innerText;
      priceConfirmation = priceConfirmation.split(" :");

      // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
      fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => response.json())
        .then((data) => {
          localStorage.clear();
          console.log(data)
          localStorage.setItem("orderId", data.orderId);
          localStorage.setItem("total", priceConfirmation[1]);

          //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
           document.location.href = "confirmation.html";
        })
        .catch((err) => {
          alert("Il y a eu une erreur : " + err);
        });
    }
  });
}