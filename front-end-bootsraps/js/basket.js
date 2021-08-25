const main = document.querySelector(".main");

if (getNumberOfItems() === 0) {
  errorTittle = document.createElement("h2");
  errorTittle.innerHTML = `Votre panier es vide.`;
  errorMsg = document.createElement("p");
  errorMsg.innerHTML = `Aucun produit n'as été selectionné dans votre panier.`;
}
