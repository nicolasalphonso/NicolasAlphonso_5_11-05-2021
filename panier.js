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
  
    localStorage.setItem("Panier",JSON.stringify(panier));
  }
  class Furniture {
    constructor(jsonFurniture) {
      jsonFurniture && Object.assign(this, jsonFurniture);
    }
  }
   
  let furniture = ""
  
  // affichage de chaque produit avec sa quantité
  panier = JSON.parse(localStorage.getItem("Panier"));
  produitsPanier = Object.keys(panier);
  for (let produit in produitsPanier) {
    var furnitureJSON = localStorage.getItem(produitsPanier[produit]);
    furniture = JSON.parse(furnitureJSON);
    document.getElementById("affichageProduitPanier").innerHTML +=
    `<div class="row articlePanier">
          <hr />
          <div class="col-3">
            <img src="${
                furniture.imageUrl
              }" class="imagePanier" />
          </div>
          <div class="col-8">
            <div class="row">
              <h3>${furniture.name}</h3>
              <p class="text-success">En stock</p>
              <p>Style : unique</p>
              <!--<p>Vernis : Oak</p>-->
            </div>
            <div class="row">
              <p>
                <label for="quantitéArticle">Qté:</label>
                <i class="bi bi-dash-circle"></i>
                <input
                  type="number"
                  id="quantitéArticle"
                  name="quantitéArticle"
                  min="1"
                  max="10"
                  value=${panier[produitsPanier[produit]]}
                />
                <i class="bi bi-plus-circle"></i>
                |
                <button type="button" class="btn btn-danger">Supprimer</button>
              </p>
            </div>
          </div>
          <div class="col-1">
            <p>${(furniture.price / 100)
                .toFixed(2)
                .replace(".", ",")} €</p>
          </div>
        </div>`
      console.log(produitsPanier[produit], panier[produitsPanier[produit]]);
  }
  
  /*  
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
                          <a href="panier.html" class="btn btn-primary btnCommandeProduit" data-id=${
                          furniture._id
                          }>Commander</a>
                          <button class="btn btn-danger"  id="btnCommande">
                      </div>
                  </div>
  `;
  // création de la liste déroulante
  var listeDeroulante = document.getElementById("selectionVernis");
      for (let vernis in furniture.varnish) {
        listeDeroulante.innerHTML += `<option value="${furniture.varnish[vernis]}">${furniture.varnish[vernis]}</option>`;
      }
  
  document.getElementById("btnCommande").addEventListener("click", ajoutArticle);
  
  
;
  
  // Un clic sur le bouton déclenche l'ajout de l'article au panier
  
  
  */
  
  