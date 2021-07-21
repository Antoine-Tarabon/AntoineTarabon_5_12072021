
function getTeddies() {
    fetch("http://localhost:3000/api/teddies/:id")
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(teddies) {
        teddies.forEach((teddy, index) => {
            document.getElementById('produit').innerHTML = document.getElementById('produit').innerHTML +
            '         <div class="d-flex align-items-center justify-content-center col-5">\n'  +   
            '           <img src="'+teddy.imageUrl+'" alt="ours" width="" height="60%" >\n'  +           
            '         </div>\n'  +
            '         <div class="col-7 text-center">\n'  +
            '            <h1>'+teddy.name+'</h1>\n'  +     
            '            <p>'+teddy.description+'</p>\n'  +
            '            <p>'+teddy.color+'</p>\n'  +
            '            <p>'+teddy.price+'</p>\n'  +
            '            </div>';  
            
        });
    })
    .catch(function(err) {

    });
}
let teddies= getTeddies();