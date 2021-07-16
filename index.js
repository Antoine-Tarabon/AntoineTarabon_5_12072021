

function getTeddies() {
    fetch("http://localhost:3000/api/teddies/")
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(teddies) {
        teddies.forEach((teddy, index) => {
            document.getElementById('catalog').innerHTM = document.getElementById('catalog').innerHTM + 
           '<div class="col-12 col-md-8 col-lg-6 col-xl-4 my-3">\n' +
           '  +<a href="#"></a>\n' +
           '    <div class="card border-0">\n' +  
           '     <img src="./images/teddy_1.jpg" width="100%" height="60%" alt="ours en peluche" >\n' +
           '   <div class="card-body">\n' + 
           '     <h3 class="card-title">Popi</h3>\n' +    
           '     <p class="card-text">11.99€</p>\n' +   
           '     <div class="etoiles">\n' +   
           '        <i class="fas fa-star active"></i>\n' +      
           '        <i class="fas fa-star active"></i>\n' +   
           '        <i class="fas fa-star active"></i>\n' +   
           '        <i class="fas fa-star active"></i>\n' +  
           '        <i class="fas fa-star active"></i>\n' +
           '    </div>\n' + 
           '  </div>\n' +  
           ' </div>\n' + 
           ' </a>\n' +  
           '</div>';
        });
    })
    .catch(function(err) {

    });
}
let teddies= getTeddies();