let body = document.querySelector("body");
let addInfoTable = document.querySelector(".outputs table tbody");
let moodSearch = "title";

let dataPro;
if (localStorage.getItem("Product") != null) {
  dataPro = JSON.parse(localStorage.Product);
} else {
  dataPro = [];
}
showData();
function showData() {
  let table = "";
  if (dataPro.length === 0) {
    addInfoTable.innerHTML = table;
    document.getElementById("deletall").innerHTML = "";
    return;
  }
  for (let i = 0; i < dataPro.length; i++) {
    table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].count}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})" class="update">Update</button></td>
                <td><button onclick = "sellItem(${i})" class="sell">Sell</button></td>
                <td><button onclick = "deleteItem(${i})" >Delete</button></td>
              </tr>
        `;
  }
  addInfoTable.innerHTML = table;
  document.getElementById(
    "deletall"
  ).innerHTML = `<button onclick = "deleteAllData()" id="delet">Delet All(${dataPro.length})</button>`;
}
// Sell Data
function sellItem(i) {
  if (dataPro[i].count == 1 || dataPro[i].count < 1) {
    alertify.warning(`this product (${dataPro[i].title}) is'nt avilable now`);
    dataPro.splice(i, 1);
    localStorage.setItem("Product", JSON.stringify(dataPro));
    showData();
  } else {
    dataPro[i].count--;
    localStorage.setItem("Product", JSON.stringify(dataPro));
    showData();
    alertify.success(
      `A piece of this product (${dataPro[i].title}) has been successfully sold`
    );
  }
  alertify.set("notifier", "position", "top-left");
}
// Delete All
function deleteItem(i) {
  alertify.defaults.glossary.ok = "delete";
  alertify.defaults.theme.ok = "btn-remove";
  alertify.confirm(
    "Delete item",
    `Do you want to delete ${dataPro[i].title}`,
    function () {
      dataPro.splice(i, 1);

      localStorage.setItem("Product", JSON.stringify(dataPro));
      showData();
      alertify.success("Removed Success");
    },
    function () {
      alertify.error("Cancel Remove");
    }
  );
  alertify.set("notifier", "position", "top-left");
}
function deleteAllData() {
  alertify.confirm(
    "Delete item",
    `Do you want to delete All data`,
    function () {
      dataPro.splice(0);
      localStorage.setItem("Product", JSON.stringify(dataPro));
      showData();
      alertify.success("Removed Success");
    },
    function () {
      alertify.error("Cancel Remove All");
    }
  );
  alertify.set("notifier", "position", "top-left");
}
// search
function getSearchMood(id) {
  if (id === "searchtitle") {
    moodSearch = "title";
  } else {
    moodSearch = "category";
  }
  search.focus();
  search.value = "";
  showData();
  search.setAttribute("placeholder", `search by ${moodSearch}`);
}
function serachData(value) {
  let table = ``;
  if (moodSearch === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (
        dataPro[i].title
          .toLocaleLowerCase()
          .includes(`${value.toLocaleLowerCase()}`)
      ) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" class="update">Update</button></td>
                        <td><button onclick = "sellItem(${i})" class="sell">Sell</button></td>
                        <td><button onclick = "deleteItem(${i})" >Delete</button></td>
                    </tr>
                `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (
        dataPro[i].category
          .toLocaleLowerCase()
          .includes(`${value.toLocaleLowerCase()}`)
      ) {
        table += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" class="update">Update</button></td>
                        <td><button onclick = "sellItem(${i})" class="sell">Sell</button></td>
                        <td><button onclick = "deleteItem(${i})" >Delete</button></td>
                    </tr>
                `;
      }
    }
  }
  addInfoTable.innerHTML = table;
}
// update
function updateData(i) {
  localStorage.setItem("mood", "update");
  localStorage.setItem("update", JSON.stringify(i));
  window.location.href = "index.html";
}
