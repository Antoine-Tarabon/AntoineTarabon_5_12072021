 //Affiche des informations de l'achat
const totalConfirmation = document.querySelector(".total span");
const orderId = document.querySelector(".orderid span");
totalConfirmation.innerText = localStorage.getItem("total") + "€";
orderId.innerText = localStorage.getItem("orderId");
  
// On vide le localStorage 
localStorage.clear(); 