import { addItem, editItem } from "../myLib/fetchUtils.js";

const form = document.getElementById("data-form");
const inputId = document.getElementById("input-id");
const inputCode = document.getElementById("input-code");
const inputNameEn = document.getElementById("input-name-en");
const inputNameTh = document.getElementById("input-name-th");
const btnCancel = document.getElementById("btn-cancel");

export function initForm(apiUrl, refreshCallback) {
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const itemData = {
            study_code: inputCode.value,
            english_name: inputNameEn.value,
            thai_name: inputNameTh.value
        };

        if (!itemData.study_code || !itemData.english_name) {
            alert("Please fill in Code and English Name");
            return;
        }

        try {
            if (inputId.value) {
                itemData.id = inputId.value;
                await editItem(apiUrl, itemData);
                alert(`Updated ID: ${itemData.id} successfully!`);
            } else {
                await addItem(apiUrl, itemData);
                alert("Added new item successfully!");
            }

            clearForm();
            refreshCallback(); 

        } catch (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
        }
    });

    btnCancel.addEventListener("click", clearForm);
}

export function clearForm() {
    inputId.value = "";
    inputCode.value = "";
    inputNameEn.value = "";
    inputNameTh.value = "";
}

export function fillForm(item) {
    inputId.value = item.id;
    inputCode.value = item.study_code;
    inputNameEn.value = item.english_name;
    inputNameTh.value = item.thai_name;
    
    document.getElementById("form-container")?.scrollIntoView({ behavior: 'smooth' });
}