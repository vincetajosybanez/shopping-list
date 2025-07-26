const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

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

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate input
  if (newItem === "") {
    alert("Please add an item");

    return;
  }

  // Create new list item
  const li = document.createElement("li");

  const textNode = document.createTextNode(newItem);
  li.appendChild(textNode);

  const button = createElement("button", "remove-item btn-link text-red");
  const icon = createElement("i", "fa-solid fa-xmark");
  button.appendChild(icon);
  li.appendChild(button);

  // Append new list item to itemList
  itemList.appendChild(li);

  // Clear item input
  itemInput.value = "";
};

// Event Listeners
itemForm.addEventListener("submit", addItem);
