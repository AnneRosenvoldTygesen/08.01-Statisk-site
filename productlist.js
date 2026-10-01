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

document.querySelectorAll(".btn_container button").forEach((btn) => {
  console.log("For each", btn);

  btn.addEventListener("click", btnKlik);
});

function btnKlik(evt) {
  console.log("Knappen der er klikket på:", evt.target);

  console.log("Hvad er dataset:", evt.target.dataset.filter);

  console.log("allData", allData);

  document.querySelectorAll(".btn_container button").forEach((btn) => {
    btn.classList.remove("active_btn");
  });

  evt.target.classList.add("active_btn");

  const filteredArr = allData.filter((prod) => prod.gender === evt.target.dataset.filter);

  console.log("FILTERED ARRAY", filteredArr);

  if (evt.target.dataset.filter === "All") {
    showProducts(allData);
  } else {
    showProducts(filteredArr);
  }
}

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

// "use strict";

// const params = new URLSearchParams(window.location.search);
// const selectedCategory = params.get("category");

// console.log("Selected category", selectedCategory);

// let allData;

// const categoryTitle = document.querySelector(".section_title_productlist");

// categoryTitle.textContent = `Shop ${selectedCategory}`;

// const productUrl = `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}&limit=100`;
// const listContainer = document.querySelector(".product_list_container");
// getData(productUrl);
// function getData(url) {
//   fetch(url).then((response) => {
//     response.json().then((data) => {
//       allData = data;
//       console.log("DATA", data);
//       showProducts(data);
//     });
//   });
// }

// document.querySelectorAll(".btn_container button").forEach((btn) => {
//   console.log("For each", btn);
//   btn.addEventListener("click", btnKlik);
// });
// function btnKlik(evt) {
//   console.log("Knappen der er klikket på:", evt.target);
//   console.log("Hvad er dataset:", evt.target.dataset.filter);

//   // document.querySelectorAll(".btn_container button").forEach((btn) => {
//   //   console.log("For each", btn);
//   //   btn.classList = "";
//   // });
//   console.log("allData", allData);

//   // evt.target.classList.add("active_btn");
//   // console.log("prod.category", prod.category);
//   const filteredArr = allData.filter((prod) => prod.season === evt.target.dataset.filter);
//   console.log("FILTERED ARRAY", filteredArr);
//   showProducts(filteredArr);
//   // if (evt.target.dataset.filter === "All") {
//   //   // showCars(allData);
//   // } else {
//   //   // showCars(filteredArr);
//   // }
// }

// function showProducts(products) {
//   console.log("First product", products[0]);
//   console.log("First product", products.length);

//   listContainer.innerHTML = ""; /***** sikrer at den er tom på siden */

//   products.forEach((product) => {
//     listContainer.innerHTML += `<article class="product ${product.soldout ? "soldout" : ""}">
//                 <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Image">

//                 <h3>${product.productdisplayname}</h3>
//                 <p>${product.brandname} - ${product.category}</p>
//                 <div>
//             ${product.discount ? "<p class='discount_tag'>" + getDiscountPrice(product.price, product.discount) + "kr </p>" : ""}
//             <p>${product.price} kr ${product.discount ? "<em> -" + product.discount + "%<em/>" : ""}</p>
//           </div>
//                 <p><a href="product.html?id=${product.id}">Read More</a></p>
//                 ${product.soldout ? " <p class='soldout_tag'>Sold Out</p>" : ""}
//             </article>`;
//   });
// }

// // getData(`${productUrl}?category=${category}`);

// function getDiscountPrice(originalPrice, discount) {
//   return Math.round((originalPrice * (100 - discount)) / 100);
// }
