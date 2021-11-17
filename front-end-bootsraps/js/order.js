/**
 * On vas chercher les information du local storage pour les injecters dans notre html
 */
const resumeOrder = () => {
  // variable pour recuperer les information
  const contactInLS = JSON.parse(localStorage.getItem("formulaireValues"));
  const orderId = JSON.stringify(localStorage.getItem("orderId"));
  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

  // on cible l'id dans le html pour y injecter les infos
  document.getElementById("text_container").innerHTML = `
    <div class="order-completed_container">
        <h2>Merci ${contactInLS.firstName} pour votre commande !!!</h2>
        <p>Vous recevrer un email de confirmation a " ${contactInLS.email} "</p>
        <p>votre numero de commande es: ${orderId}</p>
        <p>votre commande es d'un montant total de ${totalPrice}€</p>
        <div class="">
            <button type="button" id="submitOrder" onClick="returnToHome()" class="btn btn-warning border border-dark">Liste Produits</button>
        </div>
    </div>
  `;

  // supression du local storage apres l'injection du html
  localStorage.clear();
};
resumeOrder();

/**
 * retoune sur la page d'acceuil
 */
function returnToHome() {
  //alert pour remercier le client
  alert("Merci de votre commande a bientot");

  // retour a la page d'acceuil
  window.location.href = "http://127.0.0.1:5501/front-end-bootsraps/index.html";
}

window.returnToHome = returnToHome;
