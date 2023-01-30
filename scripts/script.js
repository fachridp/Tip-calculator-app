const allInputs = document.querySelectorAll(".input__class");
const inputBill = document.getElementById("bill");
const btnTipContainer = document.querySelector(".tip__btn__grid");
const btnTip = document.querySelectorAll(".btn__tip");
const customInput = document.getElementById("custom__input");
const numberPeople = document.getElementById("number__people");
const tipResult = document.getElementById("tip__result");
const totalResult = document.getElementById("total__result");
const btnResetContainer = document.querySelector(".btn__reset__container");
const btnReset = document.querySelector(".btn__reset");

let newElement;
let billValue;
let selectedTip;
let newSelectedTip;
let current;
let containerNewTip = [];
let customTipValue;
let convertCustomTipValue;
let numberOfPeopleValue;
let tipAmountResult;
let tipAmountResultToStr;
let res1;
let res2;
let res3;

for (let i = 0; i < allInputs.length; i++) {
	allInputs[i].addEventListener("click", setCursorToTheEndAllInputs);
}
inputBill.addEventListener("input", getBillValue);
for (let i = 0; i < btnTip.length; i++) {
	btnTip[i].addEventListener("click", getSelectedTipValue);
}
customInput.addEventListener("keypress", getCustomInputValue);
customInput.addEventListener("click", setCursorToTheEndCustomInput);
customInput.addEventListener("input", customInputRules);
numberPeople.addEventListener("input", getNumberOfPeopleValue);
btnReset.addEventListener("click", clear);

//  Move focus to END of input field on inputs click
function setCursorToTheEndAllInputs(e) {
	const end = e.target.value.length;

	e.target.setSelectionRange(end, end);
	e.target.focus();
}

//  Move focus to END of input field on inputs click
function setCursorToTheEndCustomInput(e) {
	const end = e.target.value.length;

	e.target.setSelectionRange(end, end);
	e.target.focus();
}

function getBillValue() {
	this.value = this.value.replace(/[^0-9\.]+/g, '');

	billValue = Number(this.value);

	if (numberOfPeopleValue !== undefined && billValue !== 0 && numberOfPeopleValue !== 0 && selectedTip !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * selectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * selectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${tipAmountResultToStr}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	} else {
		tipResult.innerText = `$0.00`;
		totalResult.innerText = `$0.00`;

		btnResetContainer.style.opacity = ".3";
	}

	if (billValue !== undefined && numberOfPeopleValue !== 0 && billValue !== 0 && newSelectedTip !== undefined && numberOfPeopleValue !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * newSelectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * newSelectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${Number(tipAmountResultToStr)}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	} else {
		tipResult.innerText = `$0.00`;
		totalResult.innerText = `$0.00`;

		btnResetContainer.style.opacity = ".3";
	}

	return billValue;
}

function getSelectedTipValue() {
	current = document.getElementsByClassName("clicked");

	if (current.length > 0) {
		current[0].className = current[0].className.replace("clicked", "");
	}

	this.classList.add("clicked");

	selectedTip = Number(this.dataset.percent / 100);

	if (billValue !== undefined && numberOfPeopleValue !== 0 && billValue !== 0 && numberOfPeopleValue !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * selectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * selectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${Number(tipAmountResultToStr)}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	} else {
		tipResult.innerText = `$0.00`;
		totalResult.innerText = `$0.00`;

		btnResetContainer.style.opacity = ".3";
	}

	return selectedTip;
}

function customInputRules() {
	this.value = this.value.replace(/[^0-9\%]+/g, '');
	customTipValue = this.value.replace(/[^0-9]+/g, '');
	convertCustomTipValue = Number(customTipValue);
}

function getCustomInputValue(e) {
	if (e.key === "Enter") {
		newElement = document.createElement("button");
		const newElementValue = document.createTextNode(`${e.target.value}`);
		newElement.appendChild(newElementValue);
		newElement.classList.add("btn__tip", "new__btn__tip");
		newElement.setAttribute("data-percent", `${convertCustomTipValue}`);

		btnTipContainer.insertBefore(newElement, customInput);

		containerNewTip.push(newElement);
		
		for (let i = 0; i < containerNewTip.length; i++) {
			containerNewTip[i].addEventListener("click", getSelectedNewTipElement);
		}

		customInput.value = "";

		return containerNewTip;
	}
}

function getSelectedNewTipElement() {
	current = document.getElementsByClassName("clicked");

	if (current.length > 0) {
		current[0].className = current[0].className.replace("clicked", "");
	}

	this.classList.add("clicked");
	newSelectedTip = Number(this.dataset.percent / 100);

	if (billValue !== undefined && numberOfPeopleValue !== 0 && billValue !== 0 && numberOfPeopleValue !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * newSelectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * newSelectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${Number(tipAmountResultToStr)}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	} else {
		tipResult.innerText = `$0.00`;
		totalResult.innerText = `$0.00`;

		btnResetContainer.style.opacity = ".3";
	}

	return newSelectedTip;
}

function getNumberOfPeopleValue() {
	this.value = this.value.replace(/[^0-9]+/g, '');

	numberOfPeopleValue = Number(this.value);

	if (billValue !== undefined && numberOfPeopleValue !== 0 && billValue !== 0 && selectedTip !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * selectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * selectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${Number(tipAmountResultToStr)}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	} else {
		tipResult.innerText = `$0.00`;
		totalResult.innerText = `$0.00`;

		btnResetContainer.style.opacity = ".3";
	}

	if (billValue !== undefined && numberOfPeopleValue !== 0 && billValue !== 0 && newSelectedTip !== undefined) {
		tipAmountResult = billValue / numberOfPeopleValue * newSelectedTip;
		tipAmountResultToStr = String(tipAmountResult).slice(0, 4);
		res1 = billValue * newSelectedTip;
		res2 = res1 + billValue;
		res3 = String(res2 / numberOfPeopleValue + 0.01).slice(0, 5);

		tipResult.innerText = `$${Number(tipAmountResultToStr)}`;
		totalResult.innerText = `$${Number(res3)}`;

		btnResetContainer.style.opacity = "1";
	}

	return numberOfPeopleValue;
}

function clear() {
	inputBill.value = "";
	numberPeople.value = "";
	billValue = 0;
	numberOfPeopleValue = 0;
	selectedTip = 0;
	tipResult.innerText = `$0.00`;
	totalResult.innerText = `$0.00`;

	btnResetContainer.style.opacity = ".3";

	const customTipBtns = document.querySelectorAll(".new__btn__tip");

	customTipBtns.forEach(customTipBtn => {
		customTipBtn.remove();
	});

	customInput.value = "";

	current[0].className = current[0].className.replace("clicked", "");
	
}

if (billValue !== undefined || numberOfPeopleValue !== undefined) {
	getBillValue();
	getSelectedTipValue();
	getNumberOfPeopleValue();
	clear();
}

