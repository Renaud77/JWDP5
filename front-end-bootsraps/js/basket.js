const basket = JSON.parse(localStorage.getItem("basket"));
const getCameraInfo = async (id) => {
  const response = await fetch(`http://localhost:3000/api/cameras/${id}`);

  return response.json();
};

const displayBasket = async () => {
  // on l' affiche ensuite

  const displayItems = document.querySelector("#container_basket");

  // message si le panier es vide

  if (basket === null) {
    const emptyBasket = `    
  <div class="empty_basket d-flex justify-content-center">
    <h2 class="empty_basket-text ">Votre panier es vide.</br><i class="far fa-sad-tear d-flex justify-content-center"></i></h2>
  </div>
  `;
    return (displayItems.innerHTML = emptyBasket);
  }
  let itemInTheBasket = [];

  for (let item of basket) {
    const itemInfo = await getCameraInfo(item.id);
    itemInTheBasket =
      itemInTheBasket +
      `
      <div class="item_the_basket d-flex justify-content-around align-items-center flex-wrap" style="">
        <p>Nom: ${itemInfo.name}</p>
        <p>Quantité: ${item.quantity}</p>
        <p>Objectif: ${item.lenses[0].lenseName}</p>
        <p>Prix: ${((itemInfo.price / 100) * item.quantity).toFixed(2)}</p>
        <p><i class="fas fa-trash"></i></p>
      </div>
`;
    displayItems.innerHTML = itemInTheBasket;
    console.log(itemInfo);
  }
};

displayBasket();

//----------------------------------------------- afficher le nombre de items dans la basket----------------------------

const numberItemInTheBasket = () => {
  const notificationBasket = document.querySelector("#bubble-items");
  let amountItem = 0;
  console.log(basket);
  if (!basket) return null;
  basket.forEach((element) => {
    amountItem += element.quantity;
  });
  console.log(amountItem);
  notificationBasket.innerHTML = `<span>${amountItem}</span>`;
};
numberItemInTheBasket();
