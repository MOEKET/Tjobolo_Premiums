import { lifeCoverBenefitData } from './benefitData.js';

let showLifeCoverBenefitPicker = false;
const selectedLifeCoverTypes = [];
const selectedAgeBands = {};
const selectedSumAssured = {};

window.toggleLifeCoverBenefitPicker = function() {
    showLifeCoverBenefitPicker = !showLifeCoverBenefitPicker;
    document.getElementById('lifeCoverBenefitPicker').classList.toggle('hidden', !showLifeCoverBenefitPicker);
    if (showLifeCoverBenefitPicker) {
        renderLifeCoverBenefitPicker();
    }
}

function renderLifeCoverBenefitPicker() {
    const container = document.querySelector('#lifeCoverBenefitPicker .column');
    container.innerHTML = '';
    for (const insuredType in lifeCoverBenefitData) {
        const row = document.createElement('div');
        row.classList.add('row');

        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'lifeCoverType';
        radioButton.value = insuredType;
        radioButton.onclick = () => handleLifeRadioButtonPress(insuredType);

        const radioLabel = document.createElement('label');
        radioLabel.classList.add('radio-label');
        radioLabel.textContent = insuredType;

        row.appendChild(radioButton);
        row.appendChild(radioLabel);

        if (selectedLifeCoverTypes.includes(insuredType)) {
            const pickerContainer = document.createElement('div');
            pickerContainer.classList.add('picker-container');

            const ageBandPicker = document.createElement('select');
            ageBandPicker.classList.add('picker');
            ageBandPicker.onchange = (e) => handleAgeBandChange(insuredType, e.target.value);

            const defaultAgeOption = document.createElement('option');
            defaultAgeOption.textContent = 'Age Band';
            defaultAgeOption.value = '';
            ageBandPicker.appendChild(defaultAgeOption);

            for (const ageBand of getAgeBands(lifeCoverBenefitData, insuredType)) {
                const option = document.createElement('option');
                option.textContent = ageBand;
                option.value = ageBand;
                ageBandPicker.appendChild(option);
            }

            const sumAssuredPicker = document.createElement('select');
            sumAssuredPicker.classList.add('picker');
            sumAssuredPicker.onchange = (e) => handleSumAssuredChange(insuredType, e.target.value);

            const defaultSumOption = document.createElement('option');
            defaultSumOption.textContent = 'Sum Assured';
            defaultSumOption.value = '';
            sumAssuredPicker.appendChild(defaultSumOption);

            for (const sum of getSumAssuredOptions(lifeCoverBenefitData, insuredType, selectedAgeBands[insuredType])) {
                const option = document.createElement('option');
                option.textContent = sum;
                option.value = sum;
                sumAssuredPicker.appendChild(option);
            }

            pickerContainer.appendChild(ageBandPicker);
            pickerContainer.appendChild(sumAssuredPicker);
            row.appendChild(pickerContainer);
        }

        container.appendChild(row);
    }
    updateTotalPremium();
}

function handleLifeRadioButtonPress(insuredType) {
    if (selectedLifeCoverTypes.includes(insuredType)) {
        selectedLifeCoverTypes.splice(selectedLifeCoverTypes.indexOf(insuredType), 1);
    } else {
        selectedLifeCoverTypes.push(insuredType);
    }
    renderLifeCoverBenefitPicker();
}

function handleAgeBandChange(insuredType, value) {
    selectedAgeBands[insuredType] = value;
    selectedSumAssured[insuredType] = '';
    renderLifeCoverBenefitPicker();
}

function handleSumAssuredChange(insuredType, value) {
    selectedSumAssured[insuredType] = value;
    updateTotalPremium();
}

function getAgeBands(data, insuredType) {
    return Object.keys(data[insuredType]);
}

function getSumAssuredOptions(data, insuredType, ageBand) {
    return ageBand ? Object.keys(data[insuredType][ageBand]) : [];
}

function updateTotalPremium() {
    let total = 0;
    for (const insuredType of selectedLifeCoverTypes) {
        const ageBand = selectedAgeBands[insuredType];
        const sumAssured = selectedSumAssured[insuredType];
        if (ageBand && sumAssured) {
            total += parseFloat(lifeCoverBenefitData[insuredType][ageBand][sumAssured]);
        }
    }
    document.getElementById('totalPremium').textContent = `= M${total.toFixed(2)}`;
}
