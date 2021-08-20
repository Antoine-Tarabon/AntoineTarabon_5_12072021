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
            '<div class="col-12 col-md-8 col-lg-6 col-xl-4 my-3">' +
              '<a href="./produit.html?id='+teddy._id+'">' +
                '<div class="card border-0">' +
                  '<img src="'+teddy.imageUrl+'" width="100%" height="60%" alt="Peluche '+teddy.name+'" >' +
                  '<div class="card-body">' +
                    '<h3 class="card-title">'+teddy.name+'</h3>' +
                    '<p class="card-text">'+(teddy.price/100)+' €</p>' +
                    '<div class="etoiles">' +
                      '<i class="fas fa-star active"></i>' +
                      '<i class="fas fa-star active"></i>' +
                      '<i class="fas fa-star active"></i>' +
                      '<i class="fas fa-star active"></i>' +
                      '<i class="fas fa-star active"></i>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</a>' +
            '</div>';
        });
    })
    .catch(function(err) {

    });
}
//appel de la fonction getTeddies
let teddies= getTeddies();