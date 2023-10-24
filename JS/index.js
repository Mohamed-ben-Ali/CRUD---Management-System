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
  if (validationProductName() && validatePrice() && validateCategory() && validateDescription() == true) {
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
  else { }
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

/* Start Validation */
function validationProductName() {
  let regex = /^[A-Z][a-z]{3,9}$/;
  if (regex.test(productName.value) == true) {
    document.getElementById("name-error").classList.add("d-none");
    return true;
  }
  else {
    document.getElementById("name-error").classList.remove("d-none");
    return false;
  }
}
function validatePrice() {
  let regex = /^(1000|10000|[1-9]\d{3})$/;
  if (regex.test(productPrice.value) == true) {
    document.getElementById("price-error").classList.add("d-none");
    return true;
  } else {
    document.getElementById("price-error").classList.remove("d-none");
    return false;
  }
}
function validateCategory() {
  let regex = /^(Mobile|TV|Laptop)$/i; // i flag for case-insensitive matching
  if (regex.test(productCat.value)) {
    // Valid category
    document.getElementById("category-error").classList.add("d-none");
    return true;
  } else {
    // Invalid category
    document.getElementById("category-error").classList.remove("d-none");
    return false;
  }
}

function validateDescription() {
  let regex = /^.{10,500}$/;
  if (regex.test(productDesc.value)) {
    document.getElementById("description-error").classList.add("d-none");
    return true;
  } else {
    document.getElementById("description-error").classList.remove("d-none");
    return false;
  }
}

/* End Validation */