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
  <div class="card mx-auto m-5" style="width: 25rem;" >
    <img class="card-img-top" src="${camera.imageUrl}">
    <div class="card-body d-flex flex-column ">
      <h3 class="card-title mb-3">${camera.name}</h3>
      <span class="fst-italic mb-3">${camera.description}</span>
      <span class="fw-bold text-primary">${camera.price / 100}€</span>
      <form id="lenses_option">
        <label for="lenses_option">Choisissez votre objectif:</label>
          <select name="lenses_option" id="lenses_option">
            <option value="lenses">--Selectionnez votre objectif ici--</option>
            ${camera.lenses.map(
              (lense) => `<option id="lenses_option">${lense}</option>`
            )}
          </select>
        <label for="quantity">Selectionner votre quantité :</label>
          <input type="number" id="quantity" name="quantity" value="1" min="1" max="9" placeholder"1">
      </form>
      <input type="submit" onClick="addToBasket('${
        camera._id
      }' )" class="btn btn-warning mt-4" value="Ajouter au panier">
    </div>
  </div>

      `;
};

showCameraProduct(getCameraProduct());

const addQuantity = () => {
  const ls = localStorage.getItem("basket");
  const arrayBasket = ls.split(",");
  console.log(arrayBasket);
};

function addToBasket(id) {
  const quantity = document.querySelector("#quantity").value;
  localStorage.setItem("basket", [id, quantity]);
}

addQuantity();
