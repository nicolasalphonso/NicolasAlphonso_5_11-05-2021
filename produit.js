// fonction de récupération de l'id dans les paramètres de l'URL
// source https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
function RecuperationIdUrl() {
  let params = new URL(document.location).searchParams;
  const id = params.get("id");
  return id;
}

// fonction pour ajouter un article au panier
function AjoutArticleProduit() {
  var panier = {};
  // si le panier n'existe pas, il faut le créer
  if (localStorage.getItem("Panier") === null) {
    // on crée l'entrée et on lui assigne une quantité de 1
    panier[id] = 1;
  }
  // si le panier existe
  else {
    //on transforme le panier en objet
    panier = JSON.parse(localStorage.getItem("Panier"));
    // si l'entrée existe ajouter 1 à la quantité
    // sinon on la crée et on lui assigne une quantité de 1
    if (panier[id] > 0) {
      panier[id] += 1;
    } else {
      panier[id] = 1;
    }
  }
  //On enregistre le panier dans le local storage
  localStorage.setItem("Panier", JSON.stringify(panier));
}

// fonction pour faire une requête si l'article n'est pas dans le local storage
function CheckProduitLocalStorage() {
  // si le produit n'existe pas dans le local storage
  // on le crée, sinon on va le chercher
  if (localStorage.getItem(id) == null) {
    var url = "http://localhost:3000/api/furniture/" + id;
    console.log(url);
    fetch(url)
      .then((data) => data.json())
      .then((jsonFurniture) => {
        furniture = jsonFurniture;
        localStorage.setItem(id, JSON.stringify(jsonFurniture));
      });
  } else {
    var furnitureJSON = localStorage.getItem(id);
    furniture = JSON.parse(furnitureJSON);
  }
}

// fonction de création de la liste déroulante
function ListeDeroulanteVernis() {
  var listeDeroulante = document.getElementById("selectionVernis");
  for (let vernis in furniture.varnish) {
    listeDeroulante.innerHTML += `<option value="${furniture.varnish[vernis]}">${furniture.varnish[vernis]}</option>`;
  }
}

//fonction d'affichage du produit
function AffichageProduitSeul() {
  document.getElementById("affichageDuProduit").innerHTML = `<div class="row">
  <div class="col-6">
      <img class="cardProduitSeul" src="${
        furniture.imageUrl
      }" alt="Photo du modèle ${furniture.name}"/>
  </div>
  <div class="col-6">
      <h2>${furniture.name}</h2>
      <p>${furniture.description}</p>
      <p>${(furniture.price / 100).toFixed(2).replace(".", ",")} €</p>
      <label for="selectionVernis">Vernis:</label>
      <form id="myForm">
          <select name="vernis" id="selectionVernis">
          <option value="">--Choisissez un vernis--</option>
          </select>
      </form>
      <a href="panier.html" class="btn btn-primary btnCommandeProduit" id="btnCommande" data-id=${
        furniture._id
      }>Ajouter au panier</a>
  </div>
</div>
`;
  document
    .getElementById("btnCommande")
    .addEventListener("click", AjoutArticleProduit);

  ListeDeroulanteVernis();
}
class Furniture {
  constructor(jsonFurniture) {
    jsonFurniture && Object.assign(this, jsonFurniture);
  }
}

/* Code principal */

let furniture = "";

// recuperation du paramètre id passé dans l'url
var id = RecuperationIdUrl();

// mise à jour du local storage
CheckProduitLocalStorage();

// affichage de la fiche produit
setTimeout(AffichageProduitSeul, 300);
