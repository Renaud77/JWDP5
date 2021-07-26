let response;

const getCameraProduct = async () => {
  const response = await fetch("http://localhost:3000/api/cameras");
  //   console.log(await response.json());
  return response.json();
};

const displayCamera = async (cameras) => {
  cameras.forEach((camera) => {
    document.body.querySelector("#camerasDisplay").innerHTML += `
 <div class="card mx-auto m-3" style="width: 25rem;" >
    <img class="card-img-top" style="height:12rem; object-fit:cover" src="${camera.imageUrl}">
    <div class="card-body d-flex flex-column ">
      <h3 class="card-title">${camera.name}</h3>
      <span>${camera.price}€</span>
      <a href="#" class="btn btn-warning">Commander</a>
    </div>
 </div>
 
 
 `;
  });
};
// displayCamera(getCameraProduct());

(async () => await displayCamera(await getCameraProduct()))();
