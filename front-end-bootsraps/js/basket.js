// const main = document.querySelector(".main");

// if (getNumberOfItems() === 0) {
//   errorTittle = document.createElement("h2");
//   errorTittle.innerHTML = `Votre panier es vide.`;
//   errorMsg = document.createElement("p");
//   errorMsg.innerHTML = `Aucun produit n'as été selectionné dans votre panier.`;
// }

// on reutilise la const basket pour allez chercher nos info dans le localStorage

const basket = JSON.parse(localStorage.getItem("basket"));

// on l' affiche ensuite

const displayItems = document.querySelector("#container_basket");

// message si le panier es vide

if (basket === null) {
  const emptyBasket = `    
  <div class="empty_basket d-flex justify-content-center">
    <h2 class="empty_basket-text ">Votre panier es vide.</br><i class="far fa-sad-tear d-flex justify-content-center"></i></h2>
  </div>
`;
  displayItems.innerHTML = emptyBasket;
} else {
  let itemInTheBasket = [];

  for (let k = 0; k < basket.length; k++) {
    itemInTheBasket =
      itemInTheBasket +
      `
      <div class="item_the_basket d-flex justify-content-around align-items-center flex-wrap ">
        <p>Nom:${basket[k].id.name}</p>
        <p>Quantité:${basket[k].quantity}</p>
        <p>Option et sa Quantité:${
          basket[k].lenses[0].lenseName +
          "   en quantité de:  " +
          basket[k].lenses[0].quantity
        }</p>
        <p>Prix:${basket[k].price}</p>
        <p> Supprimer l'arcticle</p>
      </div>
`;
    displayItems.innerHTML = itemInTheBasket;
  }
}
