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
        document.getElementById("tm-gallery-page-pizza").innerHTML +=
                    `<article class="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item">
                    <figure>
                        <img src="${furniture.imageUrl}" alt="Photo de la ${furniture.name}" class="img-fluid tm-gallery-img" />
                        <figcaption>
                            <h4 class="tm-gallery-title">${furniture.name}</h4>
                            <p class="tm-gallery-description">${furniture.description}</p>
                            <p class="tm-gallery-price">${furniture.price} €</p>
                        </figcaption>
                    </figure>
                </article>
                    `;
    }
});