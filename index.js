"use strict";

const productUrl = "https://kea-alt-del.dk/t7/api/categories";
const catList = document.querySelector(".category_list_container");
getData();

function getData() {
  fetch(productUrl).then((result) => result.json().then((data) => showData(data)));
}

function showData(data) {
  //   console.log(data);
  catList.innerHTML = "";
  let myInnerHtml = "";

  data.forEach((cat) => {
    console.log(cat.category);

    myInnerHtml += ` 
            <a href="productlist.html" class="category_box">
                <img src="img/forside_ballerina.webp" alt="Ballerinas">
                <span>${cat.category}</span>
            </a>`;
  });
  catList.innerHTML = myInnerHtml;
}
