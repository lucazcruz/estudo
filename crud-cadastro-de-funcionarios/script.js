const includeButton = document.querySelector("#include-button");
const modal = document.querySelector(".modal-container");

const iName = document.querySelector("#iName");
const iFunction = document.querySelector("#iFunction");
const iSalario = document.querySelector("#iSalario");
const saveButton = document.querySelector("#save-button");

const tbody = document.querySelector("tbody");

let items;
let id;

const getItemsDB = () => JSON.parse(localStorage.getItem("data")) ?? [];
const setItemsDB = () => localStorage.setItem("data", JSON.stringify(items));

function deleteItem(index) {
  items.splice(index, 1)
  setItemsDB();
  loadItems();
}

function editItem(index) {
  openModal(true, index)
}

function insertItems(item, index) {
  const tr = document.createElement("tr");

  tr.innerHTML= `
    <td>${item.name}</td>
    <td>${item.function}</td>
    <td>${item.salario}</td>
    <td class="action">
      <button onClick="editItem(${index})"><i class="bx bx-edit"></i></button>
    </td>
    <td class="action">
      <button onClick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

function loadItems() {
  items = getItemsDB();
  tbody.innerHTML= "";
  items.forEach((item, index) => {
    insertItems(item, index)
  });
}

function openModal(edit = false, index = 0) {
  modal.classList.add("open")

  modal.onclick = e => {
    if (e.target.classList.contains("modal-container")) {
      modal.classList.remove("open")
    }
  }

  if (edit) {
    iName.value = items[index].name;
    iFunction.value = items[index].function;
    iSalario.value = items[index].salario;
    id = index;
  } else {
    iName.value = ""
    iFunction.value = ""
    iSalario.value = ""
  }
}

function saveItem(e) {
  if (iName.value == "" || iFunction == "" || iSalario == "") {
    return
  }
  e.preventDefault()

  if (id !== undefined) {
    items[id].name = iName.value;
    items[id].function = iFunction.value;
    items[id].salario = iSalario.value;
  } else {
    items.push({ "name": iName.value, "function": iFunction.value, "salario": iSalario.value });
  }

  modal.classList.remove("open")
  setItemsDB();
  loadItems();
  id = undefined;
}

loadItems();
saveButton.addEventListener("click", saveItem);
