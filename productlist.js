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
    listContainer.innerHTML += `
    <article class="product ${product.soldout ? "soldout" : ""}">
                <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Image">

                <h3>${product.productdisplayname}</h3>
                <p>${product.brandname} - ${product.category}</p>
                <div>
                    <p>DKK 1500</p>
                </div>
                <p><a href="product.html">Read More</a></p>
                ${product.soldout ? " <p class='soldout_tag'>Sold Out</p>" : ""}
            </article>
`;
  });
}

getData(productUrl);
