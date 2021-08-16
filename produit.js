//on créer une fonction async pour ensuite mettre des await pour que la page charge correctement
async function getTeddy(id) {
    //on récupère la peluche avec l'id et on attend que le serveur répond
    let teddyApi = await fetch('http://localhost:3000/api/teddies/'+id);
    //on transforme l'info en json et on attend quil nous le transforme en json
    let teddy = await teddyApi.json();
    //on met le json dans le localstorage
    localStorage.setItem('currentTeddy', JSON.stringify(teddy));
    //on cible les élements ou on veux modifier le html et on met les varibles que l'on a récuperé
    document.getElementById('teddy-image').src = teddy.imageUrl;
    document.getElementById('teddy-name').innerHTML = teddy.name;
    document.getElementById('teddy-description').innerHTML = teddy.description;
    document.getElementById('teddy-price').innerHTML = (teddy.price/100)+'€';
    //pour chaque couleur d'une peluche on va modifier quelque chose
    teddy.colors.forEach((color, index) => {
        //on cible le teddy-color et on ajoute les options avec leur valeurs
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
//on créer une fonction pour ajouter une peluche au localstorage
function addTeddyToCart() {
    //on récupère dans le localstorage
    let teddy = JSON.parse(localStorage.getItem('currentTeddy'));
    let cart = JSON.parse(localStorage.getItem('cart'));
    //si cart n'existe pas on créer le tableau cart 
    if(cart ===null) {
        cart = [];
    }
    //on push dans le tableau cart
    cart.push(teddy._id);
    //on affiche la quantité du panier
    document.getElementById('cart-quantity').innerHTML = '(' + cart.length + ')';
    //on ajoute cart au localstorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

getTeddy(findGetParameter('id'));
//on peux verifier que ca marche bien dans la console
console.log(JSON.parse(localStorage.getItem('cart')));