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
  .then ( data => data.json())
  .then( jsonFurniture => {
      furniture = jsonFurniture;
      localStorage.setItem(id, JSON.stringify(jsonFurniture));
      })
} else {
  var furnitureJSON = localStorage.getItem(id);
  furniture = JSON.parse(furnitureJSON);
}

// affichage du produit dans la page
// une liste déroulante vide est créée
setTimeout(function(){ document.getElementById("affichageDuProduit").innerHTML = 
`<div class="row">
                    <div class="col-6">
                        <img class="cardProduitSeul" src="${
                          furniture.imageUrl
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
                        <a href="panier.html?${
                          furniture._id
                        }" class="btn btn-primary btnCommandeProduit" data-id=${
  furniture._id
}>Commander</a>
                    </div>
                </div>
`;
// création de la liste déroulante
var listeDeroulante = document.getElementById("selectionVernis");
    for (let vernis in furniture.varnish) {
      listeDeroulante.innerHTML += `<option value="${furniture.varnish[vernis]}">${furniture.varnish[vernis]}</option>`;
    }
}, 300);

