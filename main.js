let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let mood = "create";
let tmp;
//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.innerHTML = result; 
        total.style.background = "#67b92e"
    }
    else{
        total.innerHTML = ' ';
        total.style.background = "#d32f2f";
    }

}
//create product
let dataPro;
if(localStorage.product != '') {
    dataPro = JSON.parse(localStorage.product);
}else dataPro = [];

create.onclick = function() {
    let newPro = {
        title: title.value.toUpperCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toUpperCase(),
    };
    //Count
    if(title.value != '' && category.value !=  '' && price.value != '' && count.value <= 1000){
        if(mood === "create") {
            if(newPro.count > 1) {
                for(let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }else {
                dataPro.push(newPro);
            } 
        }else {
            dataPro[tmp] = newPro;
            mood = "cearte";
            create.innerHTML = "Cearte";
            count.style.display = "block";
            getTotal();
        }
        //Clear Data
        clearData();
    }
    //save in local storage
    localStorage.setItem("product", JSON.stringify(dataPro));
    //Read Data
    showData();
}
//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value= '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
//reed input
function showData() {
    getTotal();
    let table = '';
    for(let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDlete = document.getElementById("deleteAll")
    if(dataPro.length > 0) {
        btnDlete.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else {
        btnDlete.innerHTML = '';
    }
}
showData();
//Delete Data
function deleteData(i){
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    //update Data After Deletion
    showData();
}
//Delete All
function deleteAll() {
    dataPro.splice(0);
    localStorage.product = JSON.stringify(dataPro);
    //update Data After Deletion
    showData();
}
//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    total.innerHTML = dataPro[i].total;
    category.value = dataPro[i].category;
    getTotal();
    create.innerHTML = "Update";
    count.style.display = "none";
    mood = "update";
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
//search
let searchMood = "Title";
function getSearchMood(id){
    let search = document.getElementById("search");
    if(id === "searchTitle"){
        searchMood = "Title";
    }else{
        searchMood = "Category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value){
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
    if(searchMood === "Title"){
        if(dataPro[i].title.includes(value.toUpperCase())) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
        }
    }else{
        if(dataPro[i].category.includes(value.toUpperCase())) {
            table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `
        }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
//clean data