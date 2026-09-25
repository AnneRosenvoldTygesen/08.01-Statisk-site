"use strict";

const productUrl = "https://kea-alt-del.dk/t7/api/products";
const listContainer = document.querySelector(".product_list_container");

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showProducts(data);
    });
  });
}

function showProducts(products) {
  console.log("First product", products[0]);
  console.log("First product", products.length);

  listContainer.innerHTML = ""; /***** sikrer at den er tom på siden */

  products.forEach((product) => {
    // let soldOutClass = "";

    // if (product.soldout) {

    //   soldOutClass = "soldout";
    // }

    listContainer.innerHTML += `
    <article class="product">
                <img src="img/produktview_sonja.webp" alt="Loafer Sonja">

                <h3>Sonja loafer</h3>
                <p>Loafers</p>
                <div>
                    <p>DKK 1500</p>
                </div>
                <p><a href="product.html">Read More</a></p>
                <p class="soldout_tag">Sold Out</p>
            </article>


`;
  });
}

getData(productUrl);
