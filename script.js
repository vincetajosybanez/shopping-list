const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearBtn = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const items = itemList.querySelectorAll("li");
let isEditMode = false;
const formBtn = itemForm.querySelector(".btn");

const createElement = (type, classes = "", id = "", text = "") => {
  const element = document.createElement(type);
  element.className = classes;
  element.id = id;

  if (text) {
    const textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  return element;
};

// Get items from localStorage
const getItemsFromStorage = () => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
};

// Add item to localStorage
const addItemToStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  const itemsFromStorageJSON = JSON.stringify(itemsFromStorage);
  localStorage.setItem("items", itemsFromStorageJSON);
};

const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));

  checkUI();
};

// Add item to DOM
const addItemToDOM = (item) => {
  const li = document.createElement("li");

  const textNode = document.createTextNode(item);
  li.appendChild(textNode);

  const button = createElement("button", "remove-item btn-link text-red");
  const icon = createElement("i", "fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);

  // Append new list element to itemList
  itemList.appendChild(li);
};

// Create new list item
const onAddItemSubmit = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate input
  if (newItem === "") {
    alert("Please add an item");

    return;
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-demo");
    itemToEdit.remove();
    isEditMode = false;
  }

  if (checkItemExists(newItem)) {
    alert("Item already exists!");

    return;
  }

  // Create new list element
  addItemToDOM(newItem);

  // Add item to localStorage
  addItemToStorage(newItem);

  checkUI();

  // Clear item input
  itemInput.value = "";
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList
    .querySelectorAll("li")
    .forEach((item) => item.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkItemExists = (item) => {
  const itemsFromStorage = getItemsFromStorage();
  return itemsFromStorage.includes(item);
};

// Remove list item
const removeItem = (item) => {
  // const elementType = e.target.tagName;
  // if (elementType === "I") {

  if (confirm("Are you sure you want to delete?")) {
    item.remove();

    // Remove item from storage
    removeItemFromStorage(item.textContent);
  }

  checkUI();
};

// Remove item from storage
const removeItemFromStorage = (itemToDelete) => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter((item) => item !== itemToDelete);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

// Clear all list items
const clearItems = () => {
  if (confirm("Are you sure you want to delete?")) {
    // Triggers reparsing of the DOM internally, which might cause performance issues in large DOM trees
    // itemList.innerHTML = "";

    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    // Clear from localStorage
    localStorage.removeItem("items");

    checkUI();
  }
};

// Filter items
const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";

    itemInput.value = "";
    itemFilter.value = "";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
  formBtn.style.backgroundColor = "#333";
  isEditMode = false;
};

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
}

init();
checkUI();

/* localStorage.setItem("name", "Brad");
localStorage.removeItem("name");
localStorage.clear();
console.log(localStorage.getItem("name")); */
