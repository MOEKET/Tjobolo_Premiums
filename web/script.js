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
  additionalChildren1: 'Additional Child 1',
  additionalChildren2: 'Additional Child 2',
  additionalChildren3: 'Additional Child',
  extendedFamilyChildren: 'Extended Family Child',
  parents: 'Parent',
  parents1: 'Parent',
  parents2: 'Parent',
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
    if (
      insuredType === 'additionalChildren' ||
      insuredType === 'parents' ||
      insuredType === 'extendedFamilyMembers' ||
      insuredType === 'extendedFamilyChildren'
    ) {
      // Iterate through all parent indices
      const insuredEntries = selectedAmounts[type][insuredType];
      if (insuredEntries && typeof insuredEntries === 'object') {
        for (const parentIndex in insuredEntries) {
          const parentGroup = insuredEntries[parentIndex];
          // Iterate through all group indices within each parent
          for (const groupIndex in parentGroup) {
            total += parentGroup[groupIndex]?.amount || 0;
          }
        }
      }
    } else {
      // Add the amount directly for other insured types
      total += selectedAmounts[type][insuredType]?.amount || 0;
    }
  }
  
    

  // Update totals and relevant UI elements
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
    document.getElementById('lifeCoverBenefitAmount').textContent = reset ? 'M0.00' : `M${lifeCoverBenefitTotal.toFixed(2)}`;
    document.getElementById('totalLifeCoverBenefitPremium').textContent = reset ? 'M0.00' : `M${lifeCoverBenefitTotal.toFixed(2)}`;
  } else if (type === 'monthlyProvider') {
    monthlyProviderBenefitTotal = total;
    document.getElementById('monthlyProviderBenefitAmount').textContent = reset ? 'M0.00' : `M${monthlyProviderBenefitTotal.toFixed(2)}`;
    document.getElementById('totalMonthlyProviderBenefitPremium').textContent = reset ? 'M0.00' : `M${monthlyProviderBenefitTotal.toFixed(2)}`;
  } else if (type === 'deathIncome') {
    deathIncomeBenefitTotal = total;
    document.getElementById('deathIncomeBenefitAmount').textContent = reset ? 'M0.00' : `M${deathIncomeBenefitTotal.toFixed(2)}`;
    document.getElementById('totalDeathIncomeBenefitPremium').textContent = reset ? 'M0.00' : `M${deathIncomeBenefitTotal.toFixed(2)}`;
  }

  // Recalculate overall totals
  calculateTotals();
}




let selectedAgeBand = {}; // Store the selected age band for each insured type globally


function createPicker(type, insuredType, data, parentIndex = 1) {
  const container = document.createElement('div');
  container.classList.add('pickerContainer');
  container.dataset.parentIndex = parentIndex;

  const label = document.createElement('label');
  label.textContent = `${insuredTypeLongNames[insuredType] || insuredType}${parentIndex > 1 ? ` Parent ${parentIndex}` : ''}`;
  container.appendChild(label);

  // Determine the number of pickers for the insured type
  const numPickers = getNumPickersForInsuredType(insuredType);

  for (let i = 1; i <= numPickers; i++) {
    const pickerGroup = document.createElement('div');
    pickerGroup.classList.add('pickerGroup');
    pickerGroup.dataset.groupIndex = i;

    // Age Band Picker
    const ageBandPicker = document.createElement('select');
    ageBandPicker.classList.add('picker', 'ageBandPicker');
    ageBandPicker.dataset.insuredType = insuredType;
    ageBandPicker.dataset.parentIndex = parentIndex;
    ageBandPicker.dataset.groupIndex = i;

    const defaultAgeBandOption = document.createElement('option');
    defaultAgeBandOption.value = '';
    defaultAgeBandOption.textContent = `Age Band`;
    ageBandPicker.appendChild(defaultAgeBandOption);

    for (const ageBand in data[insuredType]) {
      const option = document.createElement('option');
      option.value = ageBand;
      option.textContent = ageBand;
      ageBandPicker.appendChild(option);
    }

    pickerGroup.appendChild(ageBandPicker);

    // Cover Amount Picker
    const coverAmountPicker = document.createElement('select');
    coverAmountPicker.classList.add('picker', 'coverAmountPicker');
    coverAmountPicker.dataset.insuredType = insuredType;
    coverAmountPicker.dataset.parentIndex = parentIndex;
    coverAmountPicker.dataset.groupIndex = i;

    const defaultCoverAmountOption = document.createElement('option');
    defaultCoverAmountOption.value = '';
    defaultCoverAmountOption.textContent = `Sum Assured `;
    coverAmountPicker.appendChild(defaultCoverAmountOption);

    pickerGroup.appendChild(coverAmountPicker);

    // Period Picker (if applicable)
    const periodPicker = document.createElement('select');
    periodPicker.classList.add('picker', 'periodPicker');
    periodPicker.dataset.insuredType = insuredType;
    periodPicker.dataset.parentIndex = parentIndex;
    periodPicker.dataset.groupIndex = i;

    if (type === 'monthlyProvider' || type === 'deathIncome') {
      const defaultPeriodOption = document.createElement('option');
      defaultPeriodOption.value = '';
      defaultPeriodOption.textContent = `Period`;
      periodPicker.appendChild(defaultPeriodOption);
      pickerGroup.appendChild(periodPicker);
    }

    // Amount Display
    const amountDisplay = document.createElement('div');
    amountDisplay.classList.add('amountDisplay');
    amountDisplay.textContent = `= M0.00`;
    pickerGroup.appendChild(amountDisplay);

    // Append picker group to the container
    container.appendChild(pickerGroup);

    // Add picker logic
    ageBandPicker.addEventListener('change', () => {
      const ageBandValue = ageBandPicker.value;
      updateCoverAmountOptions(ageBandValue, coverAmountPicker, data, insuredType);
      coverAmountPicker.dispatchEvent(new Event('change'));
    });

    coverAmountPicker.addEventListener('change', () => {
      const ageBandValue = ageBandPicker.value;
      const coverAmountValue = coverAmountPicker.value;

      if (type === 'monthlyProvider' || type === 'deathIncome') {
        updatePeriodOptions(periodPicker, data, insuredType, ageBandValue, coverAmountValue);
      }

      const combinedKey = periodPicker.value
        ? `${coverAmountValue}x${periodPicker.value}`
        : coverAmountValue;

      const amount = data[insuredType][ageBandValue]?.[combinedKey] || 0;
      amountDisplay.textContent = `= M${amount.toFixed(2)}`;
      updateBenefitAmount(type, insuredType, ageBandValue, coverAmountValue, data, periodPicker.value);
    });

    if (type === 'monthlyProvider' || type === 'deathIncome') {
      periodPicker.addEventListener('change', () => {
        const ageBandValue = ageBandPicker.value;
        const coverAmountValue = coverAmountPicker.value;
        const periodValue = periodPicker.value;

        const combinedKey = `${coverAmountValue}x${periodValue}`;
        const amount = data[insuredType][ageBandValue]?.[combinedKey] || 0;

        amountDisplay.textContent = `= M${amount.toFixed(2)}`;
        updateBenefitAmount(type, insuredType, ageBandValue, coverAmountValue, data, periodValue);
      });
    }
  }

  return container;
}

// Logic to determine the number of pickers for specific insured types
function getNumPickersForInsuredType(insuredType) {
  const insuredTypeMapping = {
    additionalChildren: 4,
    parents: 4,
    extendedFamilyMembers: 4,
    extendedFamilyChildren: 4,
  };
  return insuredTypeMapping[insuredType] || 1; // Default to 1 picker for other types
}






function addMoreParents(type, containerId) {
  const container = document.getElementById(containerId);
  const currentParents = container.querySelectorAll('.pickerContainer').length;

  if (currentParents < 3) {
    const parentIndex = currentParents + 1;
    const picker = createPicker(type, 'parent', benefitData, parentIndex);
    container.appendChild(picker);
  }

  if (currentParents + 1 === 3) {
    // Hide the "Add More Parents" button after reaching 3 parents
    container.nextElementSibling.style.display = 'none';
  }
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

function updateBenefitAmount(type, insuredType, ageBand, coverAmount, data, period = null, parentIndex = 1, groupIndex = 1) {
  let amount = 0;
  const combinedKey = period ? `${coverAmount}x${period}` : coverAmount;

  if (ageBand && coverAmount) {
    amount = data[insuredType]?.[ageBand]?.[combinedKey] || 0;
  }

  // Ensure `selectedAmounts[type]` exists
  if (!selectedAmounts[type]) {
    selectedAmounts[type] = {};
  }

  // Handle insured types with multiple instances
  if (
    insuredType === 'additionalChildren' ||
    insuredType === 'parents' ||
    insuredType === 'extendedFamilyMembers' ||
    insuredType === 'extendedFamilyChildren'
  ) {
    // Ensure nested structure exists
    if (!selectedAmounts[type][insuredType]) {
      selectedAmounts[type][insuredType] = {};
    }
    if (!selectedAmounts[type][insuredType][parentIndex]) {
      selectedAmounts[type][insuredType][parentIndex] = {};
    }

    // Update the specific group entry
    selectedAmounts[type][insuredType][parentIndex][groupIndex] = {
      amount,
      coverAmount: period ? coverAmount * period : coverAmount,
    };
  } else {
    // Handle single-instance insured types
    if (!selectedAmounts[type][insuredType]) {
      selectedAmounts[type][insuredType] = { amount: 0, coverAmount: '' };
    }

    selectedAmounts[type][insuredType].amount = amount;
    selectedAmounts[type][insuredType].coverAmount = period ? coverAmount * period : coverAmount;
  }

  // Calculate the total cover amount for the insured type across relevant benefits
  const relevantBenefits = ['funeral', 'tombstone', 'cow', 'monthlyProvider'];
  let totalCoverAmount = 0;

  for (const benefitType of relevantBenefits) {
    if (selectedAmounts[benefitType] && selectedAmounts[benefitType][insuredType]) {
      if (
        insuredType === 'additionalChildren' ||
        insuredType === 'parents' ||
        insuredType === 'extendedFamilyMembers' ||
        insuredType === 'extendedFamilyChildren'
      ) {
        for (const parentIndex in selectedAmounts[benefitType][insuredType]) {
          const parentGroup = selectedAmounts[benefitType][insuredType][parentIndex];
          for (const groupIndex in parentGroup) {
            totalCoverAmount += parseFloat(parentGroup[groupIndex].coverAmount || 0);
          }
        }
      } else {
        totalCoverAmount += parseFloat(selectedAmounts[benefitType][insuredType].coverAmount || 0);
      }
    }
  }

  // Fetch mainLifeInsured cover amount
  let mainLifeInsuredCoverAmount = 0;
  for (const benefitType of relevantBenefits) {
    if (
      selectedAmounts[benefitType] &&
      selectedAmounts[benefitType]['mainLifeInsured']
    ) {
      mainLifeInsuredCoverAmount = Math.max(
        mainLifeInsuredCoverAmount,
        parseFloat(selectedAmounts[benefitType]['mainLifeInsured'].coverAmount || 0)
      );
    }
  }

  const errorMessageElement = document.getElementById('mainLifeInsuredError');

  if (totalCoverAmount > mainLifeInsuredCoverAmount) {
    errorMessageElement.textContent = `Error: The cover amount for ${insuredTypeLongNames[insuredType]} should not exceed that of Main Life Insured.`;
    errorMessageElement.style.color = 'red';

    // Reset amount and cover amount for relevant benefits
    relevantBenefits.forEach((benefitType) => {
      if (selectedAmounts[benefitType] && selectedAmounts[benefitType][insuredType]) {
        if (
          insuredType === 'additionalChildren' ||
          insuredType === 'parents' ||
          insuredType === 'extendedFamilyMembers' ||
          insuredType === 'extendedFamilyChildren' 
        ) {
          for (const parentIndex in selectedAmounts[benefitType][insuredType]) {
            const parentGroup = selectedAmounts[benefitType][insuredType][parentIndex];
            for (const groupIndex in parentGroup) {
              parentGroup[groupIndex].amount = 0;
              parentGroup[groupIndex].coverAmount = '';
            }
          }
        } else {
          selectedAmounts[benefitType][insuredType].amount = 0;
          selectedAmounts[benefitType][insuredType].coverAmount = '';
        }
      }
    });

    toggleTotalsSection(false); // Hide totals section and show error message

    // Turn buttons red and reset total benefit amount for relevant benefits
    relevantBenefits.forEach((benefitType) => {
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
    relevantBenefits.forEach((benefitType) => {
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
