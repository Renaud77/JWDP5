import { numberItemInTheBasket } from "./numberItems.js";
/**
 * function qui cree la page description en fonction du produit choisie
 */
const getCameraProduct = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const response = await fetch(
    `http://localhost:3000/api/cameras/${productId}`
  );

  return response.json();
};
/**
 *  On affiche les details que l'on veux sur le produit et on y met les option de quantité et un boutton pour ajouter au panier
 */
async function showCameraProduct(camera) {
  camera = await camera;

  const cameraProduct = document.querySelector("#product");

  cameraProduct.innerHTML = `
  <div class="card mx-auto m-5" style="width: 20rem;" >
    <img class="card-img-top" src="${camera.imageUrl}">
    <div class="card-body d-flex flex-column ">
      <h3 class="card-title mb-3">${camera.name}</h3>
      <span class="fst-italic mb-3">${camera.description}</span>
      <span id="price" class="fw-bold text-primary border border-2 border-primary d-flex ms-auto mb-2 mt-auto" style="width: fit-content; padding:3px">${(
        camera.price / 100
      ).toFixed(2)}€</span>
      <form id="lenses_option">
        <label for="lenses_option">Choisissez votre objectif:</label>
          <select name="lenses_option" id='lensesOption'>
            ${camera.lenses.map(
              (lense) => `<option value="1">${lense}</option>`
            )}
          </select>
        <label for="quantity">Selectionner votre quantité :</label>
          <input type="number" id="quantity" name="quantity" value="1" min="1" max="99" placeholder"1">
      </form>
      <input type="button" onClick="addToBasket('${
        camera._id
      }')" class="btn btn-warning mt-4" value="Ajouter au panier">
    </div>
  </div>
      `;
}
showCameraProduct(getCameraProduct());
/**
 * Rajouter un nouvel appareil au lieu de reinitialiser le local storage.
 */
const addQuantity = (item, basket) => {
  for (let index = 0; index < basket.length; index++) {
    // boucle for pour incrementer les items
    const element = basket[index]; // const pour selectionner 1 element du tableau
    if (item.id === element.id) {
      const newBasket = basket.filter((items) => items.id !== element.id); // utilisation de la methode filter
      item.quantity += Number(element.quantity); // addition des quantite lorsque l'on ajoute au panier
      element.lenses.forEach((lense) => {
        if (item.lenses[0].lenseName === lense.lenseName)
          // Si l'item choisis par l'utilisateur contient une lense qui est égal aux lenses déja dans le panier on exécute la condition
          return (item.lenses[0].quantity += lense.quantity); // On augmente la quantité de la lense en fonction de la quatité choisis par l'utilisateur
      });
      const newItemLense = element.lenses.filter(
        (lense) => lense.lenseName !== item.lenses[0].lenseName // On crée un nouveau tableau à partir de l'ancien tableau ( element.lenses ), et on ne garde seulement les lense qui sont différente de la lense choisie par l'utilisateur
      );
      item.lenses = [...newItemLense, item.lenses[0]]; // On combine la lense choisie par l'utilisateur et celle choisis précedement
      return localStorage.setItem(
        "basket", // return du setItem pour eviter d'ecraser le local storage a chaque ajout
        JSON.stringify([...newBasket, item])
      );
    }
  }
  localStorage.setItem("basket", JSON.stringify([...basket, item]));
};
/**
 * la fonction récupere les informations selectionées pour les envoyers au local storage
 */
function addToBasket(id) {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const quantity = document.getElementById("quantity").value;
  const lensesOption = document.getElementById("lensesOption");
  const lenseSelect = lensesOption.options[lensesOption.selectedIndex].text;
  const item = {
    id,
    quantity: Number(quantity),
    lenses: [{ quantity: Number(quantity), lenseName: lenseSelect }],
  };

  if (!basket) return localStorage.setItem("basket", JSON.stringify([item]));
  addQuantity(item, basket);

  numberItemInTheBasket();
}
window.addToBasket = (id) => {
  addToBasket(id);
};
// -------------------------------------------------------------- FIN --------------------------------------------------------------------------------
window.numberItemInTheBasket = numberItemInTheBasket();
