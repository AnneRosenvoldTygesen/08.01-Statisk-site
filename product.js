"use strict";

const params = new URLSearchParams(window.location.search);
const selectedId = params.get("id");

console.log("Selected ID", selectedId);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedId}`;
console.log("detailURL", detailURL);

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(detail) {
  console.log("Detail", detail);

  document.querySelector(".product_image").src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;

  document.querySelector(".detail_model").innerHTML = detail.productdisplayname;

  document.querySelector(".detail_color").innerHTML = detail.basecolour;

  document.querySelector(".detail_description").innerHTML = detail.description;
}

loadData(detailURL);
