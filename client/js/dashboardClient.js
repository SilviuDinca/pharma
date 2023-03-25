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
const inputsSignUp = document.querySelectorAll(".inputs-signUp");
const signInUsername = document.getElementById("signInUsername");
const signInPassword = document.getElementById("signInPassword");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");
const inputAddress = document.getElementById("inputAddress");
const inputCNP = document.getElementById("inputCNP");
const inputCity = document.getElementById("inputCity");
const inputPhone = document.getElementById("inputPhone");
const wrongInput = document.querySelector(".wrong-input");
const invalidGroupInput = document.querySelectorAll(".invalid-group-input");
const btnToSignUp = document.querySelector(".toSignUp");
const btnToSignIn = document.querySelector(".toSignIn");
const avatar = document.querySelector(".avatar");
const btnLogout = document.querySelector(".btn-logout");
let inputSearch = document.querySelector(".search-input");

btnToSignUp.addEventListener("click", () => {
  showSignIn.classList.add("d-none");
  hiddenSignUp.classList.remove("d-none");
  hiddenSignUp.classList.add("d-grid");
  inputsSignUp.forEach((input) => {
    input.value = "";
  });
});

btnToSignIn.addEventListener("click", () => {
  hiddenSignUp.classList.remove("d-grid");
  hiddenSignUp.classList.add("d-none");
  showSignIn.classList.remove("d-none");
  inputsSignUp.forEach((input) => {
    input.value = "";
  });
});

btnLogout.addEventListener("click", () => {
  showSignIn.classList.add("d-grid");
  showSignIn.classList.remove("d-none");
  imageContainer.classList.add("d-none");
  containerSection.classList.add("d-none");
  imageContainer.classList.remove("d-block");
  containerSection.classList.remove("d-grid");
  avatar.classList.add("d-none");
  signInUsername.value = "";
  signInPassword.value = "";
});

btnSignIn.addEventListener("click", signIn);

btnSignUp.addEventListener("click", () => {
  if (
    inputUsername.value === "" ||
    inputPassword.value === "" ||
    inputAddress.value === "" ||
    inputCNP.value === "" ||
    inputCity.value === "" ||
    inputPhone.value === ""
  ) {
    invalidGroupInput.forEach((item) => {
      item.classList.add("d-grid");
    });
  } else {
    signUp();
    hiddenSignUp.classList.remove("d-grid");
    hiddenSignUp.classList.add("d-none");
    showSignIn.classList.remove("d-none");
    showSignIn.classList.add("d-grid");
  }
});

async function signUp() {
  const createUser = {
    username: inputUsername.value,
    password: inputPassword.value,
    address: inputAddress.value,
    cnp: inputCNP.value,
    city: inputCity.value,
    phone: inputPhone.value,
  };
  const res = await axios.post("http://localhost:8000/api/user", createUser);
}

async function signIn() {
  const createUser = {
    username: signInUsername.value,
    password: signInPassword.value,
  };
  const res = await axios.post("http://localhost:8000/api/login", createUser);
  if (res.data.data[0]) {
    showSignIn.classList.remove("d-grid");
    showSignIn.classList.add("d-none");
    imageContainer.classList.remove("d-none");
    containerSection.classList.remove("d-none");
    imageContainer.classList.add("d-block");
    containerSection.classList.add("d-grid");
    avatar.classList.remove("d-none");
  } else {
    wrongInput.classList.add("invalid-feedback");
    wrongInput.classList.add("validation");
    wrongInput.classList.add("d-grid");
    wrongInput.textContent = "Wrong username or password! Try again!!";
    signInUsername.value = "";
    signInPassword.value = "";
  }
}

async function deleteMedication(id) {
  let res = await axios.delete(`http://localhost:8000/api/medication/${id}`);
  await getMedication();
}

async function deletePatients(id) {
  let res = await axios.delete(`http://localhost:8000/api/patient/${id}`);
  await getPatients();
}

async function getPatients() {
  const res = await axios.get("http://localhost:8000/api/patient");
  showPatients(res.data.data);
  const btnAddPatient = document.querySelector(".btn-add-patient");
  const openModalPatient = document.querySelector(".open-modal-patient");
  openModalPatient.addEventListener("click", () => {
    const modalFade = document.querySelector(".modal-backdrop");
    modalFade.style.zIndex = -1;
  });
  const createName = document.getElementById("createName")
  const createAddress = document.getElementById("createAddress")
  const createCNP = document.getElementById("createCNP")
  const createCity = document.getElementById("createCity")
  const createPhone = document.getElementById("createPhone")
  
  btnAddPatient.addEventListener("click", addPatient);
}

async function addPatient() {
 
  const createPatient = {
    name: createName.value,
    address: createAddress.value,
    cnp: createCNP.value,
    city: createCity.value,
    phone: createPhone.value,
  };
  const res = await axios.post("http://localhost:8000/api/patient", createPatient);
  await getPatients();
}

async function getMedication() {
  const res = await axios.get("http://localhost:8000/api/medication");
  showMedicine(res.data.data);
  getPatients();

  addMedicine.addEventListener("click", () => {
    if (
      inputName.value === "" ||
      inputDose.value === "" ||
      inputDescription.value === "" ||
      inputExpiration.value === "" ||
      inputPieces.value === ""
    ) {
      invalidGroupInput.forEach((item) => {
        item.classList.add("d-grid");
      });
    } else {
      addMedication();
      inputs.forEach((input) => (input.value = ""));
    }
  });
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

async function updatePatient() {
  const id = document.getElementById("patient").dataset.patientId;
  const updatedPatient = {
    name: document.getElementById("floatingUsername").value,
    address: document.getElementById("floatingAddress").value,
    cnp: document.getElementById("floatingCNP").value,
    city: document.getElementById("floatingCity").value,
    phone: document.getElementById("floatingPhone").value,
  };

  let res = await axios.put(
    `http://localhost:8000/api/patient/${id}`,
    updatedPatient
  );
  getPatients();
}

function editPatients(item) {
  const modalFade = document.querySelector(".modal-backdrop");
  modalFade.style.zIndex = -1;

  const parsedItem = JSON.parse(decodeURIComponent(item));
  document.getElementById("floatingUsername").value = parsedItem.name;
  document.getElementById("floatingAddress").value = parsedItem.address;
  document.getElementById("floatingCNP").value = parsedItem.cnp;
  document.getElementById("floatingCity").value = parsedItem.city;
  document.getElementById("floatingPhone").value = parsedItem.phone;
  document.getElementById("patient").dataset.patientId = parsedItem.id;
}

const showPatients = (data) => {
  let listSection = document.querySelector(".list-section");
  const listItem = document.querySelector(".list-items");
  listSection = "";
  data.forEach((item) => {
    listSection += `
    <ul class="list-group">
      <li class="list-group-item search-list d-flex flex-column mb-1">
      <div class="d-flex justify-content-between">
      Name: ${item.name}
      <div>
        <button type="button" class="btn btn-outline-success me-1" data-bs-toggle="modal" data-bs-target="#patient" onclick="editPatients('${encodeURIComponent(
          JSON.stringify(item)
        )}')"><i class="bi bi-pencil"></i></button>
        <button type="button" class="btn btn-outline-danger btn-del" onclick="deletePatients(${
          item.id
        })"><i class="bi bi-trash3"></i></button>
        </div>
      </div>
      <ul class="list-group mt-2">
      <li class="list-group-item">Address: ${item.address}</li>
      <li class="list-group-item">CNP: ${item.cnp}</li>
      <li class="list-group-item">City: ${item.city}</li>
      <li class="list-group-item">Phone: ${item.phone}</li>
      </ul>
      </li>
  </ul>
    `;
  });
  listItem.innerHTML = listSection;
  inputSearch.addEventListener("input", searchPatients);
};

const searchPatients = (e) => {
  const filter = e.target.value;
  const searchList = document.querySelectorAll(".search-list");
  for (let i = 0; i < searchList.length; i++) {
    if (
      searchList[i].textContent.toLowerCase().includes(filter.toLowerCase())
    ) {
      searchList[i].classList.remove("d-none");
      searchList[i].classList.add("d-flex");
    } else {
      searchList[i].classList.add("d-none");
      searchList[i].classList.remove("d-flex");
    }
  }
};

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
