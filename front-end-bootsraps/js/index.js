// -------------------------------------------------------------Appel API des produits-------------------------------------------
import { numberItemInTheBasket } from "./nuberItems.js";
//--------------------------------------------------------------FIN ------------------------------------------------------------
//---------------------------------------------------- fonction pour faire la requete a l'api-------------------------------------
const getCameraProduct = async () => {
  const response = await fetch("http://localhost:3000/api/cameras");
  return response.json();
};
//--------------------------------------------------- FIN ----------------------------------------------------------------------------
//------------------------------------- fonction pour l'injection dans le html--------------------------------------------------------
const displayCamera = async (cameras) => {
  //boucle qui inject les produits dans mon html
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
      <span class="fw-bold text-primary border border-2 border-primary d-flex ms-auto mb-2 mt-auto" style="padding: 3px">${(
        camera.price / 100
      ).toFixed(2)}€</span>
    </div>
 </div>
 
 
 `;
  });
};

(async () => await displayCamera(await getCameraProduct()))();
//------------------------------------------------------------- FIN ------------------------------------------------------------------
window.numberItemInTheBasket = numberItemInTheBasket();
