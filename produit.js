
async function getTeddy(id) {
    let teddyApi = await fetch('http://localhost:3000/api/teddies/'+id);
    let teddy = await teddyApi.json();
    localStorage.setItem('currentTeddy', JSON.stringify(teddy));
    document.getElementById('teddy-image').src = teddy.imageUrl;
    document.getElementById('teddy-name').innerHTML = teddy.name;
    document.getElementById('teddy-description').innerHTML = teddy.description;
    document.getElementById('teddy-price').innerHTML = (teddy.price/100)+'€';
    teddy.colors.forEach((color, index) => {
        document.getElementById('teddy-color').innerHTML = document.getElementById('teddy-color').innerHTML +
           '<option value='+color+'>'+color+'</option>';

        })   
}

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
function addTeddyToCart() {
    let teddy = JSON.parse(localStorage.getItem('currentTeddy'));
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart ===null) {
        cart = [];
    }
    cart.push(teddy);
    document.getElementById('cart-quantity').innerHTML = '(' + cart.length + ')';
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart)
}

getTeddy(findGetParameter('id'));
console.log(JSON.parse(localStorage.getItem('cart')));