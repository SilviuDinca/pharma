"use strict";

let card = document.querySelector(".section");
const cardBody = document.querySelector(".medicine");
const inputName = document.querySelector(".input-name");
const inputDose = document.querySelector(".input-dose");
const inputDescription = document.querySelector(".input-description");
const inputExpiration = document.querySelector(".input-expiration");
const inputPieces = document.querySelector(".input-pieces");
const addMedicine = document.querySelector(".btn-submit");

// const deleteMedication = async (id) => {
//   let res = await axios.delete(`http://localhost:8000/api/medication/${id}`);
//   console.log(res)
// };

async function getMedication() {
  let res = await axios.get("http://localhost:8000/api/medication/");
  let data = res;
  console.log(data.data.data);
  showMedicine(data.data.data);
  // const btnSave = document.querySelector(".btn-save");
  // btnSave.addEventListener("click", updateMedication);
  addMedicine.addEventListener("click", addMedication);

}
getMedication();

// async function updateMedication() {
//   let res = await axios.put("http://localhost:8000/api/medication/");
//   console.log(res);
// }

const showMedicine = (data) => {
  card = "";

  data.forEach((item) => {
    card += `
        <div class="card-id card col border-primary" data-index="${item.id}" style="width: 18rem">
        <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">${item.name}</h5>
              <div>
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-pencil"></i></button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Edit the medication</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
          <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" value="${item.name}">
          <label for="floatingInput">Name</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPassword" value="${item.dose}">
          <label for="floatingPassword">Dose</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPassword" value="${item.description}">
          <label for="floatingPassword">Description</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="floatingPassword" value="${item.expirationDate}">
          <label for="floatingPassword">Expiration Date</label>
        </div>
        <div class="form-floating">
          <input type="number" class="form-control" id="floatingPassword" value="${item.pieces}">
          <label for="floatingPassword">Pieces</label>
        </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn-save btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
                <button type="button" class="btn btn-outline-danger btn-del" data-index="${item.id}"><i class="bi bi-trash3"></i></button>
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
    console.log(item.id);
  });
  cardBody.innerHTML = card;
  // const btnDelete = document.querySelectorAll(".btn-del");
  // btnDelete.forEach((btn) => {
  //   console.log(btn.dataset.index)
  //   if(btn.dataset.index === card1()) {
  //     btn.addEventListener("click", deleteMedication);
  //   }
  // });
};

// const card1 = () => {
//   const cardId = document.querySelectorAll('.card-id')
//   cardId.forEach((item) => item.dataset.index)
// }

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
  return data;
}