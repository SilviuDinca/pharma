"use strict";

let cards = document.querySelector(".section");
const cardBody = document.querySelector(".medicine");
const inputName = document.querySelector(".input-name");
const inputDose = document.querySelector(".input-dose");
const inputDescription = document.querySelector(".input-description");
const inputExpiration = document.querySelector(".input-expiration");
const inputPieces = document.querySelector(".input-pieces");
const addMedicine = document.querySelector(".btn-submit");
const btnSignUp = document.querySelector(".btn-sign-up");
const btnSignIn = document.querySelector(".btn-sign-in");
const showSignIn = document.querySelector(".show-signIn");
const hiddenSignUp = document.querySelector(".hidden-signUp");
const imageContainer = document.querySelector(".image-container");
const containerSection = document.querySelector(".container-section");

async function signUp() {
  const createUser = {
    username: document.getElementById("inputUsername").value,
    password: document.getElementById("inputPassword").value,
    address: document.getElementById("inputAddress").value,
    cnp: document.getElementById("inputCNP").value,
    city: document.getElementById("inputCity").value,
    phone: document.getElementById("inputPhone").value,
    pharmaceutist: document.getElementById("pharmaceutistRadio").checked,
    patient: document.getElementById("patientRadio").checked,
  };
  const res = await axios.post("http://localhost:8000/api/user", createUser);
}

async function signIn() {
  const createUser = {
    username: document.getElementById("signInUsername").value,
    password: document.getElementById("signInPassword").value,
  };
  const res = await axios.post("http://localhost:8000/api/login", createUser);
  if (res.data.data[0]) {
    showSignIn.classList.remove("d-grid");
    showSignIn.classList.add("d-none");
    imageContainer.classList.remove("d-none");
    containerSection.classList.remove("d-none");
    imageContainer.classList.add("d-block");
    containerSection.classList.add("d-grid");
  }
}

btnSignIn.addEventListener("click", signIn);

btnSignUp.addEventListener("click", () => {
  signUp();
  hiddenSignUp.classList.remove("d-grid");
  hiddenSignUp.classList.add("d-none");
  showSignIn.classList.remove("d-none");
  showSignIn.classList.add("d-grid");
});

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
