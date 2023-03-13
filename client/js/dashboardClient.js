"use strict";

let cards = document.querySelector(".section");
const cardBody = document.querySelector(".medicine");
const inputName = document.querySelector(".input-name");
const inputDose = document.querySelector(".input-dose");
const inputDescription = document.querySelector(".input-description");
const inputExpiration = document.querySelector(".input-expiration");
const inputPieces = document.querySelector(".input-pieces");
const addMedicine = document.querySelector(".btn-submit");

async function deleteMedication(id) {
  console.log(id);
  let res = await axios.delete(`http://localhost:8000/api/medication/${id}`);
  console.log(res);
  await getMedication();
}

async function getMedication() {
  const res = await axios.get("http://localhost:8000/api/medication");
  showMedicine(res.data.data);
  addMedicine.addEventListener("click", addMedication);
}

async function updateMedication() {
  const id = document.getElementById("exampleModal").dataset.medicationId;
  const updatedMedication = {
    name: document.getElementById("floatingName").value,
    dose: document.getElementById("floatingDose").value,
    description: document.getElementById("floatingDescription").value,
    expirationDate: document.getElementById("floatingExpiration").value,
    pieces: document.getElementById("floatingPieces").value,
  };
  let res = await axios.put(
    `http://localhost:8000/api/medication/${id}`,
    updatedMedication
  );
  console.log(res);
  await getMedication();
}

function editMedication(item) {
  const parsedItem = JSON.parse(decodeURIComponent(item));
  document.getElementById("floatingName").value = parsedItem.name;
  document.getElementById("floatingDose").value = parsedItem.dose;
  document.getElementById("floatingDescription").value = parsedItem.description;
  document.getElementById("floatingExpiration").value =
    parsedItem.expirationDate;
  document.getElementById("floatingPieces").value = parsedItem.pieces;
  document.getElementById("exampleModal").dataset.medicationId = parsedItem.id;
}

const showMedicine = (data) => {
  cards = "";

  data.forEach((item) => {
    cards += `
        <div class="card-id card col border-primary" data-index="${
          item.id
        }" style="width: 18rem">
        <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">${item.name}</h5>
              <div>
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editMedication('${encodeURIComponent(
                  JSON.stringify(item)
                )}')"><i class="bi bi-pencil"></i></button>
                
                <button type="button" class="btn btn-outline-danger btn-del" onclick="deleteMedication(${
                  item.id
                })"><i class="bi bi-trash3"></i></button>
              </div>
            </div>
            <h6 class="card-subtitle mb-2 text-muted">${item.dose} mg</h6>
            <p class="card-text">
              ${item.description}
            </p>
            <div class="d-flex justify-content-between">
              <p>${item.expirationDate}</p>
              <p>Nr. buc: ${item.pieces}</p>
            </div>
          </div>
          </div>
        `;
  });
  cardBody.innerHTML = cards;
};

async function addMedication() {
  const createMedication = await axios.post(
    "http://localhost:8000/api/medication/",
    {
      name: inputName.value,
      dose: inputDose.value,
      description: inputDescription.value,
      expirationDate: inputExpiration.value,
      pieces: inputPieces.value,
    }
  );
  const data = createMedication.data.data;
  await getMedication();
}

getMedication();
