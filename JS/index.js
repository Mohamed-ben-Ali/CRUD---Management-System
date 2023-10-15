let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCat = document.getElementById("productCat");
let productDesc = document.getElementById("productDesc");
let productList = [];

if (localStorage.getItem("List") != null) {
    productList = JSON.parse(localStorage.getItem("List"))
    // console.log(productList);
    displayProduct(productList);
} else {
    productList = [];
}


function AddProduct() {
    let product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        description: productDesc.value
    }
    productList.push(product);
    setToLocalStorage()
    displayProduct(productList);
    ClearForm();

}

function displayProduct(List) {
    let Box = ``;
    for (let i = 0; i < List.length; i++) {

        // console.log(List[i])
        Box += `  <tr>
        <td>${i + 1}</td>
        <td>${List[i].name}</td>
        <td>${List[i].price}</td>
        <td>${List[i].category}</td>
        <td>${List[i].description}</td>

        <td><button class="btn btn-warning onClick="getProductData(${i})">Update</button></td>
        <td><button class="btn btn-danger" onClick="deleteProduct(${i})">Delete</button></td>

    </tr>`
    }
    document.getElementById("tableData").innerHTML = Box // Add new row to table
}
function ClearForm() {
    productName.value = " ";
    productPrice.value = " ";
    productCat.value = " ";
    productDesc.value = " ";
}
function deleteProduct(index) {
    productList.splice(index, 1);
    // console.log(productList);
    displayProduct(productList);
    setToLocalStorage();
}
function setToLocalStorage() {
    localStorage.setItem("List", JSON.stringify(productList))
}

function getProductData(index) {
    console.log(index)
    console.log(productList[index])
}