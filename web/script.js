// Initialize total amounts
let funeralBenefitTotal = 0;
let tombstoneBenefitTotal = 0;
let cowBenefitTotal = 0;
let lifeCoverBenefitTotal = 0;
let monthlyProviderBenefitTotal = 0;
let deathIncomeBenefitTotal = 0; // Added for Death Income Benefit

// Policy fee
const policyFee = 10.00;

// Mapping of insured type long names
const insuredTypeLongNames = {
  mainLifeInsured: 'Main Life Insured',
  partner: 'Partner',
  children: 'Children',
  additionalChildren: 'Additional Child',
  extendedFamilyChildren: 'Extended Family Child',
  parents: 'Parent',
  extendedFamilyMembers: 'Extended Family Member',
};

// Store the selected amounts for each insured type and benefit
const selectedAmounts = {
  funeral: {},
  tombstone: {},
  cow: {},
  lifeCover: {},
  monthlyProvider: {},
  deathIncome: {}, // Added for Death Income Benefit
};


function toggleBenefitPicker(type) {
  const picker = document.getElementById(`${type}BenefitPicker`);
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
}

function updateBenefitTotal(type, reset = false) {
  let total = 0;
  for (const insuredType in selectedAmounts[type]) {
    total += selectedAmounts[type][insuredType].amount;
  }

  if (type === 'funeral') {
    funeralBenefitTotal = total;
    document.getElementById('funeralBenefitAmount').textContent = reset ? 'M0.00' : `M${funeralBenefitTotal.toFixed(2)}`;
    document.getElementById('totalFuneralBenefitPremium').textContent = reset ? 'M0.00' : `M${funeralBenefitTotal.toFixed(2)}`;
  } else if (type === 'tombstone') {
    tombstoneBenefitTotal = total;
    document.getElementById('tombstoneBenefitAmount').textContent = reset ? 'M0.00' : `M${tombstoneBenefitTotal.toFixed(2)}`;
    document.getElementById('totalTombstoneBenefitPremium').textContent = reset ? 'M0.00' : `M${tombstoneBenefitTotal.toFixed(2)}`;
  } else if (type === 'cow') {
    cowBenefitTotal = total;
    document.getElementById('cowBenefitAmount').textContent = reset ? 'M0.00' : `M${cowBenefitTotal.toFixed(2)}`;
    document.getElementById('totalCowBenefitPremium').textContent = reset ? 'M0.00' : `M${cowBenefitTotal.toFixed(2)}`;
  } else if (type === 'lifeCover') {
    lifeCoverBenefitTotal = total;
    document.getElementById('lifeCoverBenefitAmount').textContent = `M${lifeCoverBenefitTotal.toFixed(2)}`;
    document.getElementById('totalLifeCoverBenefitPremium').textContent = `M${lifeCoverBenefitTotal.toFixed(2)}`;
  } else if (type === 'monthlyProvider') {
    monthlyProviderBenefitTotal = total;
    document.getElementById('monthlyProviderBenefitAmount').textContent = reset ? 'M0.00' : `M${monthlyProviderBenefitTotal.toFixed(2)}`;
    document.getElementById('totalMonthlyProviderBenefitPremium').textContent = reset ? 'M0.00' : `M${monthlyProviderBenefitTotal.toFixed(2)}`;
  } else if (type === 'deathIncome') { // Added for Death Income Benefit
    deathIncomeBenefitTotal = total;
    document.getElementById('deathIncomeBenefitAmount').textContent = reset ? 'M0.00' : `M${deathIncomeBenefitTotal.toFixed(2)}`;
    document.getElementById('totalDeathIncomeBenefitPremium').textContent = reset ? 'M0.00' : `M${deathIncomeBenefitTotal.toFixed(2)}`;
  }

  // Recalculate the totals
  calculateTotals();
}

let selectedAgeBand = {}; // Store the selected age band for each insured type globally


function createPicker(type, insuredType, data) {
  const container = document.createElement('div');
  container.classList.add('pickerContainer');

  const label = document.createElement('label');
  label.textContent = insuredTypeLongNames[insuredType] || insuredType;
  container.appendChild(label);

  const ageBandPicker = document.createElement('select');
  ageBandPicker.classList.add('picker');

  const defaultAgeBandOption = document.createElement('option');
  defaultAgeBandOption.value = '';
  defaultAgeBandOption.textContent = 'Age Band';
  ageBandPicker.appendChild(defaultAgeBandOption);

  for (const ageBand in data[insuredType]) {
    const option = document.createElement('option');
    option.value = ageBand;
    option.textContent = ageBand;
    ageBandPicker.appendChild(option);
  }

  container.appendChild(ageBandPicker);

  const coverAmountPicker = document.createElement('select');
  coverAmountPicker.classList.add('picker');

  const defaultCoverAmountOption = document.createElement('option');
  defaultCoverAmountOption.value = '';
  defaultCoverAmountOption.textContent = 'Sum Assured';
  coverAmountPicker.appendChild(defaultCoverAmountOption);

  // Update the cover amount options based on the selected age band
  updateCoverAmountOptions(ageBandPicker.value, coverAmountPicker, data, insuredType);

  container.appendChild(coverAmountPicker);

  const periodPicker = document.createElement('select');
  periodPicker.classList.add('picker');

  if (type === 'monthlyProvider' || type === 'deathIncome') {
    const defaultPeriodOption = document.createElement('option');
    defaultPeriodOption.value = '';
    defaultPeriodOption.textContent = 'Period';
    periodPicker.appendChild(defaultPeriodOption);

    container.appendChild(periodPicker);
  }

  const amountDisplay = document.createElement('div');
  amountDisplay.classList.add('amountDisplay');
  amountDisplay.textContent = '= M0.00'; // Default display value
  container.appendChild(amountDisplay);

  // If the picker is for a benefit other than Funeral Benefit, disable the age band picker
if (type !== 'funeral') {
  ageBandPicker.disabled = true;

  // Event listener to update cover amount options for non-Funeral Benefits
  ageBandPicker.addEventListener('change', () => {
    const ageBandValue = ageBandPicker.value;

    // Only update cover amount options for the current picker
    updateCoverAmountOptions(ageBandValue, coverAmountPicker, data, insuredType);
    coverAmountPicker.dispatchEvent(new Event('change'));
  });
}

// Event listener for age band selection in Funeral Benefit
if (type === 'funeral') {
  ageBandPicker.addEventListener('change', () => {
    const ageBandValue = ageBandPicker.value;

    // Update age band selection for all other benefits for the same insured type
    const pickers = document.querySelectorAll(`select[data-insured-type="${insuredType}"].ageBandPicker`);
    pickers.forEach(picker => {
      if (picker !== ageBandPicker) {
        picker.value = ageBandValue;
        updateCoverAmountOptions(ageBandValue, picker.nextElementSibling, data, insuredType);
        picker.dispatchEvent(new Event('change'));
      }
    });

    // Also update the cover amount options for the current picker
    updateCoverAmountOptions(ageBandValue, coverAmountPicker, data, insuredType);
    coverAmountPicker.dispatchEvent(new Event('change'));
  });
}


  coverAmountPicker.addEventListener('change', () => {
    const ageBandValue = ageBandPicker.value;
    const coverAmountValue = coverAmountPicker.value;

    if (type === 'monthlyProvider' || type === 'deathIncome') {
      updatePeriodOptions(periodPicker, data, insuredType, ageBandValue, coverAmountValue);
    }

    if ((type === 'monthlyProvider' || type === 'deathIncome') && !periodPicker.value) {
      amountDisplay.textContent = '= M0.00';
    } else {
      // Update the amount display
      const combinedKey = periodPicker.value ? `${coverAmountValue}x${periodPicker.value}` : coverAmountValue;
      const amount = data[insuredType][ageBandValue][combinedKey] || 0;
      amountDisplay.textContent = `= M${amount.toFixed(2)}`;
      updateBenefitAmount(type, insuredType, ageBandValue, coverAmountValue, data, periodPicker.value);
    }
  });

  if (type === 'monthlyProvider' || type === 'deathIncome') {
    periodPicker.addEventListener('change', () => {
      const ageBandValue = ageBandPicker.value;
      const coverAmountValue = coverAmountPicker.value;
      const periodValue = periodPicker.value;

      let amount = 0;
      if (ageBandValue && coverAmountValue && periodValue) {
        const combinedKey = `${coverAmountValue}x${periodValue}`;
        amount = data[insuredType][ageBandValue][combinedKey] || 0;
      }
      amountDisplay.textContent = `= M${amount.toFixed(2)}`;

      updateBenefitAmount(type, insuredType, ageBandValue, coverAmountValue, data, periodValue);
    });
  }

  // Add data attributes for easier selection in the future
  ageBandPicker.dataset.insuredType = insuredType;
  ageBandPicker.classList.add('ageBandPicker');

  return container;
}


// Update the cover amount options for the pickerfunction 
function updateCoverAmountOptions(ageBand, coverAmountPicker, data, insuredType) {
  // Clear the existing cover amount picker options
  coverAmountPicker.innerHTML = '';

  // Create and append the default option for the cover amount picker
  const defaultCoverAmountOption = document.createElement('option');
  defaultCoverAmountOption.value = '';
  defaultCoverAmountOption.textContent = 'Sum Assured';
  coverAmountPicker.appendChild(defaultCoverAmountOption);

  // Populate the cover amount picker if an age band is selected
  if (ageBand) {
    const coverAmounts = new Set();
    // Iterate over the data to extract cover amounts
    for (const key in data[insuredType][ageBand]) {
      const coverAmount = key.split('x')[0];
      coverAmounts.add(coverAmount);
    }

    // Add the extracted cover amounts as options to the picker
    coverAmounts.forEach(coverAmount => {
      const option = document.createElement('option');
      option.value = coverAmount;
      option.textContent = coverAmount;
      coverAmountPicker.appendChild(option);
    });
  }
}



// Update the period options for the picker and display the calculated cover amount
function updatePeriodOptions(periodPicker, data, insuredType, ageBand, coverAmount, benefitType) {
  // Clear the period picker options
  periodPicker.innerHTML = '';

  // Create and append the default option for the period picker
  const defaultPeriodOption = document.createElement('option');
  defaultPeriodOption.value = '';
  defaultPeriodOption.textContent = 'Period';
  periodPicker.appendChild(defaultPeriodOption);

  // Ensure that the cover amount display for the specific benefit is added only once
  let coverAmountDisplay = document.querySelector(`.${benefitType}CoverAmountDisplay`);
  if (!coverAmountDisplay) {
    coverAmountDisplay = document.createElement('div');
    coverAmountDisplay.classList.add(`${benefitType}CoverAmountDisplay`);
    coverAmountDisplay.textContent = 'Cover Amount: M0.00'; // Default display value
    periodPicker.parentNode.appendChild(coverAmountDisplay);
  }

  // Populate the period picker if both ageBand and coverAmount are provided
  if (ageBand && coverAmount) {
    const periods = new Set();
    for (const key in data[insuredType][ageBand]) {
      const [amount, period] = key.split('x');
      if (amount === coverAmount) {
        periods.add(period);
      }
    }

    // Add the period options to the picker
    periods.forEach(period => {
      const option = document.createElement('option');
      option.value = period;
      option.textContent = period;
      periodPicker.appendChild(option);
    });
  }

  // Event listener to update the Cover Amount display when the period is selected
  periodPicker.addEventListener('change', () => {
    const selectedPeriod = periodPicker.value;
    const coverAmountValue = parseFloat(coverAmount) || 0;
    const periodValue = parseFloat(selectedPeriod) || 0;

    // Update the Cover Amount display only if both values are selected
    if (coverAmountValue > 0 && periodValue > 0) {
      const calculatedCoverAmount = coverAmountValue * periodValue;
      coverAmountDisplay.textContent = `Cover Amount: M${calculatedCoverAmount.toFixed(2)}`;
    } else {
      coverAmountDisplay.textContent = 'Cover Amount: M0.00'; // Reset to default
    }
  });
}




function toggleTotalsSection(show) {
  const totalsSection = document.getElementById('totals-section');
  const errorSection = document.getElementById('error-section');

  if (show) {
    totalsSection.style.display = 'block';
    errorSection.style.display = 'none';
  } else {
    totalsSection.style.display = 'none';
    errorSection.style.display = 'block';
  }
}

function updateBenefitAmount(type, insuredType, ageBand, coverAmount, data, period = null) {
  let amount = 0;
  const combinedKey = period ? `${coverAmount}x${period}` : coverAmount;

  if (ageBand && coverAmount) {
    amount = data[insuredType]?.[ageBand]?.[combinedKey] || 0;
  }

  // Ensure selectedAmounts[type] exists
  if (!selectedAmounts[type]) {
    selectedAmounts[type] = {};
  }

  // Ensure selectedAmounts[type][insuredType] exists
  if (!selectedAmounts[type][insuredType]) {
    selectedAmounts[type][insuredType] = { amount: 0, coverAmount: '' };
  }

  // Update the selected amount and cover amount
  selectedAmounts[type][insuredType].amount = amount;
  selectedAmounts[type][insuredType].coverAmount = period ? coverAmount * period : coverAmount;

  // Calculate the total cover amount for the insured type for relevant benefits
  const relevantBenefits = ['funeral', 'tombstone', 'cow', 'monthlyProvider'];
  let totalCoverAmount = 0;
  for (const benefitType of relevantBenefits) {
    if (selectedAmounts[benefitType] && selectedAmounts[benefitType][insuredType]) {
      totalCoverAmount += parseFloat(selectedAmounts[benefitType][insuredType].coverAmount || 0);
    }
  }

  const errorMessageElement = document.getElementById('mainLifeInsuredError');
  if (totalCoverAmount > 75000) {
    errorMessageElement.textContent = `Error: The total cover amount for ${insuredType} exceeds the maximum limit of 75,000.`;
    errorMessageElement.style.color = 'red';

    // Reset amount and cover amount for relevant benefits
    relevantBenefits.forEach(benefitType => {
      if (selectedAmounts[benefitType] && selectedAmounts[benefitType][insuredType]) {
        selectedAmounts[benefitType][insuredType].amount = 0;
        selectedAmounts[benefitType][insuredType].coverAmount = '';
      }
    });

    toggleTotalsSection(false); // Hide totals section and show error message

    // Turn buttons red and reset total benefit amount for relevant benefits
    relevantBenefits.forEach(benefitType => {
      const buttonElement = document.querySelector(`.button[onclick="toggleBenefitPicker('${benefitType}')"]`);
      if (buttonElement) {
        buttonElement.style.backgroundColor = 'red';
      }
      updateBenefitTotal(benefitType, true); // Reset total benefit amount
    });
  } else {
    errorMessageElement.textContent = '';
    toggleTotalsSection(true); // Show totals section and hide error message

    // Reset buttons color and restore total benefit amount for relevant benefits
    relevantBenefits.forEach(benefitType => {
      const buttonElement = document.querySelector(`.button[onclick="toggleBenefitPicker('${benefitType}')"]`);
      if (buttonElement) {
        buttonElement.style.backgroundColor = ''; // Reset to original color
      }
      // Restore the total benefit amount
      updateBenefitTotal(benefitType);
    });
  }

  // Update the total benefit amount for the current type
  updateBenefitTotal(type);
}


// Function to calculate and update the total of all benefits
function calculateTotals() {
  const overallTotal = funeralBenefitTotal + tombstoneBenefitTotal + cowBenefitTotal + lifeCoverBenefitTotal + monthlyProviderBenefitTotal + deathIncomeBenefitTotal;
  const totalPremium = overallTotal + policyFee;

  document.getElementById('subtotal').textContent = overallTotal.toFixed(2);
  document.getElementById('totalPremium').textContent = totalPremium.toFixed(2);
}

// Define the mapping of benefit types to their respective insured types
const benefitTypeInsuredTypes = {
  funeral: ['mainLifeInsured', 'partner', 'children', 'additionalChildren', 'extendedFamilyChildren', 'parents', 'extendedFamilyMembers'],
  tombstone: ['mainLifeInsured', 'partner', 'parents', 'extendedFamilyMembers'],
  cow: ['mainLifeInsured', 'partner', 'parents', 'extendedFamilyMembers'],
  monthlyProvider: ['mainLifeInsured', 'partner'],
  lifeCover: ['mainLifeInsured', 'partner'],
  deathIncome: ['mainLifeInsured', 'partner']
};

// Define the benefit types and data
const benefitTypes = ['funeral', 'tombstone', 'cow', 'lifeCover', 'monthlyProvider', 'deathIncome'];
const benefitData = {
  funeralBenefitData,
  tombstoneBenefitData,
  cowBenefitData,
  lifeCoverBenefitData,
  monthlyProviderBenefitData,
  deathIncomeBenefitData
};

// Iterate through each benefit type
benefitTypes.forEach(benefitType => {
  const pickerContainer = document.getElementById(`${benefitType}BenefitPicker`);

  // Get the insured types for the current benefit type
  const insuredTypes = benefitTypeInsuredTypes[benefitType];

  // Create and append pickers for each insured type
  insuredTypes.forEach(insuredType => {
    const picker = createPicker(benefitType, insuredType, benefitData[`${benefitType}BenefitData`]);
    pickerContainer.appendChild(picker);
  });
});

// Initialize the total values on page load
updateBenefitTotal('funeral');
updateBenefitTotal('tombstone');
updateBenefitTotal('cow');
updateBenefitTotal('lifeCover');
updateBenefitTotal('monthlyProvider');
updateBenefitTotal('deathIncome'); // Initialize Death Income Benefit total

// Example usage for the monthlyProvider benefit
updatePeriodOptions(
  document.getElementById('monthlyProviderPeriodPicker'), // Assuming this is the ID of the period picker
  data, 
  insuredType, 
  ageBand, 
  coverAmount, 
  'monthlyProvider' // Benefit type identifier
);

// Example usage for the deathIncome benefit
updatePeriodOptions(
  document.getElementById('deathIncomePeriodPicker'), // Assuming this is the ID of the period picker
  data, 
  insuredType, 
  ageBand, 
  coverAmount, 
  'deathIncome' // Benefit type identifier
);


calculateTotals(); // Calculate and display initial totals
