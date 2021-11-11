export const numberItemInTheBasket = () => {
  const notificationBasket = document.querySelector("#bubble-items");
  let amountItem = 0;
  if (amountItem === 1) {
    notificationBasket.innerHTML = `<span class="m-auto">1</span>`;
  } else {
    const basket = JSON.parse(localStorage.getItem("basket"));
    basket.forEach((element) => {
      amountItem += element.quantity;
    });
    notificationBasket.innerHTML = `<span class="m-auto">${amountItem}</span>`;
  }
};
