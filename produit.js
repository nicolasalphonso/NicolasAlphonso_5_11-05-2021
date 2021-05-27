//fonction pour récupérer le ou les paramètres dans l'adresse
function recuperationParametreUrl(param) {
  var vars = {};
  window.location.href.replace(location.hash, "").replace(
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function (m, key, value) {
      // callback
      vars[key] = value !== undefined ? value : "";
    }
  );

  if (param) {
    return vars[param] ? vars[param] : null;
  }
  return vars;
}

// fonction pour ajouter un article au panier
function ajoutArticle() {
  var panier = {};
  // si le panier n'existe pas, il faut le créer
  if (localStorage.getItem("Panier") === null) {
    panier[id] = 1;

  }
  // si le panier existe
  else {
    //on transforme le panier en dictionnaire
    panier = JSON.parse(localStorage.getItem("Panier"));
    // si l'entrée existe ajouter 1 à la quantité
    // sinon on la crée et on lui assigne une quantité de 1
    if (panier[id] > 0) {
      panier[id] += 1;
    } else {
      panier[id] = 1;
    }


  }

  localStorage.setItem("Panier", JSON.stringify(panier));
}
class Furniture {
  constructor(jsonFurniture) {
    jsonFurniture && Object.assign(this, jsonFurniture);
  }
}



// recuperation du paramètre id passé dans l'url
var id = recuperationParametreUrl("id");

let furniture = ""

// si le produit n'existe pas dans le local storage
// on le crée, sinon on va le chercher
if ((localStorage.getItem(id)) == null) {
  var url = "http://localhost:3000/api/furniture/" + id;
  console.log(url);
  fetch(url)
    .then(data => data.json())
    .then(jsonFurniture => {
      furniture = jsonFurniture;
      localStorage.setItem(id, JSON.stringify(jsonFurniture));
    })
} else {
  var furnitureJSON = localStorage.getItem(id);
  furniture = JSON.parse(furnitureJSON);
}

// affichage du produit dans la page
// une liste déroulante vide est créée
setTimeout(function () {
  document.getElementById("affichageDuProduit").innerHTML =
    `<div class="row">
                    <div class="col-6">
                        <img class="cardProduitSeul" src="${furniture.imageUrl
    }" alt="Photo du modèle ${furniture.name}"/>
                    </div>
                    <div class="col-6">
                        <h2>${furniture.name}</h2>
                        <p>${furniture.description}</p>
                        <p>${(furniture.price / 100)
      .toFixed(2)
      .replace(".", ",")} €</p>
                        <label for="selectionVernis">Vernis:</label>
                        <form id="myForm">
                            <select name="vernis" id="selectionVernis">
                            <option value="">--Choisissez un vernis--</option>
                            </select>
                        </form>
                        <a href="panier.html" class="btn btn-primary btnCommandeProduit" id="btnCommande" data-id=${furniture._id
    }>Ajouter au panier</a>
                    </div>
                </div>
`;
  // création de la liste déroulante
  var listeDeroulante = document.getElementById("selectionVernis");
  for (let vernis in furniture.varnish) {
    listeDeroulante.innerHTML += `<option value="${furniture.varnish[vernis]}">${furniture.varnish[vernis]}</option>`;
  }

  document.getElementById("btnCommande").addEventListener("click", ajoutArticle);


}, 300);




