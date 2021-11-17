import { numberItemInTheBasket } from "./numberItems.js";
let globalPrice = 0;

//****************************************on recupere les info du local storage avec le methode get et fetch ****************//

const basket = JSON.parse(localStorage.getItem("basket"));

/**
 * Récupére les informations d'une caméra.
 * @param id string L'id de la caméra à récupérer.
 */
const getCameraInfo = async (id) => {
  const response = await fetch(`http://localhost:3000/api/cameras/${id}`);

  return response.json();
};

/**
 * Affichage du panier.
 */
const displayBasket = async () => {
  const displayItems = document.querySelector("#container_basket");

  // ****************************************message si le panier es vide***********************************************************//

  if (basket === null) {
    const emptyBasket = `    
      <div class="empty_basket d-flex justify-content-center">
        <h2 class="empty_basket-text ">Votre panier est vide.</br><i class="far fa-sad-tear d-flex justify-content-center"></i></h2>
      </div>
      `;
    return (displayItems.innerHTML = emptyBasket);
  }
  //*******************************************si il y as des items dans le local storage  ********************************************//
  let itemInTheBasket = [];

  for (let item of basket) {
    const itemInfo = await getCameraInfo(item.id);
    globalPrice += (itemInfo.price / 100) * item.quantity;
    itemInTheBasket =
      itemInTheBasket +
      `
        <div class="item_the_basket d-flex justify-content-around align-items-center flex-wrap mb-2 border border-dark p-2 ">
          <img style="width: 100px" src="${itemInfo.imageUrl}">  
          <p>Nom: ${itemInfo.name}</p>
          <p>Quantité: ${item.quantity}</p>
          <p>Objectif: ${item.lenses[0].lenseName}</p>
          <p>Prix: ${((itemInfo.price / 100) * item.quantity).toFixed(2)}</p>
        </div>
      `;
    displayItems.innerHTML = itemInTheBasket;
  }
  const totalPrice = `<p class="item_the_basket d-flex justify-content-around align-items-center flex-wrap mb-2 border border-dark p-2">Montant total de ${globalPrice}€</p>`;
  console.log(totalPrice);
  displayItems.insertAdjacentHTML("beforeend", totalPrice);
  localStorage.setItem("totalPrice", globalPrice);

  //-----------------------------------------------btn pour vider le panier (dans la fonction displayBasket)------------------------------------------------------------

  // code du btn supprimer

  const btnClearBasket = `<button onClick="clearBasket()" id="clear_basket_btn" class="btn btn-warning d-flex justify-content-center m-auto mb-2 w-25 border border-dark">Vider votre panier</button>`;

  //insert le boutton dans mon html

  displayItems.insertAdjacentHTML("beforeend", btnClearBasket);

  //------------------------------------------------------------------------------------------------------------------------------------
};

displayBasket();

/**
 * fonction pour le onClick du btn "vider le panier "
 */
function clearBasket() {
  //.remove item pour enlever la clef dans le LS
  localStorage.removeItem("basket");
  localStorage.removeItem("formulaireValues");

  //alert pour informer le client
  alert("votre panier es maintenant vide");

  // rafraichir la page panier
  window.location.href =
    "http://127.0.0.1:5501/front-end-bootsraps/basket.html";
}
window.clearBasket = clearBasket;

//----------------------------------------------- afficher le nombre de items dans la basket------------------------------------------------

numberItemInTheBasket();

/**
 * Afficher le formulaire.
 */
const affichageDuFormulaire = () => {
  const displayForm = document.querySelector("#container_basket");

  const formulaireHTML = `      
  <form class="card-body   border border-dark m-auto w-100">
    <h3 class="text-center  m-auto w-75">Remplissez les champs afin de validé votre commande:</h3>
    <div class="form-row d-flex flex-column justify-content-center">
      <div class="form-group col-md-6 m-auto">
        <label for="Name">Nom</label>
        <input type="text" class="form-control" id="name" placeholder="Votre Nom" required>
      </div>
      <div class="form-group col-md-6 m-auto">
        <label for="Prenom">Prenom</label>
        <input type="text" class="form-control" id="prenom" placeholder="Votre Prenom" required>
      </div>
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" placeholder="Email">
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="adress">Adresse de livraison</label>
      <input type="text" class="form-control" id="adress" placeholder="Avenue Leclerc" required>
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="ville">Ville</label>
      <input type="text" class="form-control" id="ville" placeholder="Paris">
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="codepostal">Code Postal</label>
      <input type="text" class="form-control" id="code_postal" placeholder="75000">
    </div>
    <div class="form-row col-md-2 m-auto mt-4">
      <button type="button" id="get_form_value" onClick="getFormValue()" class="btn btn-warning border border-dark ">validé vos coordonnés</button>
    </div>
  </form>
  `;
  // injection du html

  displayForm.insertAdjacentHTML("afterend", formulaireHTML);
};

affichageDuFormulaire();

/**
 * Récupération des données du formulaire.
 */
async function getFormValue() {
  // envoie des donnee dans le localStorage
  const formulaireValue = {
    firstName: document.querySelector("#prenom").value,
    lastName: document.querySelector("#name").value,
    address: document.querySelector("#adress").value,
    city: document.querySelector("#ville").value,
    email: document.querySelector("#email").value,
    codePostal: document.querySelector("#code_postal").value,
  };
  //----------------------------------------------------- Regex pour l'adress mail du formulaire ------------------------------------------------------
  const regexEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  function emailControle() {
    //controle de l'email
    const lEmail = formulaireValue.email;
    if (regexEmail(lEmail)) {
      return true;
    } else {
      alert("l'email n'es pas valide");
      return false;
    }
  }
  // on appel la function emailControle avant l'envoie au Local storage
  if (emailControle()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValue));
  } else {
    alert("veuillez bien remplir le formulaire");
  }
  /**
   * envoie de la commande avec la methode POST
   */
  const products = [];
  basket.forEach((product) => {
    products.push(product.id);
  });
  const order = {
    products,
    contact: formulaireValue,
  };
  console.log(order);

  const postAPI = await fetch(`http://localhost:3000/api/cameras/order/`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  });

  const resAPI = await postAPI.json();

  console.log(resAPI.orderId);
  localStorage.setItem("orderId", resAPI.orderId);
  if (emailControle()) {
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValue));
    window.location.replace(`./order.html`);
  } else {
    alert("veuillez bien remplir le formulaire");
  }
}
window.getFormValue = getFormValue;

// recuperation de la key formulaireValues dans le LS

const dataLocalStorage = localStorage.getItem("formulaireValues");

// convertir la chaine de caractere en objet JS

const dataLocalStorageObject = JSON.parse(dataLocalStorage);

// rediriger les value du LS dans les champs du formulaire

document.querySelector("#name").value = dataLocalStorageObject.lastName;
document.querySelector("#prenom").value = dataLocalStorageObject.firstName;
document.querySelector("#email").value = dataLocalStorageObject.email;
document.querySelector("#adress").value = dataLocalStorageObject.address;
document.querySelector("#ville").value = dataLocalStorageObject.city;
document.querySelector("#code_postal").value =
  dataLocalStorageObject.codePostal;
