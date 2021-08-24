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

// locale storage

const addQuantity = (item, basket) => {
  for (let index = 0; index < basket.length; index++) {
    // boucle for pour incrementer les items
    const element = basket[index]; // const pour selectionner 1 element du tableau
    if (item.id === element.id) {
      // condition de la fonction strictement egal pour eviter la casse
      const newBasket = basket.filter((items) => items.id !== element.id); // utilisation de la methode filter
      item.quantity += Number(element.quantity); // addition des quantite lorsque l'on ajoute au panier
      if (item.quantity > 9) item.quantity = 9; // condition pour arrete l'ajout d'article au dessus de
      return localStorage.setItem(
        "basket", // return du setItem pour eviter d'ecraser le local storage a chaque ajout
        JSON.stringify([...newBasket, item])
      );
    }
  }
  localStorage.setItem("basket", JSON.stringify([...basket, item]));
};

function addToBasket(id) {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const quantity = document.querySelector("#quantity").value;
  const lensesOption = document.querySelector("#lenses_option").value;
  const item = {
    id,
    quantity: Number(quantity),
    lensesOption,
  };

  if (!basket) return localStorage.setItem("basket", JSON.stringify([item]));
  addQuantity(item, basket);
}
