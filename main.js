class Furniture {
    constructor(jsonFurniture) {
        jsonFurniture && Object.assign(this, jsonFurniture);
    }
}


fetch("http://localhost:3000/api/furniture")
.then ( data => data.json())
.then( jsonListFurniture => {
    for (let jsonFurniture of jsonListFurniture) {
        let furniture = new Furniture(jsonFurniture);
        document.getElementById("affichageDesFurnitures").innerHTML +=
                    `<article class="vignetteProduit">
                    <figure>
                        <img src="${furniture.imageUrl}" alt="Photo du modèle ${furniture.name}" class="image__vignetteProduit" />
                        <figcaption>
                            <h4 class="titre__vignetteProduit">${furniture.name}</h4>
                            <p class="description__vignetteProduit">${furniture.description}</p>
                            <p class="prix__vignetteProduit">${furniture.price} €</p>
                        </figcaption>
                    </figure>
                </article>
                    `;
    }
});