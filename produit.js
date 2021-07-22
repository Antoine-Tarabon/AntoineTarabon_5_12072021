
function getTeddies(id) {
    fetch(`http://localhost:3000/api/teddies/${id}`)
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(teddies) {
        teddies.forEach((teddies, index) => {
            document.getElementById('produit').innerHTML = document.getElementById('produit').innerHTML +
            '         <div class="d-flex align-items-center justify-content-center col-5">\n'  +   
            '           <img src="'+teddies.imageUrl+'" alt="ours" width="" height="60%" >\n'  +           
            '         </div>\n'  +
            '         <div class="col-7 text-center">\n'  +
            '            <h1>'+teddies.name+'</h1>\n'  +     
            '            <p>'+teddies.description+'</p>\n'  +
            '            <p>'+teddies.color+'</p>\n'  +
            '            <p>'+teddies.price+'</p>\n'  +
            '            </div>';  
            
        });
    })
    .catch(function(err) {
        console.log

    });
}
let teddies= getTeddies();