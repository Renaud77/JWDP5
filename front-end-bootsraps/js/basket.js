// const main = document.querySelector(".main");

// if (getNumberOfItems() === 0) {
//   errorTittle = document.createElement("h2");
//   errorTittle.innerHTML = `Votre panier es vide.`;
//   errorMsg = document.createElement("p");
//   errorMsg.innerHTML = `Aucun produit n'as été selectionné dans votre panier.`;
// }

// on reutilise la const basket pour allez chercher nos info dans le localStorage

const basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);

// on le affiche ensuite

const displayItems = document.querySelector("#container_basket");
console.log(displayItems);

// message si le panier es vide

if (basket === null) {
  const emptyBasket = `    
  <div class="empty_basket">
    <h2 class="empty_basket-text">Votre panier es vide</h2>
  </div>
`;
  basket.innerHTML = emptyBasket;
} else {
  console.log("je ne suis pas vide");
}
