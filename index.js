

function getTeddies() {
    //on récupère les informations des peluches
    fetch("http://localhost:3000/api/teddies/")
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(teddies) {
        //pour chacune des peluche on va modifier quelque chose
        teddies.forEach((teddy, index) => {
            //on cible l'element ou on veux modifier le html 
            document.getElementById('catalog').innerHTML = document.getElementById('catalog').innerHTML +
            //on met les varibles que l'on a récuperé
            '<div class="col-12 col-md-8 col-lg-6 col-xl-4 my-3">\n' +
            '          <a href="./produit.html?id='+teddy._id+'">\n' +
            '            <div class="card border-0">\n' +
            '              <img src="'+teddy.imageUrl+'" width="100%" height="60%" alt="Peluche '+teddy.name+'" >\n' +
            '            <div class="card-body">\n' +
            '              <h3 class="card-title">'+teddy.name+'</h3>\n' +
            '              <p class="card-text">'+(teddy.price/100)+' €</p>\n' +
            '              <div class="etoiles">\n' +
            '                <i class="fas fa-star active"></i>\n' +
            '                <i class="fas fa-star active"></i>\n' +
            '                <i class="fas fa-star active"></i>\n' +
            '                <i class="fas fa-star active"></i>\n' +
            '                <i class="fas fa-star active"></i>\n' +
            '            </div>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '          </a> \n' +
            '        </div>';
        });
    })
    .catch(function(err) {

    });
}
let teddies= getTeddies();