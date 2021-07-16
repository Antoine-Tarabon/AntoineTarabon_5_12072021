
fonction getTeddies() {
    fetch("http://localhost:3000/api/teddies/")
     .then(function(res) {
        if (res.ok) {
          return res.json;
        }
    })
    .then(funtion(value) {
        console.log(value);
    })
    .catch(function(err) {

    });
}
