//fonction qui récupère toute les peluches en base et les affiches sur la page 
function getTeddies() {  
    //récupération des peluches en base
    fetch("http://localhost:3000/api/teddies/")
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    //Rajout dans le DOM de la partie html de chaque peluche
    .then(function(teddies) {
        teddies.forEach((teddy, index) => {
            document.getElementById('catalog').innerHTML = document.getElementById('catalog').innerHTML +
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
//appel de la fonction getTeddies
let teddies= getTeddies();