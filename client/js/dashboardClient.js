"use strict";

let card = document.querySelector('.section')
const cardBody = document.querySelector('.medicine')
const inputName = document.querySelector('.input-name')
const inputDose = document.querySelector('.input-dose')
const inputDescription = document.querySelector('.input-description')
const inputExpiration = document.querySelector('.input-expiration')
const inputPieces = document.querySelector('.input-pieces')
const addMedicine = document.querySelector('.btn-submit')


 async function addMedication() {
  const createMedication = await axios.post("http://localhost:8000/api/medication/", {
    name:inputName.value,
    dose:inputDose.value,
    description:inputDescription.value,
    expirationDate:inputExpiration.value,
    pieces:inputPieces.value
  })
  console.log(createMedication)
  
}

const update = () => {
addMedicine.addEventListener('click', addMedication)
}

async function getMedication() {
  let res = await axios.get("http://localhost:8000/api/medication/");
  let data = res;
  showMedicine(data.data.data)
  update()
}
getMedication();

const showMedicine = (data) => {
    card = ''
    data.forEach((item) => {
        card += `
        <div class="card col border-primary" style="width: 18rem">
        <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
              <h5 class="card-title">${item.name}</h5>
              <div>
                <button type="button" class="btn btn-outline-success"><i class="bi bi-pencil"></i></button>
                <button type="button" class="btn btn-outline-danger"><i class="bi bi-trash3"></i></button>
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
        `
    })
    cardBody.innerHTML = card
    return cardBody
}