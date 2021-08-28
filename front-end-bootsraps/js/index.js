// Appel API des produits

let response;

const getCameraProduct = async () => {
  const response = await fetch("http://localhost:3000/api/cameras");
  return response.json();
};

const displayCamera = async (cameras) => {
  cameras.forEach((camera) => {
    document.body.querySelector("#camerasDisplay").innerHTML += `
 <div onclick="window.location.replace('description.html?id=${
   camera._id
 }')" class="card mx-auto m-3 rounded" style="width: 25rem;" >
    <img class="card-img-top" style="height:12rem; object-fit:cover" src="${
      camera.imageUrl
    }">
    <div class="card-body d-flex flex-column ">
      <h3 class="card-title">${camera.name}</h3>
      <span class="fw-bold text-primary">${camera.price / 100}€</span>
    </div>
 </div>
 
 
 `;
  });
};
// displayCamera(getCameraProduct());

(async () => await displayCamera(await getCameraProduct()))();
