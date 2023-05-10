let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchtitle");
let searchCatigory = document.getElementById("searchcatigory");
let addInfoTable = document.querySelector("table tbody");
let mood = 'create';
let tmp;
let moodSearch = 'title';
// get Total
function getTotal(){
    if (price.value !="") {
        let result =  +price.value + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = `${result}`;
        total.style.background = `#040`;
    }else{
        total.innerHTML = ``;
        total.style.background = `#a00d02`
    }
}
// create product
let dataPro;
if (localStorage.getItem("Product") != null) {
    dataPro = JSON.parse(localStorage.Product)
}else{
    dataPro = [];
}
showData()
submit.onclick = function(){
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value
    }
    if (mood === 'create') {
        // count
        if (newPro.count > 1) {
            for(let i=0;i<newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
        // end count
    }else{
        dataPro[tmp] = newPro;
        submit.innerHTML = 'Create';
        mood = 'create';
        count.style.display = 'block'
    }
    localStorage.setItem("Product",JSON.stringify(dataPro))
    clearData();
    showData();
}
// clear inputs
function clearData(){
    title.value = ``;
    price.value = ``;
    taxes.value = ``;
    ads.value = ``;
    discount.value = ``;
    total.innerHTML = ``
    total.style.background = `#a00d02`;
    count.value = ``;
    category.value = ``;
}
// Read product
function showData(){
    let table = "";
    for(let i=0;i<dataPro.length;i++){
        table +=
        `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteData(${i})" id="delet">Delet</button></td>
            </tr>
        `
        ;
    }
    addInfoTable.innerHTML = table;
    if (dataPro.length > 0) {
        document.getElementById("deletall").innerHTML = `
        <button onclick = "deleteAllData()" id="delet">Delet All(${dataPro.length})</button>
        `
    }else{
        document.getElementById("deletall").innerHTML =""
    }
}
// Delete Data
function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.setItem("Product",JSON.stringify(dataPro))
    showData()
}
// Delete All
function deleteAllData(){
    dataPro.splice(0);
    localStorage.setItem("Product",JSON.stringify(dataPro));
    showData();
}
// update
function updateData(i){
    title.value =   dataPro[i].title;
    price.value =   dataPro[i].price;
    taxes.value =   dataPro[i].taxes;
    ads.value =   dataPro[i].ads;
    discount.value =   dataPro[i].discount;
    getTotal();
    category.value =   dataPro[i].category;
    submit.innerHTML = `Update`;
    count.style.display = 'none';
    tmp = i;
    mood = 'update';
    scroll({
        top:0,
        behavior:"smooth"
    })
}
// search
function getSearchMood(id){
    if (id === "searchtitle") {
        moodSearch = "title"
    }else{
        moodSearch = "category"
    }
    search.focus();
    search.value='';
    showData();
    search.setAttribute("placeholder",`search by ${moodSearch}`)
}
function serachData(value){
    let table = ``;
    if (moodSearch === 'title') {
        for(let i=0;i<dataPro.length;i++){
            if (dataPro[i].title.toLocaleLowerCase().includes(`${value.toLocaleLowerCase()}`)) {
                table +=
                `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delet">Delet</button></td>
                    </tr>
                `;
            }
        }
    }else{
        for(let i=0;i<dataPro.length;i++){
            if (dataPro[i].category.toLocaleLowerCase().includes(`${value.toLocaleLowerCase()}`)) {
                table +=
                `
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delet">Delet</button></td>
                    </tr>
                `;
            }
        }
    }
    addInfoTable.innerHTML = table;
}