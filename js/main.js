let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let notifications = document.querySelector(".notifications");
let mood = "create";
let tmp;
if (localStorage.getItem("mood") != null) {
  mood = JSON.parse(localStorage.mood);
} else {
  localStorage.setItem("mood", JSON.stringify(mood));
}
// update mood
function update() {
  if (mood !== "update") {
    return;
  }
  let dataPro = JSON.parse(localStorage.Product);
  let itemUpdate = localStorage.update;
  title.value = dataPro[itemUpdate].title;
  price.value = dataPro[itemUpdate].price;
  taxes.value = dataPro[itemUpdate].taxes;
  ads.value = dataPro[itemUpdate].ads;
  discount.value = dataPro[itemUpdate].discount;
  getTotal();
  count.value = dataPro[itemUpdate].count;
  category.value = dataPro[itemUpdate].category;
  submit.innerHTML = `Update`;
  tmp = itemUpdate;
}
update();
// get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = `${result}`;
    // total.style.background = `#040`;
    if (result > 0) total.style.background = `#040`;
    else total.style.background = `#a00d02`;
  } else {
    total.innerHTML = ``;
    total.style.background = `#a00d02`;
  }
}
// create product
let dataPro;
if (localStorage.getItem("Product") != null) {
  dataPro = JSON.parse(localStorage.Product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  let success = validateProduct(newPro);
  if (success) {
    if (mood === "create") {
      alertify.success("Success: A new item was created successfully");
      newPro.createdAt = TimeNow();
      dataPro.push(newPro);
    } else {
      alertify.success("Success: A item was updated successfully");
      newPro.updatedAt = TimeNow();
      newPro.createdAt = dataPro[tmp].createdAt;
      dataPro[tmp] = newPro;
      submit.innerHTML = "Create";
      count.style.display = "block";
      mood = "create";
      localStorage.setItem("mood", mood);
    }
    alertify.set("notifier", "position", "top-left");
    localStorage.setItem("Product", JSON.stringify(dataPro));
    clearData();
  }
};
// clear inputs
function clearData() {
  title.value = ``;
  price.value = ``;
  taxes.value = ``;
  ads.value = ``;
  discount.value = ``;
  total.innerHTML = ``;
  total.style.background = `#a00d02`;
  count.value = ``;
  category.value = ``;
}
function TimeNow() {
  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let hour = dateNow.getHours();
  let minute = dateNow.getMinutes();
  let second = dateNow.getSeconds();
  return `${year}/${month}/${day}  ${hour}:${minute}:${second}`;
}
// validation
function validateProduct(product) {
  let errors = {};
  if (product.title.trim() === "") {
    errors.title = "Error: you must enter title";
  }
  if (Number(product.price) <= 0) {
    errors.price = "Error: you must enter a valid price";
  }
  if (product.category.trim() === "") {
    errors.category = "Error: you must enter category";
  }
  if (Number(product.count) < 1) {
    errors.count = "Error: you must enter a count greater than 0";
  }

  const numberOfErrors = Object.keys(errors).length;

  if (numberOfErrors > 0) {
    showErrors(errors, numberOfErrors);
    return false;
  }

  return true;
}
function showErrors(errors, numberOfErrors) {
  for (let i = 0; i < numberOfErrors; i++) {
    alertify.error(errors[Object.keys(errors)[i]]);
    alertify.set("notifier", "position", "top-left");
  }
}
