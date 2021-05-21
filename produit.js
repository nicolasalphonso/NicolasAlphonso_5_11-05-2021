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

var id = recuperationParametreUrl("id");

var url = "http://localhost:3000/api/furniture/" + id;

fetch(url)
  .then((data) => data.json())
  .then((jsonFurniture) => {
    let furniture = new Furniture(jsonFurniture);
    document.getElementById(
      "affichageDuProduit"
    ).innerHTML += `<div class="row">
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
                        </div>
                    </div>
                    `;
    var listeDeroulante = document.getElementById("selectionVernis");
    for (let vernis in furniture.varnish) {
      listeDeroulante.innerHTML += `<option value="${furniture.varnish[vernis]}">${furniture.varnish[vernis]}</option>`;
    }
  });
