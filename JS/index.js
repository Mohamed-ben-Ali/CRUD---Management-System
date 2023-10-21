let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCat = document.getElementById("productCat");
let productDesc = document.getElementById("productDesc");
let productList = [];
let mainBut = document.getElementById("mainBut");
let updateBut = document.getElementById("updateBut"); // Add this line to get the update button

if (localStorage.getItem("List") != null) {
  productList = JSON.parse(localStorage.getItem("List"));
  displayProduct(productList);
} else {
  productList = [];
}

function AddProduct() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    category: productCat.value,
    description: productDesc.value,
  };
  productList.push(product);
  setToLocalStorage();
  displayProduct(productList);
  ClearForm();
}
//Display data in the table
function displayProduct(List) {
  let Box = ``;
  for (let i = 0; i < List.length; i++) {
    Box += `  <tr>
        <td>${i + 1}</td>
        <td>${List[i].name}</td>
        <td>${List[i].price}</td>
        <td>${List[i].category}</td>
        <td>${List[i].description}</td>
        <td><button class="btn btn-warning" onClick="retriveProductData(${i})">Update</button></td>
        <td><button class="btn btn-danger" onClick="deleteProduct(${i})">Delete</button></td>
    </tr>`;
  }
  document.getElementById("tableData").innerHTML = Box;
}
/*
Clear data after clicking the addProduct button, I have used the ternary operator so when I click the update button
it retrieves the existing data in the form to update it.
*/
function ClearForm(flag) {
  productName.value = flag ? flag.name : "";
  productPrice.value = flag ? flag.price : "";
  productCat.value = flag ? flag.category : "";
  productDesc.value = flag ? flag.description : "";
  mainBut.classList.remove("d-none");
  updateBut.classList.add("d-none");
}
/*  Delete Function   */
function deleteProduct(index) {
  productList.splice(index, 1);
  displayProduct(productList);
  setToLocalStorage();
  ClearForm(); // Clear the form after deleting a product
}
/*  Set data to localStorage */
function setToLocalStorage() {
  localStorage.setItem("List", JSON.stringify(productList));
}

function retriveProductData(index) {
  ClearForm(productList[index]);
  mainBut.classList.add("d-none");
  updateBut.classList.remove("d-none");

  updateBut.addEventListener("click", function () {
    productList[index] = {
      name: productName.value,
      price: productPrice.value,
      category: productCat.value,
      description: productDesc.value,
    };
    
    setToLocalStorage();
    displayProduct(productList);
    ClearForm();
  });
}

function search() {
  let searchList = [];
  let searchKey = document.getElementById('SearchVal').value;
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(searchKey.toLowerCase())) {
      searchList.push(productList[i]);
    }
  }
  displayProduct(searchList);
}
