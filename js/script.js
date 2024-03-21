
const painMedicine = [];
const firstAidMedicine = [];
const supplementsMedicine = [];
const dentalHealthMedicine = [];
const allergyMedicine = [];
const childMedicine = [];


// SELECTING THE ELEMENTS FROM THE DOM

const medicineForm = document.querySelector('.medicine-form');

const productName = document.querySelector('.product-name');
const productID = document.querySelector('.product-id');
const selectElement = document.querySelector('.format');
const manufacturer = document.querySelector('.manufacturer');
const expirationDate = document.querySelector('.expiration-date');
const quantity = document.querySelector('.quantity');

// LISTS
const painMedicineUl = document.querySelector('.pain-medicine-list');
const firstAidMedicineUl = document.querySelector('.first-aid-medicine-list');
const supplementsMedicineUL = document.querySelector('.supplements-medicine-list');
const dentalHealthMedicineUL = document.querySelector('.dental-health-medicine-list');
const allergyMedicineUL = document.querySelector('.allergy-medicine-list');
const childMedicineUl = document.querySelector('.child-medicine-list');

// DISPLAY CONTAINER

const medicineListContainer = document.querySelector('.medicine-list-container');

const displayPainMedicineContainer = document.querySelector('.display-pain-medicine');
const displayFirstAidMedicineContainer = document.querySelector('.display-first-aid-medicine');
const displaySupplementsMedicineContainer = document.querySelector('.display-supplements-medicine');
const displayDentalHealthMedicineContainer = document.querySelector('.display-dental-health-medicine');
const displayAllergyMedicineContaoner = document.querySelector('.display-allergy-medicine');
const displayChildMedicineContainer = document.querySelector('.display-child-medicine');

/* const displayPainMedicineUl = document.querySelector('.pain-medicine-list');  */

// RENDER BUTTON
const renderPainMedicineButton = document.querySelector('.render-pain-medicine-button');
const renderFirstAidMedicineButton = document.querySelector('.render-first-aid-medicine-button');
const renderSupplementsMedicineButton = document.querySelector('.render-supplements-medicine-button');
const renderDentalHealthMedicineButton = document.querySelector('.render-dental-health-medicine-button');
const renderAllergyMedicineButton = document.querySelector('.render-allergy-medicine-button');
const renderChildMedicineButton = document.querySelector('.render-child-medicine-button');


/* ------------------------------------ */
/* ------------------------------------ */


// ADDING THE EVENT LISTENERS


// e = event
medicineForm.addEventListener('submit', (e) =>{
	e.preventDefault();
	let newMedicine;

	if (selectElement.value === 'pain-relief') {
		newMedicine = new Medicine(productName.value, productID.value, selectElement.value, manufacturer.value, expirationDate.value, quantity.value);
	} else {
		newMedicine = new PainMedicine(productName.value, productID.value, selectElement.value, manufacturer.value, expirationDate.value, quantity.value);
	}

	Medicine.addMedicine(newMedicine);
	console.log(newMedicine);
	//console.log(medicine);
	console.log(painMedicine);
});

renderPainMedicineButton.addEventListener('click', () => {
	UI.activeTab = 'pain-relief';
	UI.renderPainMedicine(painMedicine);
});

renderFirstAidMedicineButton.addEventListener('click', () => {
	UI.activeTab = 'first-aid';
	UI.renderFirstAidMedicine(firstAidMedicine);
});




/*
selectElement.addEventListener('change', () => {
	if(selectElement.value === 'physical') {
		narrator.setAttribute('disabled', '');
		isbn.removeAttribute('disabled');
	} else {
		isbn.setAttribute('disabled', '');
		narrator.removeAttribute('disabled');
	}
});


// e = event
/*
medicineForm.addEventListener('submit', (e) =>{
	e.preventDefault();
	let newMedicine;
	if(selectElement.value === 'pain-medicine'){
		newMedicine = new Medicine(productName.value, productID.value, selectElement.value, manufacturer.value, expirationDate.value, quantity.value)
	} else {
		newMedicine = new PainMedicine(productName.value, productID.value, selectElement.value, manufacturer.value, expirationDate.value, quantity.value)
	}
	Medicine.addMedicine(newMedicine);
	console.log(newMedicine);
	console.log(medicine);
	console.log(painMedicine);
});

renderPainMedicineButton.addEventListener('click', () => {
	UI.activeTab = 'pain-medicine';
	UI.renderPainMedicine(painMedicine);
})

renderFirstAidMedicineButton.addEventListener('click', () => {
	UI.activeTab = 'first-aid';
	UI.renderFirstAidMedicine(firstAidMedicine);
})
*/

/* ------------------------------------ */
/* ------------------------------------ */

// DECLARING THE MEDICINE CLASS

class Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity) {
		this.productName = productName;
		this.productID = productID;
		this.manufacturer = manufacturer;
		this.expirationDate = expirationDate;
		this.quantity = quantity;
		this.ID = Date.now();
	}
	static addMedicine(medicine){
		if(medicine.format === 'pain-medicine') {
			painMedicine.push(medicine)
		} else {
			firstAidMedicine.push(medicine)
		}
	}


	// DELETE METHOD

	static deleteMedicine(id, medicineArray){
		const index = medicineArray.findIndex(medicine => medicine.ID.toString() === id.toString());
		if(index !== -1){
			medicineArray.splice(index, 1);
			if(UI.activeTab === 'pain-medicine'){
				UI.renderPainMedicine(painMedicine)
			} else {
				UI.renderFirstAidMedicine(firstAidMedicine)
			}
		}
	}
}




// DECLARING THE AUDIO BOOK CLASS (extends betyr at den arver fra forelderen Book)
// super = de man vil den skal arve

class PainMedicine extends Medicine {
	constructor(productName, productID, manufacturer, expirationDate, quantity, painMedicine) {
		super(productName, productID, manufacturer, expirationDate, quantity);
		this.painMedicine = painMedicine;
		this.ID = Date.now();
	}
}



// DECLARE THE UI CLASS

class UI {
	static activeTab = 'pain-medicine';
	static renderPainMedicine(medicine){
		//displayPainMedicineContainer.style.display = 'none';
		displayPainMedicineContainer.style.display = 'block';
		painMedicineUl.textContent = '';

		if(UI.activeTab === 'pain-medicine'){
			painMedicine.forEach((medicine) => {
				const liRow = document.createElement('li');
				const renderedProductName = document.createElement('span');
				const renderedProductID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedExpirationDate = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');
				
				//endret her fra painMedicine.productname til hva som står nå
				renderedProductName.textContent = medicine.productName;  
				renderedProductID.textContent = medicine.productID;
				renderedManufacturer.textContent = medicine.manufacturer;
				renderedExpirationDate.textContent = medicine.expirationDate;
				deleteButton.textContent = 'Delete';

				liRow.classList.add('pain-medicine-row');
				deleteButton.classList.add('delete-button');

				liRow.dataset.id = medicine.ID;

				painMedicineUl.append(liRow);
				liRow.append(renderedProductName, renderedProductID, renderedManufacturer, renderedExpirationDate, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e)=>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Medicine.deleteMedicine(rowID, painMedicine);
				})
			
			});
		}
	}
    ///---------------------------------

	static renderFirstAidMedicine(firstAidMedicine){
		firstAidMedicineUl.textContent = '';
		displayPainMedicineContainer.style.display = 'none';
		displayFirstAidMedicineContainer.style.display = 'block';

		if(UI.activeTab === 'first-aid-medicine'){
			firstAidMedicine.forEach(firstAidMedicine => {
				const liRow = document.createElement('li');
				const renderedProductName = document.createElement('span');
				const renderedProductID = document.createElement('span');
				const renderedManufacturer = document.createElement('span');
				const renderedExpirationDate = document.createElement('span');
				const deleteButtonContainer = document.createElement('span');
				const deleteButton = document.createElement('button');

				renderedProductName.textContent = firstAidMedicine.productName;
				renderedProductID.textContent = firstAidMedicine.productID;
				renderedManufacturer.textContent = firstAidMedicine.manufacturer;
				renderedExpirationDate.textContent = firstAidMedicine.expirationDate;
				deleteButton.textContent = 'Delete';

				liRow.dataset.id = firstAidMedicine.ID;

				liRow.classList.add('first-aid-medicine-row');
				deleteButton.classList.add('delete-button');


				firstAidMedicineUl.append(liRow);
				liRow.append(renderedProductName, renderedProductID, renderedManufacturer, renderedExpirationDate, deleteButtonContainer);
				deleteButtonContainer.append(deleteButton);

				deleteButton.addEventListener('click', (e)=>{
					const rowID = e.currentTarget.parentElement.parentElement.dataset.id;
					Medicine.deleteMedicine(rowID, firstAidMedicine);
				})
			});
		}
	}
}
