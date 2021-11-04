export const totalPriceBasket = () => {
  const displayTotalPrice = document.querySelector("#total_price");
  const basket = JSON.parse(localStorage.getItem("basket"));
  const getCameraInfo = async (id) => {
    const response = await fetch(`http://localhost:3000/api/cameras/${id}`);

    return response.json();
  };
  const itemInfo = await getCameraInfo(item.id);

  let totalPrice = 0;
  basket.forEach((element) => {
    totalPrice += element.itemInfo.price;
  });
};
