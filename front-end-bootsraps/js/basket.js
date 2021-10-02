import { numberItemInTheBasket } from "./nuberItems.js";

//****************************************on recupere les info du local storage avec le methode get et fetch ****************//

const basket = JSON.parse(localStorage.getItem("basket"));
const getCameraInfo = async (id) => {
  const response = await fetch(`http://localhost:3000/api/cameras/${id}`);

  return response.json();
};

//**********************************************************************************************************************************//

//************************************  on l' affiche ensuite*******************************************************************//

const displayBasket = async () => {
  const displayItems = document.querySelector("#container_basket");

  // ****************************************message si le panier es vide***********************************************************//

  if (basket === null) {
    const emptyBasket = `    
  <div class="empty_basket d-flex justify-content-center">
    <h2 class="empty_basket-text ">Votre panier es vide.</br><i class="far fa-sad-tear d-flex justify-content-center"></i></h2>
  </div>
  `;
    return (displayItems.innerHTML = emptyBasket);
  }
  //****************************************************************************************************************************************
  //*******************************************si il y as des items dans le local storage  ********************************************//
  let itemInTheBasket = [];

  for (let item of basket) {
    const itemInfo = await getCameraInfo(item.id);
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
  //-----------------------------------------------btn pour vider le panier (dans la fonction displayBasket)------------------------------------------------------------

  // code du btn supprimer

  const btnClearBasket = `<button onClick="clearBasket()" id="clear_basket_btn" class="btn btn-warning d-flex justify-content-center m-auto mb-2 w-25 border border-dark">Vider votre panier</button>`;

  //insert le boutton dans mon html

  displayItems.insertAdjacentHTML("beforeend", btnClearBasket);

  //------------------------------------------------------------------------------------------------------------------------------------
};

displayBasket();
//***********************************************************************************************************************************//

//---------------------------------------------fonction pour le onClick du btn "vider le panier "-----------------------------------------
function clearBasket() {
  //.remove item pour enlever la clef dans le LS
  localStorage.removeItem("basket");

  //alert pour informer le client
  alert("votre panier es maintenant vide");

  // rafraichir la page panier
  window.location.href =
    "http://127.0.0.1:5501/front-end-bootsraps/basket.html";
}
window.clearBasket = clearBasket;

//***********************************************************calcul du montant total des prix ajouter au localstorage******//
// vatiable prix total du panier

//  faire une boucle qui vas chercher les prix

//********************************************************************************************************************************** */

//----------------------------------------------- afficher le nombre de items dans la basket----------------------------

numberItemInTheBasket();

//-------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------AFFICHER LE FORMULAIRE HTML---------------------------------------------------------------------

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
      <input type="email" class="form-control" id="email" placeholder="Email" required>
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="adress">Adresse de livraison</label>
      <input type="text" class="form-control" id="adress" placeholder="Avenue Leclerc">
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="ville">Ville</label>
      <input type="text" class="form-control" id="ville" placeholder="Paris"required>
    </div>
    <div class="form-row col-md-6 m-auto">
      <label for="codepostal">Code Postal</label>
      <input type="text" class="form-control" id="code_postal" placeholder="75000" required>
    </div>
    <div class="form-row col-md-2 m-auto mt-4">
      <button type="submit" id="get_form_value" onClick="getFormValue()" class="btn btn-primary ">validé votre commande</button>
    </div>
  </form>
  `;
  // injection du html

  displayForm.insertAdjacentHTML("afterend", formulaireHTML);
};
affichageDuFormulaire();
console.log(document.querySelector("#get_form_value"));
//----------------------------------- Recuperation des donner du formulaire -------------------------------

function getFormValue() {
  // envoie des donnee dans le localStorage
  const formulaireValue = {
    Nom: document.querySelector("#name").value,
    Prenom: document.querySelector("#prenom").value,
    Email: document.querySelector("#email").value,
    Adress: document.querySelector("#adress").value,
    Ville: document.querySelector("#ville").value,
    CodePostal: document.querySelector("#code_postal").value,
  };
  localStorage.setItem("formulaireValues", JSON.stringify(formulaireValue));

  const aEnvoyer = {
    basket,
    formulaireValue,
  };

  console.log(aEnvoyer);
}

window.getFormValue = getFormValue;
//----------------------------------------------------------------------------------------------------------------------------------

//-------------------------------------------recuperer les infos du LS pour qu'il reste dans les champs utilisateur ------------------

// recuperation de la key formulaireValues dans le LS

const dataLocalStorage = localStorage.getItem("formulaireValues");

// convertir la chaine de caractere en objet JS

const dataLocalStorageObject = JSON.parse(dataLocalStorage);

// rediriger les value du LS dans les champs du formulaire

document.querySelector("#name").value = dataLocalStorageObject.Nom;
document.querySelector("#prenom").value = dataLocalStorageObject.Prenom;
document.querySelector("#email").value = dataLocalStorageObject.Email;
document.querySelector("#adress").value = dataLocalStorageObject.Adress;
document.querySelector("#ville").value = dataLocalStorageObject.Ville;
document.querySelector("#code_postal").value =
  dataLocalStorageObject.CodePostal;

//--------------------------------------------------------------------------------------------------------
