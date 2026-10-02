"use strict";

const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

console.log("Selected category", selectedCategory);

let allData;

const categoryTitle = document.querySelector(".section_title_productlist");

categoryTitle.textContent = `Shop ${selectedCategory}`;

const productUrl = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=100`;

const listContainer = document.querySelector(".product_list_container");

getData(productUrl);

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      allData = data;

      console.log("DATA", data);

      showProducts(data);
    });
  });
}

document.querySelectorAll(".btn_container button[data-filter]").forEach((btn) => {
  console.log("For each", btn);

  btn.addEventListener("click", btnKlik);
});

function btnKlik(evt) {
  console.log("Knappen der er klikket på:", evt.target);

  console.log("Hvad er dataset:", evt.target.dataset.filter);

  console.log("allData", allData);

  document.querySelectorAll(".btn_container button[data-filter]").forEach((btn) => {
    btn.classList.remove("active_btn");
  });

  evt.target.classList.add("active_btn");

  const filteredArr = allData.filter((prod) => prod.gender === evt.target.dataset.filter);

  console.log("FILTERED ARRAY", filteredArr);

  /**** ALL virker ikke fordi der ikke er et filter i API der hedder all, derfor skal den kaldes ***/

  /*** betyder at HVIS du trykker på ALL så viser den allData  */
  if (evt.target.dataset.filter === "All") {
    showProducts(allData);
  } else {
    showProducts(filteredArr);
  }
}

document.querySelector("#sortPrice").addEventListener("click", sortByPrice);

function sortByPrice() {
  const sortedProducts = [...allData].sort((a, b) => {
    const priceA = a.discount ? getDiscountPrice(a.price, a.discount) : a.price;

    const priceB = b.discount ? getDiscountPrice(b.price, b.discount) : b.price;

    return priceA - priceB;
  });

  showProducts(sortedProducts);
}
// function sortByPrice() {
//   const sortedProducts = [...allData].sort((a, b) => a.price - b.price);

//   showProducts(sortedProducts);
// }
function showProducts(products) {
  console.log("First product", products[0]);
  console.log("First product", products.length);

  listContainer.innerHTML = "";

  products.forEach((product) => {
    listContainer.innerHTML += `<article class="product ${product.soldout ? "soldout" : ""}">
      
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Image">

      <h3>${product.productdisplayname}</h3>

      <p>${product.brandname} - ${product.category}</p>

      <div>
        ${product.discount ? "<p>" + getDiscountPrice(product.price, product.discount) + "kr </p>" : ""}

        <p>
          ${product.price} kr
          ${product.discount ? "<em> -" + product.discount + "%</em>" : ""}
        </p>
      </div>

      <p>
        <a href="product.html?id=${product.id}">Read More</a>
      </p>

      ${product.soldout ? "<p class='soldout_tag'>Sold Out</p>" : ""}

    </article>`;
  });
}

function getDiscountPrice(originalPrice, discount) {
  return Math.round((originalPrice * (100 - discount)) / 100);
}
