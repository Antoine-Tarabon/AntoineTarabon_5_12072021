
function getTeddy(id) {
    fetch('http://localhost:3000/api/teddies/'+id)
     .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(teddy) {
        document.getElementById('teddy-image').src = teddy.imageUrl;
        document.getElementById('teddy-name').innerHTML = teddy.name;
        document.getElementById('teddy-description').innerHTML = teddy.description;
        document.getElementById('teddy-price').innerHTML = (teddy.price/100)+'€';
        teddy.colors.forEach((color, index) => {
            document.getElementById('teddy-color').innerHTML = document.getElementById('teddy-color').innerHTML +
               '<option value='+color+'>'+color+'</option>';

        })   
    })
    .catch(function(err) {
        console.log(teddies)
        console.log(err)

    });
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

let teddies= getTeddy(findGetParameter('id'));