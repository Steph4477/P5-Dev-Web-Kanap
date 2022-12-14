let produitsLs = JSON.parse(localStorage.getItem("tickets"));
let productsFromApi = []

if (!produitsLs) {
  const titleCart = document.querySelector("h1");
  const sectionCart = document.querySelector(".cart");
  titleCart.innerHTML = "Votre panier est vide !";
  sectionCart.style.display = "none";
}
else {
  Panier();
}

function Panier() {
  document
    .getElementById("cart__items")
    .innerHTML = ``
  fetch("http://localhost:3000/api/products")
  //Récupère les valeurs de l'API et les retournent en json
  .then((res) => res.json())
  //Retourne les produits de l'api
  .then(function(api) {
    productsFromApi = api
    console.log(produitsLs)
    produitsLs.forEach(function(tickets) {
      // Je rentre une variable qui va chercher un produit(objet) dans l'api si son ._id coresspond à un .id du panier.
      let produitsApi = api.find((produits) => {
        return produits._id === tickets.id       
      })   
      document.getElementById("cart__items")
      // Je remplie le panier avec le locale storage si je n'ai pas l'info je cherche dans l'api.
      .innerHTML += `<article class="cart__item" data-id="${tickets.id}" data-color="${tickets.couleur}">
                      <div class="cart__item__img">
                        <img src="${produitsApi.imageUrl}" alt="${produitsApi.altTxt}">
                      </div>
                      <div class="cart__item__content">
                        <div class="cart__item__content__description">
                          <h2>${tickets.name}</h2>
                          <p>${tickets.couleur}</p>
                          <p>${produitsApi.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                          <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tickets.quantite}">
                          </div>
                          <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                          </div>
                        </div>
                      </div>
                    </article>`
      calculTotal()
    })  
  })
  //Retourne une erreur dans la console
  .catch((error) => {
    console.log(error)
  })
}

function calculTotal () {
  // Récupération du total des quantités
  quantite = 0
  produitsLs.forEach(function(produit) {
    let produitQuantite = produit.quantite
    quantite += produitQuantite
    prixTotal = 0
  })
  document.getElementById ("totalQuantity")
  .innerHTML = quantite
  
  // Récupération du prix total
  let itemQuantity = document.getElementsByClassName('itemQuantity');
  let itemQuantityLength = itemQuantity.length,
  totalPrice = 0;
  for (var i = 0; i < itemQuantityLength; ++i) {
    totalPrice += (itemQuantity[i].value * produitsLs[i].prix);
  }
  document.getElementById('totalPrice')
  .innerHTML = totalPrice;
  console.log(totalPrice);
}
 

  


