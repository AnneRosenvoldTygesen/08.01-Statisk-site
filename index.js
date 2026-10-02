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
            <a href="productlist.html?category=${cat.category}" class="category_box">
             
                <span>${cat.category}</span>
            </a>`;
  });
  catList.innerHTML = myInnerHtml;
}
