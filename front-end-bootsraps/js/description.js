const getCameraProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const response = await fetch(
    `http://localhost:3000/api/cameras/${productId}`
  );

  return response.json();
};

const showCameraProduct = async (camera) => {
  camera = await camera;

  const cameraProduct = document.querySelector("#product");

  cameraProduct.innerHTML = `
  <div class="card mx-auto m-4" style="width: 25rem;" >
  <img class="card-img-top" src="${camera.imageUrl}">
<div class="card-body d-flex flex-column ">
    <h3 class="card-title mb-3">${camera.name}</h3>
    <span class="fst-italic mb-2">${camera.description}</span>
    <span class="fw-bold text-primary">${camera.price / 100}€</span>
    <label for="lenses-select">choisissez votre objectif:</label>
    <select id="lenses">
    <option value="">--Selectionnez votre objetif ici--</option>
    ${camera.lenses.map((lense) => `<option>${lense}</option>`)}
    </select>
    <button href="#" class="btn btn-warning mt-5">Ajouter au panier </button>
</div>
      `;
};
showCameraProduct(getCameraProduct());
