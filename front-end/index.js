let response;

const getCameraProduct = async () => {
  const response = await fetch("http://localhost:3000/api/cameras");
  //   console.log(await response.json());
  return response.json();
};

const displayCamera = async (cameras) => {
  cameras.forEach((camera) => {
    document.body.querySelector("#camerasDisplay").innerHTML += `
 
 <div class="card_product">
    <img src="${camera.imageUrl}">
    <div class="card_product-text">
      <h3>${camera.name}</h3>
      <span>${camera.price}</span>
    </div>
 </div>
 
 `;
  });
};
// displayCamera(getCameraProduct());

(async () => await displayCamera(await getCameraProduct()))();
