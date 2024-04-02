const medicines = [];
const painMedicines = [];
const firstAidMedicines = [];
const dentalHealthMedicines = [];

// SELECTING THE ELEMENTS FROM THE DOM

const medicineForm = document.querySelector('.medicine-form');
const productName = document.querySelector('.product-name');
const productID = document.querySelector('.product-id');
const selectElement = document.querySelector('.format');
const manufacturer = document.querySelector('.manufacturer');
const expirationDate = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');
const medicinesUl = document.querySelector('.medicinesUl');
const painMedicinesUl = document.querySelector('.pain-medicines-list');
const firstAidMedicinesUl = document.querySelector('.first-aid-medicines-list');
const dentalHealthMedicinesUl = document.querySelector('.dental-health-medicines-list');
const medicineListContainer = document.querySelector('.medicine-list-container');
const displayMedicinesContainer = document.querySelector('.display-medicine-container');
const displayPainMedicinesContainer = document.querySelector('.display-pain-medicines-container');
const displayFirstAidMedicinesContainer = document.querySelector('.display-first-aid-medicines');
const displayDentalHealthMedicinesContainer = document.querySelector('.display-dental-health-medicines');
const renderMedicinesButton = document.querySelector('.render-medicine-button');
const renderPainMedicinesButton = document.querySelector('.render-pain-medicine-button');
const renderFirstAidMedicinesButton = document.querySelector('.render-first-aid-medicine-button');
const renderDentalHealthMedicinesButton = document.querySelector('.render-dental-health-medicine-button');

// ADDING THE EVENT LISTENERS

// e = event
medicineForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newMedicine;

  if (selectElement.value === 'medicine') {
    newMedicine = new Medicine(productName.value, productID.value, manufacturer.value, expirationDate.value, quantity.value);
  } else if (selectElement.value === 'pain-medicine') {
    newMedicine = new PainMedicine(productName.value, productID.value, manufacturer.value, expirationDate.value, quantity.value);
  } else if (selectElement.value === 'first-aid-medicine') {
    newMedicine = new FirstAidMedicine(productName.value, productID.value, manufacturer.value, expirationDate.value, quantity.value);
  } else if (selectElement.value === 'dental-health-medicine') {
    newMedicine = new DentalHealthMedicine(productName.value, productID.value, manufacturer.value, expirationDate.value, quantity.value);
  }

  Medicine.addMedicine(newMedicine);
  console.log(newMedicine);
});

renderPainMedicinesButton.addEventListener('click', () => {
	UI.activeTab = 'pain-medicine';
  // UI.painMedicinesUl(painMedicines);
  //console.log("Pain Medicines Data:", painMedicines);
  UI.renderPainMedicines(painMedicines);
  console.log(painMedicines);
  ;
  //painMedicinesUl.style.display = 'block'; /*  HER!!!! */
})

renderFirstAidMedicinesButton.addEventListener('click', () => {
  UI.activeTab = 'first-aid-medicine';
  UI.renderFirstAidMedicines(firstAidMedicines);
  console.log(firstAidMedicines);
})

renderDentalHealthMedicinesButton.addEventListener('click', () => {
  UI.activeTab = 'dental-health-medicine';
  UI.renderDentalHealthMedicines(dentalHealthMedicines);
  console.log(dentalHealthMedicines);
})

// DECLARING THE MEDICINE CLASS
//parent

class Medicine {
  constructor(productName, productID, manufacturer, expirationDate, quantity) {
    this.productName = productName;
    this.productID = productID;
    this.manufacturer = manufacturer;
    this.expirationDate = expirationDate;
    this.quantity = quantity;
    this.ID = Date.now();
  }

  static addMedicine(medicine) {
    medicines.push(medicine);

    if (medicine.format === 'pain-medicine') {
      painMedicines.push(medicine);
    } else if (medicine.format === 'first-aid-medicine') {
      firstAidMedicines.push(medicine);
    } else if (medicine.format === 'dental-health-medicine') {
      dentalHealthMedicines.push(medicine);
    }
  }

  // DELETE METHOD

  static deleteMedicine(id, medicineArray) {
    const index = medicineArray.findIndex((medicine) => medicine.ID.toString() === id.toString());
    if (index !== -1) {
      medicineArray.splice(index, 1);
      if (UI.activeTab === 'medicine') {
        UI.renderMedicines(medicines);
      } else if (UI.activeTab === 'pain-medicine') {
        UI.renderPainMedicines(painMedicines);
      } else if (UI.activeTab === 'first-aid-medicine') {
        UI.renderFirstAidMedicines(firstAidMedicines);
      } else if (UI.activeTab === 'dental-health-medicine') {
        UI.renderDentalHealthMedicines(dentalHealthMedicines);
      }
    }
  }
}

// DECLARING THE PAINMEDICINE CLASS

class PainMedicine extends Medicine {
  constructor(productName, productID, manufacturer, expirationDate, quantity) {
    super(productName, productID, manufacturer, expirationDate, quantity);
    this.format = 'pain-medicine';
  }
}

// DECLARING THE FIRSTAIDMEDICINE CLASS

class FirstAidMedicine extends Medicine {
  constructor(productName, productID, manufacturer, expirationDate, quantity) {
    super(productName, productID, manufacturer, expirationDate, quantity);
    this.format = 'first-aid-medicine';
  }
}

// DECLARING THE DENTALHEALTHMEDICINE CLASS

class DentalHealthMedicine extends Medicine {
  constructor(productName, productID, manufacturer, expirationDate, quantity) {
    super(productName, productID, manufacturer, expirationDate, quantity);
    this.format = 'dental-health-medicine';
  }
}

// DECLARE THE UI CLASS

class UI {
  static activeTab = 'medicine';

  static renderPainMedicines(painMedicines) {
    displayMedicinesContainer.style.display = 'block';
    displayFirstAidMedicinesContainer.style.display = 'none';
    displayDentalHealthMedicinesContainer.style.display = 'none';
    displayPainMedicinesContainer.style.display = 'block';
    //medicinesUl.textContent = '';
    if (UI.activeTab === 'pain-medicine') {
      painMedicinesUl.textContent = '';
    }
    
    if (UI.activeTab === 'pain-medicine') {
      painMedicines.forEach((painMedicine) => {
        const liRow = document.createElement('li');
        const renderedProductName = document.createElement('span');
        const renderedProductID = document.createElement('span');
        const renderedManufacturer = document.createElement('span');
        const renderedExpirationDate = document.createElement('span');
        const renderedQuantity = document.createElement('span');
        const deleteButtonContainer = document.createElement('span');
        const deleteButton = document.createElement('button');

        renderedProductName.textContent = painMedicine.productName;
        renderedProductID.textContent = painMedicine.productID;
        renderedManufacturer.textContent = painMedicine.manufacturer;
        renderedExpirationDate.textContent = painMedicine.expirationDate;
        renderedQuantity.textContent = painMedicine.quantity;
        deleteButton.textContent = 'Delete';

        liRow.dataset.id = painMedicine.ID;

		//'pain-medicines-row'
        liRow.classList.add('pain-medicines-row');
        deleteButton.classList.add('delete-button');
        deleteButtonContainer.classList.add('delete-button-container');

        painMedicinesUl.append(liRow);
        liRow.append(renderedProductName, renderedProductID, renderedManufacturer, renderedExpirationDate, renderedQuantity, deleteButtonContainer);
        deleteButtonContainer.append(deleteButton);

        deleteButton.addEventListener('click', (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Medicine.deleteMedicine(rowID, painMedicines);
        });
      });
    }
  }

  static renderFirstAidMedicines(firstAidMedicines) {
    displayMedicinesContainer.style.display = 'block';
    displayPainMedicinesContainer.style.display = 'none';
    displayDentalHealthMedicinesContainer.style.display = 'none';
    displayFirstAidMedicinesContainer.style.display = 'block';
    firstAidMedicinesUl.textContent = '';


    if (UI.activeTab === 'first-aid-medicine') {
      firstAidMedicines.forEach((firstAidMedicine) => {
        const liRow = document.createElement('li');
        const renderedProductName = document.createElement('span');
        const renderedProductID = document.createElement('span');
        const renderedManufacturer = document.createElement('span');
        const renderedExpirationDate = document.createElement('span');
        const renderedQuantity = document.createElement('span');
        const deleteButtonContainer = document.createElement('span');
        const deleteButton = document.createElement('button');

        renderedProductName.textContent = firstAidMedicine.productName;
        renderedProductID.textContent = firstAidMedicine.productID;
        renderedManufacturer.textContent = firstAidMedicine.manufacturer;
        renderedExpirationDate.textContent = firstAidMedicine.expirationDate;
        renderedQuantity.textContent = firstAidMedicine.quantity;
        deleteButton.textContent = 'Delete';

        liRow.dataset.id = firstAidMedicine.ID;

        liRow.classList.add('first-aid-medicines-row');
        deleteButton.classList.add('delete-button');
        deleteButtonContainer.classList.add('delete-button-container');

        firstAidMedicinesUl.append(liRow);
        liRow.append(renderedProductName, renderedProductID, renderedManufacturer, renderedExpirationDate, renderedQuantity, deleteButtonContainer);
        deleteButtonContainer.append(deleteButton);

        deleteButton.addEventListener('click', (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Medicine.deleteMedicine(rowID, firstAidMedicines);
        });
      });
    }
  }

  static renderDentalHealthMedicines(dentalHealthMedicines) {
    displayMedicinesContainer.style.display = 'block';
    displayPainMedicinesContainer.style.display = 'none';
    displayFirstAidMedicinesContainer.style.display = 'none';
    displayDentalHealthMedicinesContainer.style.display = 'block';
    dentalHealthMedicinesUl.textContent = '';

    if (UI.activeTab === 'dental-health-medicine') {
      dentalHealthMedicines.forEach((dentalHealthMedicine) => {
        const liRow = document.createElement('li');
        const renderedProductName = document.createElement('span');
        const renderedProductID = document.createElement('span');
        const renderedManufacturer = document.createElement('span');
        const renderedExpirationDate = document.createElement('span');
        const renderedQuantity = document.createElement('span');
        const deleteButtonContainer = document.createElement('span');
        const deleteButton = document.createElement('button');

        renderedProductName.textContent = dentalHealthMedicine.productName;
        renderedProductID.textContent = dentalHealthMedicine.productID;
        renderedManufacturer.textContent = dentalHealthMedicine.manufacturer;
        renderedExpirationDate.textContent = dentalHealthMedicine.expirationDate;
        renderedQuantity.textContent = dentalHealthMedicine.quantity;
        deleteButton.textContent = 'Delete';

        liRow.dataset.id = dentalHealthMedicine.ID;

        liRow.classList.add('dental-health-medicines-row');
        deleteButton.classList.add('delete-button');
        deleteButtonContainer.classList.add('delete-button-container');

        dentalHealthMedicinesUl.append(liRow);
        liRow.append(renderedProductName, renderedProductID, renderedManufacturer, renderedExpirationDate, renderedQuantity, deleteButtonContainer);
        deleteButtonContainer.append(deleteButton);

        deleteButton.addEventListener('click', (e) => {
          const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
          Medicine.deleteMedicine(rowID, dentalHealthMedicines);
        });
      });
    }
  }
}

/* Local storage */

// Function to save medicines data to local storage
function saveMedicinesToLocalStorage() {
  // Convert the medicines arrays to a JSON string
  const medicinesJson = JSON.stringify({
    medicines: medicines,
    painMedicines: painMedicines,
    firstAidMedicines: firstAidMedicines,
    dentalHealthMedicines: dentalHealthMedicines
  });

  // Save the JSON string to local storage
  localStorage.setItem('medicinesData', medicinesJson);
}

// Function to load medicines data from local storage
function loadMedicinesFromLocalStorage() {
  // Retrieve the JSON string from local storage
  const savedMedicinesJson = localStorage.getItem('medicinesData');

  // Parse the JSON string back to its original format
  if (savedMedicinesJson) {
    const savedData = JSON.parse(savedMedicinesJson);

    // Update your medicines arrays with the retrieved data
    medicines.splice(0, medicines.length, ...savedData.medicines);
    painMedicines.splice(0, painMedicines.length, ...savedData.painMedicines);
    firstAidMedicines.splice(0, firstAidMedicines.length, ...savedData.firstAidMedicines);
    dentalHealthMedicines.splice(0, dentalHealthMedicines.length, ...savedData.dentalHealthMedicines);
  }
}

// Call the function to load medicines data from local storage when the page loads
window.addEventListener('load', loadMedicinesFromLocalStorage);

// Call the function to save medicines data to local storage whenever the medicines are updated
medicineForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let newMedicine;

  // Create new medicine object based on form input
  // Add the new medicine to the respective medicines array

  // Call the function to save medicines data to local storage
  saveMedicinesToLocalStorage();

  
});

// Function to delete medicine from local storage and update UI
function deleteMedicineAndUpdateUI(id, medicineArray) {
  // Delete medicine from the respective medicines array

  // Call the function to save medicines data to local storage
  saveMedicinesToLocalStorage();

  
}
