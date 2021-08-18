//Fonction qui permet de récupérer et afficher les information d'une peluche
async function getTeddy(id) {
    //on récupère la peluche avec l'id en paramètre de l'url
    let teddyApi = await fetch('http://localhost:3000/api/teddies/'+id);
    let teddy = await teddyApi.json();
    //on met de coté les information du teddy récupérée
    localStorage.setItem('currentTeddy', JSON.stringify(teddy));
    //on affiche les informations de la peluche récupérée
    document.getElementById('teddy-image').src = teddy.imageUrl;
    document.getElementById('teddy-name').innerHTML = teddy.name;
    document.getElementById('teddy-description').innerHTML = teddy.description;
    document.getElementById('teddy-price').innerHTML = (teddy.price/100)+'€';
    //Création d'un select pour les couleur de la peluche
    teddy.colors.forEach((color, index) => {
        document.getElementById('teddy-color').innerHTML = document.getElementById('teddy-color').innerHTML +
           '<option value='+color+'>'+color+'</option>';
        })   
}
//on créer une Fonction qui permet de récupérer la valeur d'un parametre get passé en paramètre de celle-ci
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
        console.log(result);
    return result;
}
//Fonction qui ajoite une peluche au localstorage
function addTeddyToCart() {
    //Récuperation de la peluche mise de coté dans le localstorage
    let teddy = JSON.parse(localStorage.getItem('currentTeddy'));
    //Récupération du panier dans le localstorage
    let cart = JSON.parse(localStorage.getItem('cart'));
    //si il n'y a pas encore de panier on créer un tableau vide
    if(cart ===null) {
        cart = [];
    }
    //on rajoute la peluche au tableua
    cart.push(teddy._id);
    //on affiche la quantité du panier
    document.getElementById('cart-quantity').innerHTML = '(' + cart.length + ')';
    //mise a jour de cart dans le localstorage
    localStorage.setItem('cart', JSON.stringify(cart));
}
//appel de la fonction getTeddy avec le paramètre la valeur de l'id de la peluche
getTeddy(findGetParameter('id'));