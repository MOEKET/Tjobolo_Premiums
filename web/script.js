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

function updateBenefitTotal(type) {
  let total = 0;
  for (const insuredType in selectedAmounts[type]) {
    total += selectedAmounts[type][insuredType].amount;
  }

  if (type === 'funeral') {
    funeralBenefitTotal = total;
    document.getElementById('funeralBenefitAmount').textContent = `M${funeralBenefitTotal.toFixed(2)}`;
    document.getElementById('totalFuneralBenefitPremium').textContent = `M${funeralBenefitTotal.toFixed(2)}`;
  } else if (type === 'tombstone') {
    tombstoneBenefitTotal = total;
    document.getElementById('tombstoneBenefitAmount').textContent = `M${tombstoneBenefitTotal.toFixed(2)}`;
    document.getElementById('totalTombstoneBenefitPremium').textContent = `M${tombstoneBenefitTotal.toFixed(2)}`;
  } else if (type === 'cow') {
    cowBenefitTotal = total;
    document.getElementById('cowBenefitAmount').textContent = `M${cowBenefitTotal.toFixed(2)}`;
    document.getElementById('totalCowBenefitPremium').textContent = `M${cowBenefitTotal.toFixed(2)}`;
  } else if (type === 'lifeCover') {
    lifeCoverBenefitTotal = total;
    document.getElementById('lifeCoverBenefitAmount').textContent = `M${lifeCoverBenefitTotal.toFixed(2)}`;
    document.getElementById('totalLifeCoverBenefitPremium').textContent = `M${lifeCoverBenefitTotal.toFixed(2)}`;
  } else if (type === 'monthlyProvider') {
    monthlyProviderBenefitTotal = total;
    document.getElementById('monthlyProviderBenefitAmount').textContent = `M${monthlyProviderBenefitTotal.toFixed(2)}`;
    document.getElementById('totalMonthlyProviderBenefitPremium').textContent = `M${monthlyProviderBenefitTotal.toFixed(2)}`;
  } else if (type === 'deathIncome') { // Added for Death Income Benefit
    deathIncomeBenefitTotal = total;
    document.getElementById('deathIncomeBenefitAmount').textContent = `M${deathIncomeBenefitTotal.toFixed(2)}`;
    document.getElementById('totalDeathIncomeBenefitPremium').textContent = `M${deathIncomeBenefitTotal.toFixed(2)}`;
  }

  // Recalculate the totals
  calculateTotals();
}



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

  updateCoverAmountOptions(ageBandPicker.value, coverAmountPicker, data, insuredType);

  container.appendChild(coverAmountPicker);

  const periodPicker = document.createElement('select');
  periodPicker.classList.add('picker');

  if (type === 'monthlyProvider' || type === 'deathIncome') { // Handle both monthlyProvider and deathIncome
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

  ageBandPicker.addEventListener('change', () => {
    updateCoverAmountOptions(ageBandPicker.value, coverAmountPicker, data, insuredType);
    coverAmountPicker.dispatchEvent(new Event('change'));
  });

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
      updateBenefitAmount(type, insuredType, ageBandValue, coverAmountValue, data, periodPicker.value);
      const combinedKey = periodPicker.value ? `${coverAmountValue}x${periodPicker.value}` : coverAmountValue;
      const amount = data[insuredType][ageBandValue][combinedKey] || 0;
      amountDisplay.textContent = `= M${amount.toFixed(2)}`;
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

  return container;
}

function updateCoverAmountOptions(ageBand, coverAmountPicker, data, insuredType) {
  coverAmountPicker.innerHTML = '';

  const defaultCoverAmountOption = document.createElement('option');
  defaultCoverAmountOption.value = '';
  defaultCoverAmountOption.textContent = 'Sum Assured';
  coverAmountPicker.appendChild(defaultCoverAmountOption);

  if (ageBand) {
    const coverAmounts = new Set();
    for (const key in data[insuredType][ageBand]) {
      const coverAmount = key.split('x')[0];
      coverAmounts.add(coverAmount);
    }
    coverAmounts.forEach(coverAmount => {
      const option = document.createElement('option');
      option.value = coverAmount;
      option.textContent = coverAmount;
      coverAmountPicker.appendChild(option);
    });
  }
}

function updatePeriodOptions(periodPicker, data, insuredType, ageBand, coverAmount) {
  periodPicker.innerHTML = '';

  const defaultPeriodOption = document.createElement('option');
  defaultPeriodOption.value = '';
  defaultPeriodOption.textContent = 'Period';
  periodPicker.appendChild(defaultPeriodOption);

  if (ageBand && coverAmount) {
    const periods = new Set();
    for (const key in data[insuredType][ageBand]) {
      const [amount, period] = key.split('x');
      if (amount === coverAmount) {
        periods.add(period);
      }
    }
    periods.forEach(period => {
      const option = document.createElement('option');
      option.value = period;
      option.textContent = period;
      periodPicker.appendChild(option);
    });
  }
}

function updateBenefitAmount(type, insuredType, ageBand, coverAmount, data, period = null) {
  let amount = 0;
  if (ageBand && coverAmount) {
    const combinedKey = period ? `${coverAmount}x${period}` : coverAmount;
    amount = data[insuredType][ageBand][combinedKey] || 0;
  }

  // Update the selected amount for the current insured type
  selectedAmounts[type][insuredType] = { amount };

  // Update the total benefit amount
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

calculateTotals(); // Calculate and display initial totals
