export const numberItemInTheBasket = () => {
  const notificationBasket = document.querySelector("#bubble-items");
  let amountItem = 0;

  const basket = JSON.parse(localStorage.getItem("basket"));
  basket.forEach((element) => {
    amountItem += element.quantity;
  });
  console.log(amountItem);
  notificationBasket.innerHTML = `<span>${amountItem}</span>`;
};
