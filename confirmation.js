 //on cible les élements ou on veux modifier le html et on met les varibles que l'on a récuperé
 const totalConfirmation = document.querySelector(".total span");
 const orderId = document.querySelector(".orderid span");
// on récupère le total et l'order id du localstorage 
  totalConfirmation.innerText = localStorage.getItem("total") + "€";
  orderId.innerText = localStorage.getItem("orderId");
  
  // On vide le localStorage 
  localStorage.clear(); 