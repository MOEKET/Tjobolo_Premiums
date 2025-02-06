import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const [showFuneralBenefitPicker, setShowFuneralBenefitPicker] = useState(false);
  const [showTombstoneBenefitPicker, setShowTombstoneBenefitPicker] = useState(false);
  const [showCowBenefitPicker, setShowCowBenefitPicker] = useState(false);
  const [showFamilyProviderBenefitPicker, setShowFamilyProviderBenefitPicker] = useState(false);
  const [showDeathIncomeBenefitPicker, setShowDeathIncomeBenefitPicker] = useState(false);
  const [showLifeCoverBenefitPicker, setShowLifeCoverBenefitPicker] = useState(false);

  const [selectedAgeBands, setSelectedAgeBands] = useState({
    mainLifeInsured: '',
    partner: '',
    children: '',
    additionalChildren: '',
    extendedFamilyChildren: '',
    parents: '',
    extendedFamilyMembers: '',
  });
  const [lifeSelectedSumAssured, setSelectedSumAssured] = useState({});
  const [selectedFuneralInsuredTypes, setSelectedFuneralInsuredTypes] = useState([]);
  const [selectedTombstoneInsuredTypes, setSelectedTombstoneInsuredTypes] = useState([]);
  const [selectedMonthlyProviderInsuredTypes, setSelectedMonthlyProviderInsuredTypes] = useState([]);
  const [selectedCowInsuredTypes, setSelectedCowInsuredTypes] = useState([]);
  const [selectedLifeCoverTypes, setSelectedLifeCoverInsuredTypes] = useState([]);
  const [selectedDeathIncomeTypes, setSelectedDeathIncomeTypes] = useState([]);
  
  const [selectedFuneralAgeBands, setSelectedFuneralAgeBands] = useState({});
  const [selectedFuneralSumAssured, setSelectedFuneralSumAssured] = useState({});
  const [selectedTombstoneAgeBands, setSelectedTombstoneAgeBands] = useState({});
  const [selectedTombstoneSumAssured, setSelectedTombstoneSumAssured] = useState({});
  const [selectedCowAgeBands, setSelectedCowAgeBands] = useState({});
  const [selectedCowSumAssured, setSelectedCowSumAssured] = useState({});

  const [familyProviderSelectedAgeBands, setFamilyProviderSelectedAgeBands] = useState({});
  const [familyProviderSelectedSumAssured, setFamilyProviderSelectedSumAssured] = useState({});
  const [familyProviderSelectedPeriods, setFamilyProviderSelectedPeriods] = useState({});
  const [totalFamilyProviderPremium, setTotalFamilyProviderPremium] = useState(0);

  const [deathIncomeSelectedAgeBands, setDeathIncomeSelectedAgeBands] = useState({});
  const [deathIncomeSelectedSumAssured, setDeathIncomeSelectedSumAssured] = useState({});
  const [deathIncomeSelectedPeriods, setDeathIncomeSelectedPeriods] = useState({});
  
  
  const [totalPremium, setTotalPremium] = useState(0);
  const [totalFuneralPremium, setTotalFuneralPremium] = useState(0);
  const [totalTombstonePremium, setTotalTombstonePremium] = useState(0);
  const [totalCowPremium, setTotalCowPremium] = useState(0);
  const [totalLifeCoverPremium, setTotalLifeCoverPremium] = useState(0);

  const [totalSumAssured, setTotalSumAssured] = useState(0);
  const [totalSumAssuredTwo, setTotalSumAssuredTwo] = useState(0);
  const [totalSumAssuredThree, setTotalSumAssuredThree] = useState(0);

  const [totalSumAssuredMainLife, setTotalSumAssuredMainLife] = useState(0);
  const [totalSumAssuredPartner, setTotalSumAssuredPartner] = useState(0);
  const [totalSumAssuredTwoMainLife, setTotalSumAssuredTwoMainLife] = useState(0);
  const [totalSumAssuredTwoPartner, setTotalSumAssuredTwoPartner] = useState(0);
  const [totalSumAssuredThreeMainLife, setTotalSumAssuredThreeMainLife] = useState(0);
  const [totalSumAssuredThreePartner, setTotalSumAssuredThreePartner] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
  
  const [errorMessageThree, setErrorMessageThree] = useState('');
  const [hadError, setHadError] = useState(false);
  const [hadErrorTwo, setHadErrorTwo] = useState(false);

  const [additionalChildrenCount, setAdditionalChildrenCount] = useState(0);
  const [parentsCount, setParentsCount] = useState(0);

  const [extendedFamilyChildrenCount, setExtendedFamilyChildrenCount] = useState(0);
  const [extendedFamilyMembersCount, setExtendedFamilyMembersCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [successMessageTwo, setSuccessMessageTwo] = useState('');
  const [successMessageThree, setSuccessMessageThree] = useState('');
  
  useEffect(() => {
    calculateTotalFuneralPremium();
  }, [selectedFuneralInsuredTypes, selectedAgeBands, selectedFuneralSumAssured]);

  useEffect(() => {
    calculateTotalTombstonePremium();
  }, [selectedTombstoneInsuredTypes, selectedAgeBands, selectedTombstoneSumAssured]);

  useEffect(() => {
    calculateTotalCowPremium();
  }, [selectedCowInsuredTypes, selectedAgeBands, selectedCowSumAssured]);
  

  const resetAllSelections = () => {
    setSelectedAgeBands({});
    setSelectedSumAssured({});
    setSelectedFuneralInsuredTypes([]);
    setSelectedTombstoneInsuredTypes([]);
    setSelectedMonthlyProviderInsuredTypes([]);
    setSelectedCowInsuredTypes([]);
    setSelectedLifeCoverInsuredTypes([]);
    setSelectedDeathIncomeTypes([]);
    setSelectedFuneralAgeBands({});
    setSelectedFuneralSumAssured({});
    setSelectedTombstoneAgeBands({});
    setSelectedTombstoneSumAssured({});
    setSelectedCowAgeBands({});
    setSelectedCowSumAssured({});
    setFamilyProviderSelectedAgeBands({});
    setFamilyProviderSelectedSumAssured({});
    setFamilyProviderSelectedPeriods({});
    setDeathIncomeSelectedAgeBands({});
    setDeathIncomeSelectedSumAssured({});
    setDeathIncomeSelectedPeriods({});
    setAdditionalChildrenCount(0);
    setParentsCount(0);
    setExtendedFamilyChildrenCount(0);
    setExtendedFamilyMembersCount(0);
    setTotalPremium(0);
  };

  const resetLifeDeathSelections = () => {
    setDeathIncomeSelectedSumAssured({});
    setDeathIncomeSelectedPeriods({});
    setSelectedDeathIncomeTypes([]);
    setSelectedLifeCoverInsuredTypes([]);
    setSelectedSumAssured([]);
  };

  useEffect(() => {
    if (
      !(
        selectedFuneralInsuredTypes.includes('mainLifeInsured') &&
        selectedFuneralSumAssured['mainLifeInsured'] === '50000'
      )
    ) {
      resetLifeDeathSelections();
    }
  }, [selectedFuneralInsuredTypes, selectedFuneralSumAssured]);


  const canAddMore = (insuredType, count, maxCount) => {
    const ageBand = selectedAgeBands[insuredType];
    const sumAssured = selectedFuneralSumAssured[insuredType];
    return selectedFuneralInsuredTypes.includes(insuredType) && ageBand && sumAssured && count < maxCount;
  };

  const funeralBenefitData = {
    mainLifeInsured: {
      '18-45': {
        '10000': 54.50, '15000': 61.00, '20000': 67.50, '25000': 74.00, '30000': 80.50,
        '35000': 87.00, '40000': 93.50, '45000': 100.00, '50000': 106.50
      },
      '46-60': {
        '10000': 64.00, '15000': 75.75, '20000': 87.50, '25000': 99.25, '30000': 111.00,
        '35000': 122.75, '40000': 134.50, '45000': 146.25, '50000': 158.00
      },
      '61-65': {
        '10000': 82.00, '15000': 103.00, '20000': 124.00, '25000': 145.00, '30000': 166.00,
        '35000': 187.00, '40000': 208.00, '45000': 229.00, '50000': 250.00
      },
      '66-70': {
        '10000': 100.50, '15000': 130.50, '20000': 160.50, '25000': 190.50, '30000': 220.50,
        '35000': 250.50, '40000': 280.50, '45000': 310.50, '50000': 340.50
      },
      '71-75': {
        '10000': 130.00, '15000': 174.50, '20000': 219.00, '25000': 263.50, '30000': 308.00,
        '35000': 352.50, '40000': 397.00, '45000': 441.50, '50000': 486.00
      }
    },
    partner: {
      '18-45': {
        '10000': 13.00, '15000': 19.50, '20000': 26.00, '25000': 32.50, '30000': 39.00,
        '35000': 45.50, '40000': 52.00, '45000': 58.50, '50000': 65.00
      },
      '46-60': {
        '10000': 23.50, '15000': 35.25, '20000': 47.00, '25000': 58.75, '30000': 70.50,
        '35000': 82.25, '40000': 94.00, '45000': 105.75, '50000': 117.50
      },
      '61-65': {
        '10000': 42.00, '15000': 63.00, '20000': 84.00, '25000': 105.00, '30000': 126.00,
        '35000': 147.00, '40000': 168.00, '45000': 189.00, '50000': 210.00
      },
      '66-70': {
        '10000': 60.00, '15000': 90.00, '20000': 120.00, '25000': 150.00, '30000': 180.00,
        '35000': 210.00, '40000': 240.00, '45000': 270.00, '50000': 300.00
      },
      '71-75': {
        '10000': 89.00, '15000': 133.50, '20000': 178.00, '25000': 222.50, '30000': 267.00,
        '35000': 311.50, '40000': 356.00, '45000': 400.50, '50000': 445.00
      }
    },
    children: {
      '0-20/24': {
        '10000': 10.50, '15000': 15.75, '20000': 21.00, '25000': 26.25, '30000': 31.50,
        '35000': 36.75, '40000': 42.00, '45000': 47.25, '50000': 52.50
      }
    },
    additionalChildren: {
      '0-20/24': {
        '10000': 5.25, '15000': 7.88, '20000': 10.50, '25000': 13.13, '30000': 15.75,
        '35000': 18.38, '40000': 21.00, '45000': 23.63, '50000': 26.25
      }
    },
    parents: {
      '18-45': {
        '2500': 3.38, '5000': 6.75, '7500': 10.13, '10000': 13.50, '12500': 16.88,
        '15000': 20.25, '17500': 23.63, '20000': 27.00, '22500': 30.38, '25000': 33.75
      },
      '46-60': {
        '2500': 6.50, '5000': 13.00, '7500': 19.50, '10000': 26.00, '12500': 32.50,
        '15000': 39.00, '17500': 45.50, '20000': 52.00, '22500': 58.50, '25000': 65.00
      },
      '61-65': {
        '2500': 11.88, '5000': 23.75, '7500': 35.63, '10000': 47.50, '12500': 59.38,
        '15000': 71.25, '17500': 83.13, '20000': 95.00, '22500': 106.88, '25000': 118.75
      },
      '66-70': {
        '2500': 17.38, '5000': 34.75, '7500': 52.13, '10000': 69.50, '12500': 86.88,
        '15000': 104.25, '17500': 121.63, '20000': 139.00, '22500': 156.38, '25000': 173.75
      },
      '71-75': {
        '2500': 25.00, '5000': 50.00, '7500': 75.00, '10000': 100.00, '12500': 125.00,
        '15000': 150.00, '17500': 175.00, '20000': 200.00, '22500': 225.00, '25000': 250.00
      },
      '76-80': {
        '2500': 36.00, '5000': 72.00, '7500': 108.00, '10000': 144.00, '12500': 180.00,
        '15000': 216.00, '17500': 252.00, '20000': 288.00, '22500': 324.00, '25000': 360.00
      },
      '81-85': {
        '2500': 49.88, '5000': 99.75, '7500': 149.63, '10000': 199.50, '12500': 249.38,
        '15000': 299.25, '17500': 349.13, '20000': 399.00, '22500': 448.88, '25000': 498.75
      }
    },
    extendedFamilyChildren: {
      '0-20/24': {
        '5000': 3.00, '10000': 6.00, '15000': 9.00, '20000': 12.00, '25000': 15.00
      }
    },
      extendedFamilyMembers:{
      '18-45': {
          '2500': 3.88, '5000': 7.75, '7500': 11.63, '10000': 15.50, '12500': 19.38,
          '15000': 23.25,'17500': 27.13, '20000': 31.00,'22500': 34.88, '25000': 38.75
      },
      '46-60': {
          '2500': 7.50,
          '5000': 15.00,
          '7500': 22.50,
          '10000': 30.00,
          '12500': 37.50,
          '15000': 45.00,
          '17500': 52.50,
          '20000': 60.00,
          '22500': 67.50,
          '25000': 75.00
      },
      '61-65': {
          '2500': 13.88,
          '5000': 27.75,
          '7500': 41.63,
          '10000': 55.50,
          '12500': 69.38,
          '15000': 83.25,
          '17500': 97.13,
          '20000': 111.00,
          '22500': 124.88,
          '25000': 138.75
      },
      '66-70': {
          '2500': 20.38,
          '5000': 40.75,
          '7500': 61.13,
          '10000': 81.50,
          '12500': 101.88,
          '15000': 122.25,
          '17500': 142.63,
          '20000': 163.00,
          '22500': 183.38,
          '25000': 203.75
      },
      '71-75': {
          '2500': 29.25,
          '5000': 58.50,
          '7500': 87.75,
          '10000': 117.00,
          '12500': 146.25,
          '15000': 175.50,
          '17500': 204.75,
          '20000': 234.00,
          '22500': 263.25,
          '25000': 292.50
      },
      '76-80': {
          '2500': 42.13,
          '5000': 84.25,
          '7500': 126.38,
          '10000': 168.50,
          '12500': 210.63,
          '15000': 252.75,
          '17500': 294.88,
          '20000': 337.00,
          '22500': 379.13,
          '25000': 421.25
      },
      '81-85': {
          '2500': 58.38,
          '5000': 116.75,
          '7500': 175.13,
          '10000': 233.50,
          '12500': 291.88,
          '15000': 350.25,
          '17500': 408.63,
          '20000': 467.00,
          '22500': 525.38,
          '25000': 583.75
      }
    }
  };
  
  const tombstoneBenefitData = {
    mainLifeInsured: {
      '18-45': {
        '5000': 5.75, '10000': 11.50
      },
      '46-60': {
        '5000': 10.75, '10000': 21.50
      },
      '61-65': {
        '5000': 18.75, '10000': 37.50
      },
      '66-70': {
        '5000': 27.00, '10000': 54.00
      },
      '71-75': {
        '5000': 40.00, '10000': 80.00
      }
    },
    partner: {
      '18-45': {
        '5000': 5.75, '10000': 11.50
      },
      '46-60': {
        '5000': 10.75, '10000': 21.50
      },
      '61-65': {
        '5000': 18.75, '10000': 37.50
      },
      '66-70': {
        '5000': 27.00, '10000': 54.00
      },
      '71-75': {
        '5000': 40.00, '10000': 80.00
      }
    },
    parents: {
      '18-45': {
        '5000': 6.75, '10000': 13.50
      },
      '46-60': {
        '5000': 13.00, '10000': 26.00
      },
      '61-65': {
        '5000': 23.75, '10000': 47.50
      },
      '66-70': {
        '5000': 34.75, '10000': 69.50
      },
      '71-75': {
        '5000': 50.00, '10000': 100.00
      },
      '76-80': {
        '5000': 72.00, '10000': 144.00
      },
      '81-85': {
        '5000': 99.75, '10000': 199.50
      }
    },
    extendedFamilyMembers: {
      '18-45': {
        '5000': 7.75, '10000': 15.50
      },
      '46-60': {
        '5000': 15.00, '10000': 30.00
      },
      '61-65': {
        '5000': 27.75, '10000': 55.50
      },
      '66-70': {
        '5000': 40.75, '10000': 81.50
      },
      '71-75': {
        '5000': 58.50, '10000': 117.00
      },
      '76-80': {
        '5000': 84.25, '10000': 168.50
      },
      '81-85': {
        '5000': 116.75, '10000': 233.50
      }
    }
  };

  const cowBenefitData = {
    mainLifeInsured: {
      '18-45': {
        '5000': 5.75, '10000': 11.50
      },
      '46-60': {
        '5000': 10.75, '10000': 21.50
      },
      '61-65': {
        '5000': 18.75, '10000': 37.50
      },
      '66-70': {
        '5000': 27.00, '10000': 54.00
      },
      '71-75': {
        '5000': 40.00, '10000': 80.00
      }
    },
    partner: {
      '18-45': {
        '5000': 5.75, '10000': 11.50
      },
      '46-60': {
        '5000': 10.75, '10000': 21.50
      },
      '61-65': {
        '5000': 18.75, '10000': 37.50
      },
      '66-70': {
        '5000': 27.00, '10000': 54.00
      },
      '71-75': {
        '5000': 40.00, '10000': 80.00
      }
    },
    parents: {
      '18-45': {
        '5000': 6.75, '10000': 13.50
      },
      '46-60': {
        '5000': 13.00, '10000': 26.00
      },
      '61-65': {
        '5000': 23.75, '10000': 47.50
      },
      '66-70': {
        '5000': 34.75, '10000': 69.50
      },
      '71-75': {
        '5000': 50.00, '10000': 100.00
      },
      '76-80': {
        '5000': 72.00, '10000': 144.00
      },
      '81-85': {
        '5000': 99.75, '10000': 199.50
      }
    },
    extendedFamilyMembers: {
      '18-45': {
        '5000': 7.75, '10000': 15.50
      },
      '46-60': {
        '5000': 15.00, '10000': 30.00
      },
      '61-65': {
        '5000': 27.75, '10000': 55.50
      },
      '66-70': {
        '5000': 40.75, '10000': 81.50
      },
      '71-75': {
        '5000': 58.50, '10000': 117.00
      },
      '76-80': {
        '5000': 84.25, '10000': 168.50
      },
      '81-85': {
        '5000': 116.75, '10000': 233.50
      }
    }
  };

  const monthlyProviderBenefitData = {
    mainLifeInsured: {
      '18-45': {
        '500x12': 6.90,
        '500x24': 13.80,
        '1000x12': 13.80,
        '1000x24': 27.60,
        '1500x12': 20.70,
        '2000x12': 27.60
      },
      '46-60': {
        '500x12': 12.90,
        '500x24': 25.80,
        '1000x12': 25.80,
        '1000x24': 51.60,
        '1500x12': 38.70,
        '2000x24': 51.60
      },
      '61-65': {
        '500x12': 22.50,
        '500x24': 45.00,
        '1000x12': 45.00,
        '1000x24': 90.00,
        '1500x12': 67.50,
        '2000x12': 90.00
      },
      '66-70': {
        '500x12': 32.40,
        '500x24': 64.80,
        '1000x12': 64.80,
        '1000x24': 129.60,
        '1500x12': 97.20,
        '2000x12': 129.60
      },
      '71-75': {
        '500x12': 48.00,
        '500x24': 96.00,
        '1000x12': 96.00,
        '1000x24': 192.00,
        '1500x12': 144.00,
        '2000x12': 192.00
      }
    },
    partner: {
      '18-45': {
        '500x12': 6.90,
        '500x24': 13.80,
        '1000x12': 13.80,
        '1000x24': 27.60,
        '1500x12': 20.70,
        '2000x12': 27.60
      },
      '46-60': {
        '500x12': 12.90,
        '500x24': 25.80,
        '1000x12': 25.80,
        '1000x24': 51.60,
        '1500x12': 38.70,
        '2000x24': 51.60
      },
      '61-65': {
        '500x12': 22.50,
        '500x24': 45.00,
        '1000x12': 45.00,
        '1000x24': 90.00,
        '1500x12': 67.50,
        '2000x12': 90.00
      },
      '66-70': {
        '500x12': 32.40,
        '500x24': 64.80,
        '1000x12': 64.80,
        '1000x24': 129.60,
        '1500x12': 97.20,
        '2000x12': 129.60
      },
      '71-75': {
        '500x12': 48.00,
        '500x24': 96.00,
        '1000x12': 96.00,
        '1000x24': 192.00,
        '1500x12': 144.00,
        '2000x12': 192.00
      }
    }
  };

  const deathIncomeBenefitData = {
    mainLifeInsured: {
      '18-45': {
        '2000x12': 27.60,
        '3000x12': 41.40,
        '4000x12': 55.20,
        '5000x12': 69.00,
        '6000x12': 82.80,
        '7000x12': 96.60,
        '8000x12': 110.40,
        '9000x12': 124.20,
        '10000x12': 138.00,
        '11000x12': 151.80,
        '12000x12': 165.60,
        '13000x12': 179.40,
        '14000x12': 193.20,
        '15000x12': 207.00,
        '16000x12': 220.80,
        '2000x24': 55.20,
        '3000x24': 82.80,
        '4000x24': 110.40,
        '5000x24': 138.00,
        '6000x24': 165.60,
        '7000x24': 193.20,
        '8000x24': 220.80,
        '2000x36': 82.80,
        '3000x36': 124.20,
        '4000x36': 165.60,
    '5000x36': 207.00,
    '2000x48': 110.40,
    '3000x48': 165.60,
    '4000x48': 220.80,
    '2000x60': 138.00,
    '3000x60': 207.00
      },
      '46-60': {
        '2000x12': 51.60,
        '3000x12': 77.40,
        '4000x12': 103.20,
        '5000x12': 129.00,
        '6000x12': 154.80,
        '7000x12': 180.60,
        '8000x12': 206.40,
        '9000x12': 232.20,
        '10000x12': 258.00,
        '11000x12': 283.80,
        '12000x12': 309.60,
        '13000x12': 335.40,
        '14000x12': 361.20,
        '15000x12': 387.00,
        '16000x12': 412.80,
        '2000x24': 103.20,
        '3000x24': 154.80,
        '4000x24': 206.40,
        '5000x24': 258.00,
        '6000x24': 309.60,
        '7000x24': 361.20,
        '8000x24': 412.80,
        '2000x36': 154.80,
        '3000x36': 232.20,
        '4000x36': 309.60,
    '5000x36': 387.00,
    '2000x48': 206.40,
    '3000x48': 309.60,
    '4000x48': 412.80,
    '2000x60': 258.00,
    '3000x60': 387.00
      },
      '61-65': {
        '2000x12': 90.00,
        '3000x12': 135.00,
        '4000x12': 180.00,
        '5000x12': 225.00,
        '6000x12': 270.00,
        '7000x12': 315.00,
        '8000x12': 360.00,
        '9000x12': 405.00,
        '10000x12': 450.00,
        '11000x12': 495.00,
        '12000x12': 540.00,
        '13000x12': 585.00,
        '14000x12': 630.00,
        '15000x12': 675.00,
        '16000x12': 720.00,
        '2000x24': 180.00,
        '3000x24': 270.00,
        '4000x24': 360.00,
        '5000x24': 450.00,
        '6000x24': 540.00,
        '7000x24': 630.00,
        '8000x24': 720.00,
        '2000x36': 270.00,
        '3000x36': 405.00,
        '4000x36': 540.00,
    '5000x36': 675.00,
    '2000x48': 360.00,
    '3000x48': 540.00,
    '4000x48': 720.00,
    '2000x60': 450.00,
    '3000x60': 675.00
      },
      '66-70': {
        '2000x12': 129.60,
        '3000x12': 194.40,
        '4000x12': 259.20,
        '5000x12': 324.00,
        '6000x12': 388.80,
        '7000x12': 453.60,
        '8000x12': 518.40,
        '9000x12': 583.20,
        '10000x12': 648.00,
        '11000x12': 712.80,
        '12000x12': 777.60,
        '13000x12': 842.40,
        '14000x12': 907.20,
        '15000x12': 972.00,
        '16000x12': 1036.80,
        '2000x24': 259.20,
        '3000x24': 388.80,
        '4000x24': 518.40,
        '5000x24': 648.00,
        '6000x24': 777.60,
        '7000x24': 907.20,
        '8000x24': 1036.80,
        '2000x36': 388.80,
        '3000x36': 583.20,
        '4000x36': 777.60,
    '5000x36': 972.00,
    '2000x48': 518.40,
    '3000x48': 777.60,
    '4000x48': 1036.80,
    '2000x60': 648.00,
    '3000x60': 972.00
      },
      '71-75': {
        '2000x12': 192.00,
        '3000x12': 288.00,
        '4000x12': 384.00,
        '5000x12': 480.00,
        '6000x12': 576.00,
        '7000x12': 672.00,
        '8000x12': 768.00,
        '9000x12': 864.00,
        '10000x12': 960.00,
        '11000x12': 1056.00,
        '12000x12': 1152.00,
        '13000x12': 1248.00,
        '14000x12': 1344.00,
        '15000x12': 1440.00,
        '16000x12': 1536.00,
        '2000x24': 384.00,
        '3000x24': 576.00,
        '4000x24': 768.00,
        '5000x24': 960.00,
        '6000x24': 1152.00,
        '7000x24': 1344.00,
        '8000x24': 1536.00,
        '2000x36': 576.00,
        '3000x36': 864.00,
        '4000x36': 1152.00,
    '5000x36': 1440.00,
    '2000x48': 768.00,
    '3000x48': 1152.00,
    '4000x48': 1536.00,
    '2000x60': 960.00,
    '3000x60': 1440.00
      }
    },
    partner: {
      '18-45': {
        '2000x12': 27.60,
        '3000x12': 41.40,
        '4000x12': 55.20,
        '5000x12': 69.00,
        '6000x12': 82.80,
        '7000x12': 96.60,
        '8000x12': 110.40,
        '9000x12': 124.20,
        '10000x12': 138.00,
        '11000x12': 151.80,
        '12000x12': 165.60,
        '13000x12': 179.40,
        '14000x12': 193.20,
        '15000x12': 207.00,
        '16000x12': 220.80,
        '2000x24': 55.20,
        '3000x24': 82.80,
        '4000x24': 110.40,
        '5000x24': 138.00,
        '6000x24': 165.60,
        '7000x24': 193.20,
        '8000x24': 220.80,
        '2000x36': 82.80,
        '3000x36': 124.20,
        '4000x36': 165.60,
    '5000x36': 207.00,
    '2000x48': 110.40,
    '3000x48': 165.60,
    '4000x48': 220.80,
    '2000x60': 138.00,
    '3000x60': 207.00
      },
      '46-60': {
        '2000x12': 51.60,
        '3000x12': 77.40,
        '4000x12': 103.20,
        '5000x12': 129.00,
        '6000x12': 154.80,
        '7000x12': 180.60,
        '8000x12': 206.40,
        '9000x12': 232.20,
        '10000x12': 258.00,
        '11000x12': 283.80,
        '12000x12': 309.60,
        '13000x12': 335.40,
        '14000x12': 361.20,
        '15000x12': 387.00,
        '16000x12': 412.80,
        '2000x24': 103.20,
        '3000x24': 154.80,
        '4000x24': 206.40,
        '5000x24': 258.00,
        '6000x24': 309.60,
        '7000x24': 361.20,
        '8000x24': 412.80,
        '2000x36': 154.80,
        '3000x36': 232.20,
        '4000x36': 309.60,
    '5000x36': 387.00,
    '2000x48': 206.40,
    '3000x48': 309.60,
    '4000x48': 412.80,
    '2000x60': 258.00,
    '3000x60': 387.00
      },
      '61-65': {
        '2000x12': 90.00,
        '3000x12': 135.00,
        '4000x12': 180.00,
        '5000x12': 225.00,
        '6000x12': 270.00,
        '7000x12': 315.00,
        '8000x12': 360.00,
        '9000x12': 405.00,
        '10000x12': 450.00,
        '11000x12': 495.00,
        '12000x12': 540.00,
        '13000x12': 585.00,
        '14000x12': 630.00,
        '15000x12': 675.00,
        '16000x12': 720.00,
        '2000x24': 180.00,
        '3000x24': 270.00,
        '4000x24': 360.00,
        '5000x24': 450.00,
        '6000x24': 540.00,
        '7000x24': 630.00,
        '8000x24': 720.00,
        '2000x36': 270.00,
        '3000x36': 405.00,
        '4000x36': 540.00,
    '5000x36': 675.00,
    '2000x48': 360.00,
    '3000x48': 540.00,
    '4000x48': 720.00,
    '2000x60': 450.00,
    '3000x60': 675.00
      },
      '66-70': {
        '2000x12': 129.60,
        '3000x12': 194.40,
        '4000x12': 259.20,
        '5000x12': 324.00,
        '6000x12': 388.80,
        '7000x12': 453.60,
        '8000x12': 518.40,
        '9000x12': 583.20,
        '10000x12': 648.00,
        '11000x12': 712.80,
        '12000x12': 777.60,
        '13000x12': 842.40,
        '14000x12': 907.20,
        '15000x12': 972.00,
        '16000x12': 1036.80,
        '2000x24': 259.20,
        '3000x24': 388.80,
        '4000x24': 518.40,
        '5000x24': 648.00,
        '6000x24': 777.60,
        '7000x24': 907.20,
        '8000x24': 1036.80,
        '2000x36': 388.80,
        '3000x36': 583.20,
        '4000x36': 777.60,
    '5000x36': 972.00,
    '2000x48': 518.40,
    '3000x48': 777.60,
    '4000x48': 1036.80,
    '2000x60': 648.00,
    '3000x60': 972.00
      },
      '71-75': {
        '2000x12': 192.00,
        '3000x12': 288.00,
        '4000x12': 384.00,
        '5000x12': 480.00,
        '6000x12': 576.00,
        '7000x12': 672.00,
        '8000x12': 768.00,
        '9000x12': 864.00,
        '10000x12': 960.00,
        '11000x12': 1056.00,
        '12000x12': 1152.00,
        '13000x12': 1248.00,
        '14000x12': 1344.00,
        '15000x12': 1440.00,
        '16000x12': 1536.00,
        '2000x24': 384.00,
        '3000x24': 576.00,
        '4000x24': 768.00,
        '5000x24': 960.00,
        '6000x24': 1152.00,
        '7000x24': 1344.00,
        '8000x24': 1536.00,
        '2000x36': 576.00,
        '3000x36': 864.00,
        '4000x36': 1152.00,
    '5000x36': 1440.00,
    '2000x48': 768.00,
    '3000x48': 1152.00,
    '4000x48': 1536.00,
    '2000x60': 960.00,
    '3000x60': 1440.00
      }
    }
  };
  
const lifeCoverBenefitData = {
  mainLifeInsured: {
      '18-45': {
          '10000': 11.50,
          '20000': 23.00,
          '30000': 34.50,
          '40000': 46.00,
          '50000': 57.50,
          '60000': 69.00,
          '70000': 80.50,
          '80000': 92.00,
          '90000': 103.50,
          '100000': 115.00,
          '110000': 126.50,
          '120000': 138.00,
          '130000': 149.50,
          '140000': 161.00,
          '150000': 172.50,
          '160000': 184.00,
          '170000': 195.50,
          '180000': 207.00,
          '190000': 218.50,
          '200000': 230.00,
      },
      '46-60': {
          '10000': 21.50,
          '20000': 43.00,
          '30000': 64.50,
          '40000': 86.00,
          '50000': 107.50,
          '60000': 129.00,
          '70000': 150.50,
          '80000': 172.00,
          '90000': 193.50,
          '100000': 215.00,
          '110000': 236.50,
          '120000': 258.00,
          '130000': 279.50,
          '140000': 301.00,
          '150000': 322.50,
          '160000': 344.00,
          '170000': 365.50,
          '180000': 387.00,
          '190000': 408.50,
          '200000': 430.00,
      },
      '61-65': {
          '10000': 37.50,
          '20000': 75.00,
          '30000': 112.50,
          '40000': 150.00,
          '50000': 187.50,
          '60000': 225.00,
          '70000': 262.50,
          '80000': 300.00,
          '90000': 337.50,
          '100000': 375.00,
          '110000': 412.50,
          '120000': 450.00,
          '130000': 487.50,
          '140000': 525.00,
          '150000': 562.50,
          '160000': 600.00,
          '170000': 637.50,
          '180000': 675.00,
          '190000': 712.50,
          '200000': 750.00,
      },
      '66-70': {
          '10000': 54.00,
          '20000': 108.00,
          '30000': 162.00,
          '40000': 216.00,
          '50000': 270.00,
          '60000': 324.00,
          '70000': 378.00,
          '80000': 432.00,
          '90000': 486.00,
          '100000': 540.00,
          '110000': 594.00,
          '120000': 648.00,
          '130000': 702.00,
          '140000': 756.00,
          '150000': 810.00,
          '160000': 864.00,
          '170000': 918.00,
          '180000': 972.00,
          '190000': 1026.00,
          '200000': 1080.00,
      },
      '71-75': {
          '10000': 80.00,
          '20000': 160.00,
          '30000': 240.00,
          '40000': 320.00,
          '50000': 400.00,
          '60000': 480.00,
          '70000': 560.00,
          '80000': 640.00,
          '90000': 720.00,
          '100000': 800.00,
          '110000': 880.00,
          '120000': 960.00,
          '130000': 1040.00,
          '140000': 1120.00,
          '150000': 1200.00,
          '160000': 1280.00,
          '170000': 1360.00,
          '180000': 1440.00,
          '190000': 1520.00,
          '200000': 1600.00,
      },
  },
  partner: {
    '18-45': {
        '10000': 11.50,
        '20000': 23.00,
        '30000': 34.50,
        '40000': 46.00,
        '50000': 57.50,
        '60000': 69.00,
        '70000': 80.50,
        '80000': 92.00,
        '90000': 103.50,
        '100000': 115.00,
        '110000': 126.50,
        '120000': 138.00,
        '130000': 149.50,
        '140000': 161.00,
        '150000': 172.50,
        '160000': 184.00,
        '170000': 195.50,
        '180000': 207.00,
        '190000': 218.50,
        '200000': 230.00,
    },
    '46-60': {
        '10000': 21.50,
        '20000': 43.00,
        '30000': 64.50,
        '40000': 86.00,
        '50000': 107.50,
        '60000': 129.00,
        '70000': 150.50,
        '80000': 172.00,
        '90000': 193.50,
        '100000': 215.00,
        '110000': 236.50,
        '120000': 258.00,
        '130000': 279.50,
        '140000': 301.00,
        '150000': 322.50,
        '160000': 344.00,
        '170000': 365.50,
        '180000': 387.00,
        '190000': 408.50,
        '200000': 430.00,
    },
    '61-65': {
        '10000': 37.50,
        '20000': 75.00,
        '30000': 112.50,
        '40000': 150.00,
        '50000': 187.50,
        '60000': 225.00,
        '70000': 262.50,
        '80000': 300.00,
        '90000': 337.50,
        '100000': 375.00,
        '110000': 412.50,
        '120000': 450.00,
        '130000': 487.50,
        '140000': 525.00,
        '150000': 562.50,
        '160000': 600.00,
        '170000': 637.50,
        '180000': 675.00,
        '190000': 712.50,
        '200000': 750.00,
    },
    '66-70': {
        '10000': 54.00,
        '20000': 108.00,
        '30000': 162.00,
        '40000': 216.00,
        '50000': 270.00,
        '60000': 324.00,
        '70000': 378.00,
        '80000': 432.00,
        '90000': 486.00,
        '100000': 540.00,
        '110000': 594.00,
        '120000': 648.00,
        '130000': 702.00,
        '140000': 756.00,
        '150000': 810.00,
        '160000': 864.00,
        '170000': 918.00,
        '180000': 972.00,
        '190000': 1026.00,
        '200000': 1080.00,
    },
    '71-75': {
        '10000': 80.00,
        '20000': 160.00,
        '30000': 240.00,
        '40000': 320.00,
        '50000': 400.00,
        '60000': 480.00,
        '70000': 560.00,
        '80000': 640.00,
        '90000': 720.00,
        '100000': 800.00,
        '110000': 880.00,
        '120000': 960.00,
        '130000': 1040.00,
        '140000': 1120.00,
        '150000': 1200.00,
        '160000': 1280.00,
        '170000': 1360.00,
        '180000': 1440.00,
        '190000': 1520.00,
        '200000': 1600.00,
    },
}
};

const insuredTypeShortNames = {
  mainLifeInsured: 'MLI',
  partner: 'PTN',
  children: 'CHD',
  additionalChildren: 'ADC',
  extendedFamilyChildren: 'EFC',
  parents: 'PRS',
  extendedFamilyMembers: 'EFM',
};

const insuredTypeLongNames = {
  mainLifeInsured: 'Main Life Insured',
  partner: 'Partner',
  children: 'Children',
  additionalChildren: 'Additional Child',
  extendedFamilyChildren: 'Extended Family Child',
  parents: 'Parent',
  extendedFamilyMembers: 'Extended Family Member',
};

const getAgeBands = (data, insuredType) => {
  if (insuredType) {
    return Object.keys(data[insuredType]);
  }
  return [];
};

const getSumAssuredOptions = (data, insuredType, ageBand) => {
  if (insuredType && ageBand) {
    return Object.keys(data[insuredType][ageBand]);
  }
  return [];
};

const getSumAssuredAmounts = (data, insuredType, ageBand) => {
  if (!data[insuredType] || !data[insuredType][ageBand]) return [];
  return Object.keys(data[insuredType][ageBand])
    .map((key) => key.split('x')[0])
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
};

const getAmount = (data, type, ageBand, sumAssured) => {
  if (!data || !type || !ageBand || !sumAssured) {
    return 0;
  }

  const insuredData = data[type];
  if (!insuredData || !insuredData[ageBand] || !insuredData[ageBand][sumAssured]) {
    return 0;
  }

  return insuredData[ageBand][sumAssured];
};

const handleSumAssuredChange = (benefitType, insuredType, value) => {
  if (benefitType === 'funeral') {
    setSelectedFuneralSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
  } else if (benefitType === 'tombstone') {
    setSelectedTombstoneSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
  } else if (benefitType === 'cow') {
    setSelectedCowSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
   } else if (benefitType === 'familyProvider') {
      setSelectedAgeBands((prev) => ({
        ...prev,
        [insuredType]: value,
      }));
      setFamilyProviderSelectedSumAssured((prev) => ({
        ...prev,
        [insuredType]: '',
      }));
    } else if (benefitType === 'deathIncome') {
      setSelectedAgeBands((prev) => ({
        ...prev,
        [insuredType]: value,
      }));
      setDeathIncomeSelectedSumAssured((prev) => ({
        ...prev,
        [insuredType]: '',
      }));
    } else if (benefitType === 'lifeCover') {
      setSelectedAgeBands((prev) => ({
        ...prev,
        [insuredType]: value,
      }));
      setSelectedSumAssured((prev) => ({
        ...prev,
        [insuredType]: '',
      }));
    }
    calculateTotalSumAssured();
};


const getPeriodOptions = (data, insuredType, ageBand, sumAssured) => {
  if (!data[insuredType] || !data[insuredType][ageBand]) return [];
  return Object.keys(data[insuredType][ageBand])
    .filter((key) => key.startsWith(sumAssured))
    .map((key) => key.split('x')[1]);
};



const calculateTotalFuneralPremium = () => {
  let totalPremium = 0;
  let mainLifeInsuredAlreadyAdded = false;

  const addAmountIfValid = (insuredType, sumAssured, mainLifeInsuredSumAssured) => {
    if (sumAssured && sumAssured <= mainLifeInsuredSumAssured) {
      totalPremium += getAmount(funeralBenefitData, insuredType, selectedAgeBands[insuredType], sumAssured);
    }
  };

  selectedFuneralInsuredTypes.forEach((insuredType) => {
    const ageBand = selectedAgeBands[insuredType];
    const sumAssured = selectedFuneralSumAssured[insuredType];
    const mainLifeInsuredSumAssured = selectedFuneralSumAssured['mainLifeInsured'];

    if (ageBand && sumAssured) {
      if (insuredType === 'mainLifeInsured' && !mainLifeInsuredAlreadyAdded) {
        addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
        mainLifeInsuredAlreadyAdded = true;
      } else if (insuredType !== 'mainLifeInsured') {
        addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
      }
    }
  }); 

  const addPremiumsForDependentInsuredTypes = (insuredTypePrefix, count) => {
    const baseSumAssured = selectedFuneralSumAssured[insuredTypePrefix];
    for (let i = 0; i < count; i++) {
      const insuredType = `${insuredTypePrefix}_${i + 1}`;
      if (selectedFuneralInsuredTypes.includes(insuredType)) {
        const sumAssured = selectedFuneralSumAssured[insuredType];
        if (sumAssured && baseSumAssured !== 0) {
          totalPremium += parseFloat(getAmount(funeralBenefitData, insuredTypePrefix, selectedAgeBands[insuredType], sumAssured).toFixed(2));
        }
      }
    }
  };

  // Add premiums for additional children
  addPremiumsForDependentInsuredTypes('additionalChildren', additionalChildrenCount);

  // Add premiums for parents
  addPremiumsForDependentInsuredTypes('parents', parentsCount);

  // Add premiums for extended family children
  addPremiumsForDependentInsuredTypes('extendedFamilyChildren', extendedFamilyChildrenCount);

  // Add premiums for extended family members
  addPremiumsForDependentInsuredTypes('extendedFamilyMembers', extendedFamilyMembersCount);

  setTotalFuneralPremium(totalPremium);
};

useEffect(() => {
  calculateTotalFuneralPremium();
}, [
  selectedFuneralSumAssured,
  selectedAgeBands,
  selectedFuneralInsuredTypes, // Added dependency
  additionalChildrenCount,
  parentsCount,
  extendedFamilyChildrenCount,
  extendedFamilyMembersCount,
]);




const calculateTotalTombstonePremium = () => {
  let totalPremium = 0;
  let mainLifeInsuredAlreadyAdded = false;

  const addAmountIfValid = (insuredType, sumAssured, mainLifeInsuredSumAssured) => {
    if (sumAssured && sumAssured <= mainLifeInsuredSumAssured) {
      totalPremium += getAmount(tombstoneBenefitData, insuredType, selectedAgeBands[insuredType], sumAssured);
    }
  };

  selectedTombstoneInsuredTypes.forEach((insuredType) => {
    if (selectedFuneralInsuredTypes.includes(insuredType)) {
      const ageBand = selectedAgeBands[insuredType];
      const sumAssured = selectedTombstoneSumAssured[insuredType];
      const mainLifeInsuredSumAssured = selectedTombstoneSumAssured['mainLifeInsured'];

      if (ageBand && sumAssured) {
        if (insuredType === 'mainLifeInsured' && !mainLifeInsuredAlreadyAdded) {
          addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
          mainLifeInsuredAlreadyAdded = true;
        } else if (insuredType !== 'mainLifeInsured') {
          addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
        }
      }
    }
  });

  // Add premiums for parents
  for (let i = 0; i < parentsCount; i++) {
    const insuredType = `parents_${i + 1}`;
    if (selectedFuneralInsuredTypes.includes(insuredType) && selectedTombstoneInsuredTypes.includes(insuredType)) {
      if (selectedTombstoneSumAssured[insuredType]) {
        totalPremium += parseFloat(getAmount(tombstoneBenefitData, 'parents', selectedAgeBands[insuredType], selectedTombstoneSumAssured[insuredType]).toFixed(2));
      }
    }
  }

  // Add premiums for extended family members
  for (let i = 0; i < extendedFamilyMembersCount; i++) {
    const insuredType = `extendedFamilyMembers_${i + 1}`;
    if (selectedFuneralInsuredTypes.includes(insuredType) && selectedTombstoneInsuredTypes.includes(insuredType)) {
      if (selectedTombstoneSumAssured[insuredType]) {
        totalPremium += parseFloat(getAmount(tombstoneBenefitData, 'extendedFamilyMembers', selectedAgeBands[insuredType], selectedTombstoneSumAssured[insuredType]).toFixed(2));
      }
    }
  }

  setTotalTombstonePremium(totalPremium);
};

useEffect(() => {
  calculateTotalTombstonePremium();
}, [
  selectedTombstoneInsuredTypes,
  selectedAgeBands,
  selectedTombstoneSumAssured,
  selectedFuneralInsuredTypes,
  parentsCount,
  extendedFamilyMembersCount,
]);



const calculateTotalCowPremium = () => {
  let totalPremium = 0;
  let mainLifeInsuredAlreadyAdded = false;

  const addAmountIfValid = (insuredType, sumAssured, mainLifeInsuredSumAssured) => {
    if (sumAssured && sumAssured <= mainLifeInsuredSumAssured) {
      totalPremium += getAmount(cowBenefitData, insuredType, selectedAgeBands[insuredType], sumAssured);
    }
  };

  selectedCowInsuredTypes.forEach((insuredType) => {
    if (selectedFuneralInsuredTypes.includes(insuredType)) {
      const ageBand = selectedAgeBands[insuredType];
      const sumAssured = selectedCowSumAssured[insuredType];
      const mainLifeInsuredSumAssured = selectedCowSumAssured['mainLifeInsured'];

      if (ageBand && sumAssured) {
        if (insuredType === 'mainLifeInsured' && !mainLifeInsuredAlreadyAdded) {
          addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
          mainLifeInsuredAlreadyAdded = true;
        } else if (insuredType !== 'mainLifeInsured') {
          addAmountIfValid(insuredType, parseFloat(sumAssured), parseFloat(mainLifeInsuredSumAssured));
        }
      }
    }
  });

  // Add premiums for parents
  for (let i = 0; i < parentsCount; i++) {
    const insuredType = `parents_${i + 1}`;
    if (selectedFuneralInsuredTypes.includes(insuredType) && selectedCowInsuredTypes.includes(insuredType)) {
      if (selectedCowSumAssured[insuredType]) {
        totalPremium += parseFloat(getAmount(cowBenefitData, 'parents', selectedAgeBands[insuredType], selectedCowSumAssured[insuredType]).toFixed(2));
      }
    }
  }

  // Add premiums for extended family members
  for (let i = 0; i < extendedFamilyMembersCount; i++) {
    const insuredType = `extendedFamilyMembers_${i + 1}`;
    if (selectedFuneralInsuredTypes.includes(insuredType) && selectedCowInsuredTypes.includes(insuredType)) {
      if (selectedCowSumAssured[insuredType]) {
        totalPremium += parseFloat(getAmount(cowBenefitData, 'extendedFamilyMembers', selectedAgeBands[insuredType], selectedCowSumAssured[insuredType]).toFixed(2));
      }
    }
  }

  setTotalCowPremium(totalPremium);
};

useEffect(() => {
  calculateTotalCowPremium();
}, [
  selectedCowInsuredTypes,
  selectedAgeBands,
  selectedCowSumAssured,
  selectedFuneralInsuredTypes,
  parentsCount,
  extendedFamilyMembersCount,
]);




const handleMonthlyProviderRadioButtonPress = (insuredType) => {
  if (insuredType === 'mainLifeInsured') {
    // Ensure 'mainLifeInsured' is always included and cannot be toggled off
    setSelectedMonthlyProviderInsuredTypes((prevTypes) => 
      prevTypes.includes(insuredType) ? prevTypes : [...prevTypes, insuredType]
    );
  } else {
    setSelectedMonthlyProviderInsuredTypes((prevTypes) => {
      const newTypes = prevTypes.includes(insuredType)
        ? prevTypes.filter((type) => type !== insuredType)
        : [...prevTypes, insuredType];

      if (!newTypes.includes(insuredType)) {
        // If removing insuredType, keep the current state for Age Band, Sum Assured, and Period
        return newTypes;
      }

      // If adding insuredType, only update the state if it's a new selection
      setFamilyProviderSelectedAgeBands((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));
      setFamilyProviderSelectedSumAssured((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));
      setFamilyProviderSelectedPeriods((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));

      return newTypes;
    });
  }
};

const handleDeathIncomeRadioButtonPress = (insuredType) => {
  setSelectedDeathIncomeTypes((prevTypes) => {
    if (insuredType === 'mainLifeInsured') {
      // Ensure 'mainLifeInsured' is always included and cannot be toggled off
      return prevTypes.includes(insuredType) ? prevTypes : [...prevTypes, insuredType];
    } else {
      const newTypes = prevTypes.includes(insuredType)
        ? prevTypes.filter((type) => type !== insuredType)
        : [...prevTypes, insuredType];

      if (!newTypes.includes(insuredType)) {
        // If removing insuredType, keep the current state for Age Band, Sum Assured, and Period
        return newTypes;
      }

      // If adding insuredType, only update the state if it's a new selection
      setDeathIncomeSelectedAgeBands((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));
      setDeathIncomeSelectedSumAssured((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));
      setDeathIncomeSelectedPeriods((prev) => ({
        ...prev,
        [insuredType]: prev[insuredType] || '',
      }));

      return newTypes;
    }
  });
};

const handleLifeCoverRadioButtonPress = (insuredType) => {
  setSelectedLifeCoverInsuredTypes((prevSelected) => {
    if (insuredType === 'mainLifeInsured') {
      // Ensure 'mainLifeInsured' is always included and cannot be toggled off
      return prevSelected.includes(insuredType) ? prevSelected : [...prevSelected, insuredType];
    } else {
      // Add or remove the insured type as required
      return prevSelected.includes(insuredType)
        ? prevSelected.filter((type) => type !== insuredType)
        : [...prevSelected, insuredType];
    }
  });
};

const handleAgeBandChange = (benefitType, insuredType, value) => {
  setSelectedAgeBands((prevAgeBands) => ({
    ...prevAgeBands,
    [insuredType]: value,
  }));
  if (benefitType === 'funeral') {
    setSelectedFuneralSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: '',
    }));
  } else if (benefitType === 'tombstone') {
    setSelectedTombstoneSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: '',
    }));
  } else if (benefitType === 'cow') {
    setSelectedCowSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: '',
    }));
  }else if (benefitType === 'familyProvider') {
    setFamilyProviderSelectedSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
    setFamilyProviderSelectedPeriods((prevPeriods) => ({
      ...prevPeriods,
      [insuredType]: '',
    }));
  } else if (benefitType === 'deathIncome') {
    setDeathIncomeSelectedSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
    setDeathIncomeSelectedPeriods((prevPeriods) => ({
      ...prevPeriods,
      [insuredType]: '',
    }));
  } else if (benefitType === 'lifeCover') {
    setSelectedSumAssured((prevSumAssured) => ({
      ...prevSumAssured,
      [insuredType]: value,
    }));
  }
};

const handleRadioButtonPress = (benefitType, insuredType) => {
  if (benefitType === 'funeral') {
    if (insuredType === 'children' || insuredType === 'additionalChildren' || insuredType === 'extendedFamilyChildren') {
      // Automatically set the age band for children-related insured types
      handleAgeBandChange('funeral', insuredType, '0-20/24');
    }
    // Ensure 'mainLifeInsured' is always 'on' and cannot be toggled off
    if (insuredType === 'mainLifeInsured') {
      setSelectedFuneralInsuredTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
      setSelectedFuneralInsuredTypes((prevSelected) => {
        const updatedSelected = prevSelected.includes(insuredType)
          ? prevSelected.filter((type) => type !== insuredType)
          : [...prevSelected, insuredType];
          
          
        // Check if the base insured type's amount is being zeroed out
        if (!updatedSelected.includes(insuredType)) {
          zeroOutDependentInsuredTypes('funeral', insuredType);
          // Trigger reset for other benefits if applicable
          zeroOutDependentInsuredTypes('tombstone', insuredType);
          zeroOutDependentInsuredTypes('cow', insuredType);
        }

        return updatedSelected;
      });
    }
  } else if (benefitType === 'tombstone') {
    if (insuredType === 'mainLifeInsured') {
      setSelectedTombstoneInsuredTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
      setSelectedTombstoneInsuredTypes((prevSelected) => 
        prevSelected.includes(insuredType) ? prevSelected.filter((type) => type !== insuredType) : [...prevSelected, insuredType]
      );

      /*
      // Check if the base insured type's amount is being zeroed out
      if (!selectedTombstoneInsuredTypes.includes(insuredType)) {
        zeroOutDependentInsuredTypes('tombstone', insuredType);
      }*/
    }
  } else if (benefitType === 'cow') {
    if (insuredType === 'mainLifeInsured') {
      setSelectedCowInsuredTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
      setSelectedCowInsuredTypes((prevSelected) => 
        prevSelected.includes(insuredType) ? prevSelected.filter((type) => type !== insuredType) : [...prevSelected, insuredType]
      );

      /*
      // Check if the base insured type's amount is being zeroed out
      if (!selectedCowInsuredTypes.includes(insuredType)) {
        zeroOutDependentInsuredTypes('cow', insuredType);
      }
        */
    }
  }
 else if (benefitType === 'familyProvider') {
    if (insuredType === 'mainLifeInsured') {
      
      setSelectedMonthlyProviderInsuredTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
    setSelectedMonthlyProviderInsuredTypes((prevTypes) =>
      prevTypes.includes(insuredType)
        ? prevTypes.filter((type) => type !== insuredType)
        : [...prevTypes, insuredType]
    );
  }
  } else if (benefitType === 'deathIncome') {
    if (insuredType === 'mainLifeInsured') {
      
      setSelectedDeathIncomeTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
    setSelectedDeathIncomeTypes((prevTypes) =>
      prevTypes.includes(insuredType)
        ? prevTypes.filter((type) => type !== insuredType)
        : [...prevTypes, insuredType]
    );
  }
  } else if (benefitType === 'lifeCover') {
    if (insuredType === 'mainLifeInsured') {
      
      setSelectedLifeCoverTypes((prevSelected) => [...prevSelected, insuredType]);
    } else {
    setSelectedLifeCoverTypes((prevTypes) =>
      prevTypes.includes(insuredType)
        ? prevTypes.filter((type) => type !== insuredType)
        : [...prevTypes, insuredType]
    );
  }
}
};

const zeroOutDependentInsuredTypes = (benefitType, baseInsuredType) => {
  const dependentPrefixes = ['additionalChildren', 'parents', 'extendedFamilyChildren', 'extendedFamilyMembers'];

  dependentPrefixes.forEach((prefix) => {
    if (baseInsuredType.startsWith(prefix)) {
      for (let i = 0; i < 10; i++) { // assuming a maximum of 10 dependents for each type
        const insuredType = `${prefix}_${i + 1}`;
        switch (benefitType) {
          case 'funeral':
            if (selectedFuneralInsuredTypes.includes(insuredType)) {
              setSelectedFuneralInsuredTypes((prevSelected) => 
                prevSelected.filter((type) => type !== insuredType)
              );
              setSelectedFuneralSumAssured((prevSumAssured) => ({
                ...prevSumAssured,
                [insuredType]: 0
              }));
            }
            break;
          case 'tombstone':
            if (selectedTombstoneInsuredTypes.includes(insuredType)) {
              setSelectedTombstoneInsuredTypes((prevSelected) => 
                prevSelected.filter((type) => type !== insuredType)
              );
              setSelectedTombstoneSumAssured((prevSumAssured) => ({
                ...prevSumAssured,
                [insuredType]: ''
              }));
            }
            break;
          case 'cow':
            if (selectedCowInsuredTypes.includes(insuredType)) {
              setSelectedCowInsuredTypes((prevSelected) => 
                prevSelected.filter((type) => type !== insuredType)
              );
              setSelectedCowSumAssured((prevSumAssured) => ({
                ...prevSumAssured,
                [insuredType]: ''
              }));
            }
            break;
          default:
            break;
        }
      }
    }
  })
}



const calculateTotalDeathIncomePremium = () => {
  let totalPremium = 0;

  const mainLifeInsuredSumAssured = deathIncomeSelectedSumAssured['mainLifeInsured'];
  const mainLifeInsuredSumAssuredPartner = deathIncomeSelectedSumAssured['partner'];
  const mainLifeInsuredPeriod = deathIncomeSelectedPeriods['mainLifeInsured'];
  const mainLifeInsuredAmount = getAmount(
    deathIncomeBenefitData,
    'mainLifeInsured',
    selectedAgeBands['mainLifeInsured'],
    `${mainLifeInsuredSumAssured}x${mainLifeInsuredPeriod}`
  );

  const addAmountIfValid = (insuredType, sumAssured, period) => {
    if (sumAssured && period) {
      const ageBand = selectedAgeBands[insuredType];
      const amount = getAmount(deathIncomeBenefitData, insuredType, ageBand, `${sumAssured}x${period}`);
      if (mainLifeInsuredSumAssuredPartner && parseFloat(mainLifeInsuredSumAssuredPartner) <= parseFloat(mainLifeInsuredSumAssured)) {
        totalPremium += parseFloat(amount);
      }
    }
  };

  selectedDeathIncomeTypes.forEach((insuredType) => {
    if (selectedFuneralInsuredTypes.includes(insuredType) && insuredType !== 'mainLifeInsured') {
      const sumAssured = deathIncomeSelectedSumAssured[insuredType];
      const period = deathIncomeSelectedPeriods[insuredType];
      addAmountIfValid(insuredType, sumAssured, period);
    }
  });

  // Ensure mainLifeInsured is included in the total if it's selected
  if (selectedFuneralInsuredTypes.includes('mainLifeInsured')) {
    totalPremium += parseFloat(mainLifeInsuredAmount);
  }

  return totalPremium;
};

const totalDeathIncomePremium = calculateTotalDeathIncomePremium();

useEffect(() => {
  const total = calculateTotalDeathIncomePremium();
  // Set the total premium to state if needed, e.g., setTotalDeathIncomePremium(total);
}, [
  selectedDeathIncomeTypes,
  selectedAgeBands,
  deathIncomeSelectedSumAssured,
  deathIncomeSelectedPeriods,
  selectedFuneralInsuredTypes, // New line
]);



const calculateTotalLifeCoverPremium = () => { 
  let totalPremium = 0;

  // Assuming 'lifeCoverBenefitData' is the correct data source
  const mainLifeInsuredSumAssured = lifeSelectedSumAssured['mainLifeInsured'];
  const mainLifeInsuredSumAssuredPartner = lifeSelectedSumAssured['partner'];
  const mainLifeInsuredAmount = getAmount(
    lifeCoverBenefitData, // Replace 'data' with the correct reference
    'mainLifeInsured',
    selectedAgeBands['mainLifeInsured'],
    mainLifeInsuredSumAssured
  );

  const addAmountIfValid = (insuredType, sumAssured) => {
    if (sumAssured) {
      const ageBand = selectedAgeBands[insuredType];
      const amount = getAmount(lifeCoverBenefitData, insuredType, ageBand, sumAssured);
      if (mainLifeInsuredSumAssuredPartner && parseFloat(mainLifeInsuredSumAssuredPartner) <= parseFloat(mainLifeInsuredSumAssured)) {
        totalPremium += parseFloat(amount);
      }
    }
  };

  // Use 'selectedLifeCoverTypes' instead of 'selectedInsuredTypes'
  selectedLifeCoverTypes.forEach((insuredType) => {
    if (selectedFuneralInsuredTypes.includes(insuredType) && insuredType !== 'mainLifeInsured') {
      const sumAssured = lifeSelectedSumAssured[insuredType];
      addAmountIfValid(insuredType, sumAssured);
    }
  });

  // Ensure 'mainLifeInsured' is included in the total if it's selected
  if (selectedFuneralInsuredTypes.includes('mainLifeInsured')) {
    totalPremium += parseFloat(mainLifeInsuredAmount);
  }

  // Set the total life cover premium
  setTotalLifeCoverPremium(totalPremium);
};



useEffect(() => {
  calculateTotalLifeCoverPremium();
}, [
  lifeCoverBenefitData,
  selectedLifeCoverTypes,
  selectedAgeBands,
  lifeSelectedSumAssured,
  selectedFuneralInsuredTypes, // New line
]);



const calculateTotalFamilyProviderPremium = () => {
  let totalPremium = 0;

  const mainLifeInsuredSumAssured = familyProviderSelectedSumAssured['mainLifeInsured'];
  const mainLifeInsuredPeriod = familyProviderSelectedPeriods['mainLifeInsured'];
  const mainLifeInsuredAmount = getAmount(
    monthlyProviderBenefitData,
    'mainLifeInsured',
    selectedAgeBands['mainLifeInsured'],
    `${mainLifeInsuredSumAssured}x${mainLifeInsuredPeriod}`
  );

  const addAmountIfValid = (insuredType, sumAssured, period) => {
    if (sumAssured && period) {
      const ageBand = selectedAgeBands[insuredType];
      const amount = getAmount(monthlyProviderBenefitData, insuredType, ageBand, `${sumAssured}x${period}`);
      if (amount && parseFloat(amount) <= parseFloat(mainLifeInsuredAmount)) {
        totalPremium += parseFloat(amount);
      }
    }
  };

  selectedMonthlyProviderInsuredTypes.forEach((insuredType) => {
    if (selectedFuneralInsuredTypes.includes(insuredType) && insuredType !== 'mainLifeInsured') {
      const sumAssured = familyProviderSelectedSumAssured[insuredType];
      const period = familyProviderSelectedPeriods[insuredType];
      addAmountIfValid(insuredType, sumAssured, period);
    }
  });

  // Ensure mainLifeInsured is included in the total if it's selected
  if (selectedFuneralInsuredTypes.includes('mainLifeInsured')) {
    totalPremium += parseFloat(mainLifeInsuredAmount);
  }

  setTotalFamilyProviderPremium(totalPremium);
};

useEffect(() => {
  calculateTotalFamilyProviderPremium();
}, [
  selectedMonthlyProviderInsuredTypes,
  selectedAgeBands,
  familyProviderSelectedSumAssured,
  familyProviderSelectedPeriods,
  selectedFuneralInsuredTypes, // New line
]);


useEffect(() => {
  let total = totalFuneralPremium + totalTombstonePremium + totalCowPremium + totalFamilyProviderPremium;

  if (selectedFuneralInsuredTypes.includes('mainLifeInsured') &&
    selectedFuneralSumAssured['mainLifeInsured'] === '50000') {
    total += totalDeathIncomePremium + totalLifeCoverPremium;
  }

  setTotalPremium(total);
}, [totalFuneralPremium, totalTombstonePremium, totalCowPremium, totalDeathIncomePremium, totalFamilyProviderPremium, totalLifeCoverPremium, selectedFuneralInsuredTypes, selectedFuneralSumAssured]);


const calculateTotalSumAssured = () => {
  let totalMainLife = 0;
  let totalPartner = 0;

  // Calculate totals for mainLifeInsured
  if (selectedFuneralSumAssured['mainLifeInsured']) totalMainLife += parseFloat(selectedFuneralSumAssured['mainLifeInsured'] || 0);
  if (selectedTombstoneSumAssured['mainLifeInsured']) totalMainLife += parseFloat(selectedTombstoneSumAssured['mainLifeInsured'] || 0);
  if (selectedCowSumAssured['mainLifeInsured']) totalMainLife += parseFloat(selectedCowSumAssured['mainLifeInsured'] || 0);
  if (familyProviderSelectedSumAssured['mainLifeInsured']) {
    const sumAssured = parseFloat(familyProviderSelectedSumAssured['mainLifeInsured'] || 0);
    const period = parseFloat(familyProviderSelectedPeriods['mainLifeInsured'] || 0);
    totalMainLife += sumAssured * period;
  }

  // Calculate totals for partner
  if (selectedFuneralSumAssured['partner']) totalPartner += parseFloat(selectedFuneralSumAssured['partner'] || 0);
  if (selectedTombstoneSumAssured['partner']) totalPartner += parseFloat(selectedTombstoneSumAssured['partner'] || 0);
  if (selectedCowSumAssured['partner']) totalPartner += parseFloat(selectedCowSumAssured['partner'] || 0);
  if (familyProviderSelectedSumAssured['partner']) {
    const sumAssured = parseFloat(familyProviderSelectedSumAssured['partner'] || 0);
    const period = parseFloat(familyProviderSelectedPeriods['partner'] || 0);
    totalPartner += sumAssured * period;
  }

  // Set the total sum assured for mainLife and partner
  setTotalSumAssuredMainLife(totalMainLife);
  setTotalSumAssuredPartner(totalPartner);

  // Error handling
  const errors = [];
  const successes = [];

  if (totalMainLife > 75000) {
    errors.push('Main Life Insured total cover should not exceed M75000.');
  }
  if (totalPartner > 75000) {
    errors.push('Partner total cover should not exceed M75000.');
  }

  if (errors.length > 0) {
    setErrorMessage(errors);
    setSuccessMessage([]);
    setHadError(true);
    setModalVisible(true);
  } else {
    if (hadError) {
      successes.push('Cover limit successfully resolved');
      setModalVisible(true);
    }
    setErrorMessage([]);
    setSuccessMessage(successes);
    setHadError(false);
  }

  setTotalSumAssured(totalMainLife + totalPartner);
};

useEffect(() => {
  calculateTotalSumAssured();
}, [selectedFuneralSumAssured, selectedTombstoneSumAssured, selectedCowSumAssured, familyProviderSelectedSumAssured, familyProviderSelectedPeriods]);




const calculateTotalSumAssuredThree = () => {
  let totalMainLife = 0;
  let totalPartner = 0;

  // Calculate totals for mainLifeInsured
  Object.keys(selectedFuneralSumAssured).forEach((key) => {
    if (key === 'mainLifeInsured') {
      totalMainLife += parseFloat(selectedFuneralSumAssured[key] || 0);
    } else if (key === 'partner') {
      totalPartner += parseFloat(selectedFuneralSumAssured[key] || 0);
    }
  });

  Object.keys(selectedTombstoneSumAssured).forEach((key) => {
    if (key === 'mainLifeInsured') {
      totalMainLife += parseFloat(selectedTombstoneSumAssured[key] || 0);
    } else if (key === 'partner') {
      totalPartner += parseFloat(selectedTombstoneSumAssured[key] || 0);
    }
  });

  Object.keys(selectedCowSumAssured).forEach((key) => {
    if (key === 'mainLifeInsured') {
      totalMainLife += parseFloat(selectedCowSumAssured[key] || 0);
    } else if (key === 'partner') {
      totalPartner += parseFloat(selectedCowSumAssured[key] || 0);
    }
  });

  Object.keys(familyProviderSelectedSumAssured).forEach((insuredType) => {
    const sumAssured = parseFloat(familyProviderSelectedSumAssured[insuredType] || 0);
    const period = parseFloat(familyProviderSelectedPeriods[insuredType] || 0);
    if (insuredType === 'mainLifeInsured') {
      totalMainLife += sumAssured * period;
    } else if (insuredType === 'partner') {
      totalPartner += sumAssured * period;
    }
  });

  Object.keys(lifeSelectedSumAssured).forEach((key) => {
    if (key === 'mainLifeInsured') {
      totalMainLife += parseFloat(lifeSelectedSumAssured[key] || 0);
    } else if (key === 'partner') {
      totalPartner += parseFloat(lifeSelectedSumAssured[key] || 0);
    }
  });

  Object.keys(deathIncomeSelectedSumAssured).forEach((insuredType) => {
    const sumAssured = parseFloat(deathIncomeSelectedSumAssured[insuredType] || 0);
    const period = parseFloat(deathIncomeSelectedPeriods[insuredType] || 0);
    if (insuredType === 'mainLifeInsured') {
      totalMainLife += sumAssured * period;
    } else if (insuredType === 'partner') {
      totalPartner += sumAssured * period;
    }
  });

  // Error handling
  const errors = [];
  const successes = [];

  if (totalMainLife > 250000) {
    errors.push('Main Life Insured total policy cover should not exceed M250000.');
  }
  if (totalPartner > 250000) {
    errors.push('Partner total policy cover should not exceed M250000.');
  }

  if (errors.length > 0) {
    setErrorMessageThree(errors);
    setSuccessMessageThree([]);
    setHadErrorTwo(true);
    setModalVisible(true);
  } else {
    if (hadErrorTwo) {
      successes.push('Sum assured limit successfully resolved');
      setModalVisible(true);
    }
    setErrorMessageThree([]);
    setSuccessMessageThree(successes);
    setHadErrorTwo(false);
  }

  // Set the total sum assured for mainLife and partner
  setTotalSumAssuredThreeMainLife(totalMainLife);
  setTotalSumAssuredThreePartner(totalPartner);
  
};

useEffect(() => {
  calculateTotalSumAssuredThree();
}, [selectedFuneralSumAssured, selectedTombstoneSumAssured, selectedCowSumAssured, familyProviderSelectedSumAssured, familyProviderSelectedPeriods, lifeSelectedSumAssured, deathIncomeSelectedSumAssured, deathIncomeSelectedPeriods]);


const getCombinedButtonStyle = () => {
  const mainLifeCondition = totalSumAssuredMainLife > 75000 && totalSumAssuredMainLife < 200000;
  const partnerCondition = totalSumAssuredPartner > 75000 && totalSumAssuredPartner < 200000;

  if (mainLifeCondition || partnerCondition) {
    return [styles.button, styles.buttonError];
  }

  const mainLifeConditionThree = totalSumAssuredThreeMainLife > 250000;
  const partnerConditionThree = totalSumAssuredThreePartner > 250000;

  if (mainLifeConditionThree || partnerConditionThree) {
    return [styles.button, styles.buttonError];
  }

  return styles.button;
};

const getCombinedButtonStyleTwo = () => {
  
  const mainLifeConditionThree = totalSumAssuredThreeMainLife > 250000;
  const partnerConditionThree = totalSumAssuredThreePartner > 250000;

  if (mainLifeConditionThree || partnerConditionThree) {
    return [styles.button, styles.buttonError];
  }

  return styles.button;
};



  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.logoContainer}>
    <Image source={require('./assets/LOGO.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>UNBUNDLED TJOBOLO PREMIUMS</Text>

      <View style={styles.wrapper}>
 
      <TouchableOpacity
   style={getCombinedButtonStyle ()}
  onPress={() => setShowFuneralBenefitPicker(!showFuneralBenefitPicker)}
>
  <Text style={styles.buttonText}>Funeral Benefit</Text>
  { errorMessage.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): (<Text style={styles.totalAmountTextButton}>{'M'}{totalFuneralPremium.toFixed(2)}</Text>)}
  <Icon
    name="arrow-drop-down"
    size={20}
    color="#FFFFFF"
    style={styles.icon}
  />
</TouchableOpacity>

{showFuneralBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
  {Object.keys(funeralBenefitData).map((insuredType) => (
    <View
      key={insuredType}
      style={
        insuredType === 'additionalChildren' ||
        insuredType === 'parents' ||
        insuredType === 'extendedFamilyChildren' ||
        insuredType === 'extendedFamilyMembers'
          ? styles.radioContainerColumn
          : styles.radioContainer
      }
    >
      <RadioButton
        value={insuredType}
        status={selectedFuneralInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}

        onPress={() => handleRadioButtonPress('funeral', insuredType)}
      />
      <Text style={styles.radioLabel}>
        {selectedFuneralInsuredTypes.includes(insuredType)
          ? insuredTypeShortNames[insuredType]
          : insuredTypeLongNames[insuredType]}
      </Text>
      {selectedFuneralInsuredTypes.includes(insuredType) && (
        <View style={styles.pickerContainer}>
          {(insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren') && (
            <Picker
              selectedValue={selectedAgeBands[insuredType]}
              style={styles.picker}
              onValueChange={(value) => handleAgeBandChange('funeral', insuredType, value)}
            >
              <Picker.Item label="Age Band" value="" color="purple" />
              {getAgeBands(funeralBenefitData, insuredType).map((band) => (
                <Picker.Item key={band} label={band} value={band} color="purple" />
              ))}
            </Picker>
          )}
          <Picker
            selectedValue={selectedFuneralSumAssured[insuredType]}
            style={styles.picker}
            onValueChange={(value) => handleSumAssuredChange('funeral', insuredType, value)}
          >
            <Picker.Item label="Sum Assured" value="" color="purple" />
            {getSumAssuredOptions(funeralBenefitData, insuredType, selectedAgeBands[insuredType]).map((sum) => (
              <Picker.Item key={sum} label={sum} value={sum} color="purple" />
            ))}
          </Picker>
          {selectedFuneralSumAssured[insuredType] && (
            parseFloat(selectedFuneralSumAssured[insuredType]) <= parseFloat(selectedFuneralSumAssured['mainLifeInsured']) ? (
              <Text style={styles.amountText}>
                {' = M'}
                {getAmount(funeralBenefitData, insuredType, selectedAgeBands[insuredType], selectedFuneralSumAssured[insuredType]).toFixed(2)}
              </Text>
            ) : (
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorText}>{insuredTypeLongNames[insuredType]} cover cannot exceed</Text>
                <Text style={styles.errorText}>Main Life cover</Text>
              </View>
            )
          )}
        </View>
      
          )}
          {insuredType === 'additionalChildren' && canAddMore(insuredType, additionalChildrenCount, 5) && (
  <View style={styles.additionalChildrenContainer}>
    {Array.from({ length: additionalChildrenCount }, (_, index) => (
      <View key={`additionalChildren_${index + 1}`} style={styles.radioContainer}>
        <RadioButton
          value={`additionalChildren_${index + 1}`}
          status={selectedFuneralInsuredTypes.includes(`additionalChildren_${index + 1}`) ? 'checked' : 'unchecked'}
          onPress={() => handleRadioButtonPress('funeral', `additionalChildren_${index + 1}`)}
        />
        <Text style={styles.radioLabel}>
          {selectedFuneralInsuredTypes.includes(`additionalChildren_${index + 1}`)
            ? insuredTypeShortNames['additionalChildren']
            : insuredTypeLongNames['additionalChildren']}
        </Text>
        {selectedFuneralInsuredTypes.includes(`additionalChildren_${index + 1}`) && (
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAgeBands[`additionalChildren_${index + 1}`]}
              style={styles.picker}
              onValueChange={(value) => handleAgeBandChange('funeral', `additionalChildren_${index + 1}`, value)}
            >
              <Picker.Item label="Age Band" value="" color="purple" />
              {getAgeBands(funeralBenefitData, 'additionalChildren').map((band) => (
                <Picker.Item key={band} label={band} value={band} color="purple" />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedFuneralSumAssured[`additionalChildren_${index + 1}`]}
              style={styles.picker}
              onValueChange={(value) => handleSumAssuredChange('funeral', `additionalChildren_${index + 1}`, value)}
            >
              <Picker.Item label="Sum Assured" value="" color="purple" />
              {getSumAssuredOptions(funeralBenefitData, 'additionalChildren', selectedAgeBands[`additionalChildren_${index + 1}`]).map((sum) => (
                <Picker.Item key={sum} label={sum} value={sum} color="purple" />
              ))}
            </Picker>
            {selectedFuneralSumAssured[`additionalChildren_${index + 1}`] && (
              parseFloat(selectedFuneralSumAssured[`additionalChildren_${index + 1}`]) <= parseFloat(selectedFuneralSumAssured['mainLifeInsured']) ? (
                <Text style={styles.amountText}>
                  {' = M'}
                  {getAmount(funeralBenefitData, 'additionalChildren', selectedAgeBands[`additionalChildren_${index + 1}`], selectedFuneralSumAssured[`additionalChildren_${index + 1}`]).toFixed(2)}
                </Text>
              ) : (
                <View style={styles.errorTextContainer}>
                  <Text style={styles.errorText}>{insuredTypeLongNames['additionalChildren']} cover cannot </Text>
                  <Text style={styles.errorText}>exceed Main Life cover</Text>
                </View>
              )
            )}
          </View>
        )}
      </View>
    ))}
    {additionalChildrenCount < 4 && (
      <TouchableOpacity onPress={() => setAdditionalChildrenCount(additionalChildrenCount + 1)}>
        <Text style={styles.addMoreText}>Click to add(+) Additional Child</Text>
      </TouchableOpacity>
    )}
  </View>
)}
          {insuredType === 'parents' && canAddMore(insuredType, parentsCount, 4) && (
            <View style={styles.additionalChildrenContainer}>
              {Array.from({ length: parentsCount }, (_, index) => (
                <View key={`parents_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`parents_${index + 1}`}
                    status={selectedFuneralInsuredTypes.includes(`parents_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('funeral', `parents_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedFuneralInsuredTypes.includes(`parents_${index + 1}`)
                      ? insuredTypeShortNames['parents']
                      : insuredTypeLongNames['parents']}
                  </Text>
                  {selectedFuneralInsuredTypes.includes(`parents_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('funeral', `parents_${index + 1}`, value)}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(funeralBenefitData, 'parents').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedFuneralSumAssured[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('funeral', `parents_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(funeralBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedFuneralSumAssured[`parents_${index + 1}`] && (
                        parseFloat(selectedFuneralSumAssured[`parents_${index + 1}`]) <= parseFloat(selectedFuneralSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(funeralBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`], selectedFuneralSumAssured[`parents_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>{insuredTypeLongNames['parents']} cover cannot exceed</Text>
                            <Text style={styles.errorText}>Main Life cover</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {parentsCount < 3 && (
              <TouchableOpacity onPress={() => setParentsCount(parentsCount + 1)}>
                <Text style={styles.addMoreText}>Click to add(+) Parent</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
          {insuredType === 'extendedFamilyChildren' && canAddMore(insuredType, extendedFamilyChildrenCount, 8) && (
            <View style={styles.additionalChildrenContainer}>
              {Array.from({ length: extendedFamilyChildrenCount }, (_, index) => (
                <View key={`extendedFamilyChildren_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`extendedFamilyChildren_${index + 1}`}
                    status={selectedFuneralInsuredTypes.includes(`extendedFamilyChildren_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('funeral', `extendedFamilyChildren_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedFuneralInsuredTypes.includes(`extendedFamilyChildren_${index + 1}`)
                      ? insuredTypeShortNames['extendedFamilyChildren']
                      : insuredTypeLongNames['extendedFamilyChildren']}
                  </Text>
                  {selectedFuneralInsuredTypes.includes(`extendedFamilyChildren_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`extendedFamilyChildren_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('funeral', `extendedFamilyChildren_${index + 1}`, value)}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(funeralBenefitData, 'extendedFamilyChildren').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedFuneralSumAssured[`extendedFamilyChildren_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('funeral', `extendedFamilyChildren_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(funeralBenefitData, 'extendedFamilyChildren', selectedAgeBands[`extendedFamilyChildren_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedFuneralSumAssured[`extendedFamilyChildren_${index + 1}`] && (
                        parseFloat(selectedFuneralSumAssured[`extendedFamilyChildren_${index + 1}`]) <= parseFloat(selectedFuneralSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(funeralBenefitData, 'extendedFamilyChildren', selectedAgeBands[`extendedFamilyChildren_${index + 1}`], selectedFuneralSumAssured[`extendedFamilyChildren_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>{insuredTypeLongNames['extendedFamilyChildren']} cover cannot</Text>
                            <Text style={styles.errorText}>exceed Main Life cover</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {extendedFamilyChildrenCount < 7 && (
              <TouchableOpacity onPress={() => setExtendedFamilyChildrenCount(extendedFamilyChildrenCount + 1)}>
                <Text style={styles.addMoreText}>Click to add(+) Extended Family Child</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
          {insuredType === 'extendedFamilyMembers' && canAddMore(insuredType, extendedFamilyMembersCount, 8) && (
            <View style={styles.additionalChildrenContainer}>
              {Array.from({ length: extendedFamilyMembersCount }, (_, index) => (
                <View key={`extendedFamilyMembers_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`extendedFamilyMembers_${index + 1}`}
                    status={selectedFuneralInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('funeral', `extendedFamilyMembers_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedFuneralInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`)
                      ? insuredTypeShortNames['extendedFamilyMembers']
                      : insuredTypeLongNames['extendedFamilyMembers']}
                  </Text>
                  {selectedFuneralInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('funeral', `extendedFamilyMembers_${index + 1}`, value)}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(funeralBenefitData, 'extendedFamilyMembers').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedFuneralSumAssured[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('funeral', `extendedFamilyMembers_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(funeralBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedFuneralSumAssured[`extendedFamilyMembers_${index + 1}`] && (
                        parseFloat(selectedFuneralSumAssured[`extendedFamilyMembers_${index + 1}`]) <= parseFloat(selectedFuneralSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(funeralBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`], selectedFuneralSumAssured[`extendedFamilyMembers_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>{insuredTypeLongNames['extendedFamilyMembers']} cover cannot</Text>
                            <Text style={styles.errorText}>exceed Main Life cover</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {extendedFamilyMembersCount < 7 && (
              <TouchableOpacity onPress={() => setExtendedFamilyMembersCount(extendedFamilyMembersCount + 1)}>
                <Text style={styles.addMoreText}>Click to add(+) Extended Family Member</Text>
              </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.radioLabelTotal}>
    {
  errorMessage.length > 0 ? (
    <View>
      {errorMessage.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ):errorMessageThree.length > 0 ? (
    <View>
      {errorMessageThree.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
    <View>
      {successMessage.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ): (
    <>
      <Text style={styles.label}>TOTAL FUNERAL BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalFuneralPremium.toFixed(2)}</Text>
    </>
  )
}

</View>
  </View>
)}

  
<TouchableOpacity style={getCombinedButtonStyle ()} onPress={() => setShowTombstoneBenefitPicker(!showTombstoneBenefitPicker)}>
  <Text style={styles.buttonText}>Tombstone Benefit</Text>
  { errorMessage.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): (<Text style={styles.totalAmountTextButton}>{'M'}{totalTombstonePremium.toFixed(2)}</Text>)}
  <Icon
    name="arrow-drop-down"
    size={20}
    color="#FFFFFF"
    style={styles.icon}
  />
</TouchableOpacity>

{showTombstoneBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(tombstoneBenefitData).map((insuredType) => (
        selectedFuneralInsuredTypes.includes(insuredType) && (
        <View key={insuredType} 
          style={insuredType === 'parents' || insuredType === 'extendedFamilyMembers' ? styles.radioContainerColumn : styles.radioContainer} >
          <RadioButton
            value={insuredType}
            status={selectedTombstoneInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleRadioButtonPress('tombstone', insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedTombstoneInsuredTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedTombstoneInsuredTypes.includes(insuredType) && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => handleAgeBandChange('tombstone', insuredType, value)}
                enabled={insuredType !== 'mainLifeInsured' && insuredType !== 'partner' && insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
              >
                <Picker.Item label="Age Band" value="" color="purple"/>
                {getAgeBands(tombstoneBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} color="purple"/>
                ))}
              </Picker>
              <Picker
                selectedValue={selectedTombstoneSumAssured[insuredType]}
                style={styles.picker}
                onValueChange={(value) => handleSumAssuredChange('tombstone', insuredType, value)}
              >
                <Picker.Item label="Sum Assured" value="" color="purple"/>
                {getSumAssuredOptions(tombstoneBenefitData, insuredType, selectedAgeBands[insuredType]).map((sum) => (
                  <Picker.Item key={sum} label={sum} value={sum} color="purple"/>
                ))}
              </Picker>
              {selectedTombstoneSumAssured[insuredType] && (
                parseFloat(selectedTombstoneSumAssured[insuredType]) <= parseFloat(selectedTombstoneSumAssured['mainLifeInsured']) ? (
                  <Text style={styles.amountText}>
                    {' = M'}
                    {getAmount(tombstoneBenefitData, insuredType, selectedAgeBands[insuredType], selectedTombstoneSumAssured[insuredType]).toFixed(2)}
                  </Text>
                ) : (
                  <View style={styles.errorTextContainer}>
                    <Text style={styles.errorText}>Benefit cannot exceed </Text>
                    <Text style={styles.errorText}>MLI's Tombstone Benefit</Text>
                  </View>
                )
              )}
            </View>
          )}
          {insuredType === 'parents' && canAddMore('parents', parentsCount, 4) && (
            <View style={styles.additionalChildrenContainer}>
              {Array.from({ length: parentsCount }, (_, index) => (
                <View key={`parents_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`parents_${index + 1}`}
                    status={selectedTombstoneInsuredTypes.includes(`parents_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('tombstone', `parents_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedTombstoneInsuredTypes.includes(`parents_${index + 1}`)
                      ? insuredTypeShortNames['parents']
                      : insuredTypeLongNames['parents']}
                  </Text>
                  {selectedTombstoneInsuredTypes.includes(`parents_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('tombstone', `parents_${index + 1}`, value)}
                        enabled={insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(tombstoneBenefitData, 'parents').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedTombstoneSumAssured[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('tombstone', `parents_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(tombstoneBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedTombstoneSumAssured[`parents_${index + 1}`] && (
                        parseFloat(selectedTombstoneSumAssured[`parents_${index + 1}`]) <= parseFloat(selectedTombstoneSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(tombstoneBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`], selectedTombstoneSumAssured[`parents_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>Benefit cannot exceed </Text>
                            <Text style={styles.errorText}>MLI's Tombstone Benefit</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              
              {parentsCount < 3 && (
                <TouchableOpacity onPress={() => setParentsCount(parentsCount + 1)} disabled={parentsCount >= 3}>
                  <Text style={styles.addMoreText}>Click to add(+) Parent</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {insuredType === 'extendedFamilyMembers' && canAddMore(insuredType, extendedFamilyMembersCount, 8) && (
            <View style={styles.extendedFamilyMembersContainer}>
              {Array.from({ length: extendedFamilyMembersCount }, (_, index) => (
                <View key={`extendedFamilyMembers_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`extendedFamilyMembers_${index + 1}`}
                    status={selectedTombstoneInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('tombstone', `extendedFamilyMembers_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedTombstoneInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`)
                      ? insuredTypeShortNames['extendedFamilyMembers']
                      : insuredTypeLongNames['extendedFamilyMembers']}
                  </Text>
                  {selectedTombstoneInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('tombstone', `extendedFamilyMembers_${index + 1}`, value)}
                        enabled={insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(tombstoneBenefitData, 'extendedFamilyMembers').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedTombstoneSumAssured[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('tombstone', `extendedFamilyMembers_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(tombstoneBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedTombstoneSumAssured[`extendedFamilyMembers_${index + 1}`] && (
                        parseFloat(selectedTombstoneSumAssured[`extendedFamilyMembers_${index + 1}`]) <= parseFloat(selectedTombstoneSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(tombstoneBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`], selectedTombstoneSumAssured[`extendedFamilyMembers_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>Benefit cannot exceed </Text>
                            <Text style={styles.errorText}>MLI's Tombstone Benefit</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {extendedFamilyMembersCount < 7 && (
              <TouchableOpacity onPress={() => setExtendedFamilyMembersCount(extendedFamilyMembersCount + 1)}>
                <Text style={styles.addMoreText}>Click to add(+) Extended Family Member</Text>
              </TouchableOpacity>
              )}
              </View>
            )}
          </View>
        )
      ))}
    </View>
    
    <View style={styles.radioLabelTotal}>
    {
  errorMessage.length > 0 ? (
    <View>
      {errorMessage.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ):errorMessageThree.length > 0 ? (
    <View>
      {errorMessageThree.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
    <View>
      {successMessage.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (
    <>
    
      <Text style={styles.label}>TOTAL TOMBSTONE BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalTombstonePremium.toFixed(2)}</Text>
      </>
  )}
</View>
  </View>
)}


<TouchableOpacity style={getCombinedButtonStyle ()} onPress={() => setShowCowBenefitPicker(!showCowBenefitPicker)}>
  <Text style={styles.buttonText}>Cow Benefit</Text>
 { errorMessage.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ) : (<Text style={styles.totalAmountTextButton}>{'M'}{totalCowPremium.toFixed(2)}</Text>)}
  <Icon
    name="arrow-drop-down"
    size={20}
    color="#FFFFFF"
    style={styles.icon}
  />
</TouchableOpacity>

{showCowBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(cowBenefitData).map((insuredType) => (
        selectedFuneralInsuredTypes.includes(insuredType) && (
        <View key={insuredType} style={insuredType === 'parents' || insuredType === 'extendedFamilyMembers' ? styles.radioContainerColumn : styles.radioContainer}>
          <RadioButton
            value={insuredType}
            status={selectedCowInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleRadioButtonPress('cow', insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedCowInsuredTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedCowInsuredTypes.includes(insuredType) && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => handleAgeBandChange('cow', insuredType, value)}
                enabled={insuredType !== 'mainLifeInsured' && insuredType !== 'partner' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
              >
                <Picker.Item label="Age Band" value="" color="purple"/>
                {getAgeBands(cowBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} color="purple"/>
                ))}
              </Picker>
              <Picker
                selectedValue={selectedCowSumAssured[insuredType]}
                style={styles.picker}
                onValueChange={(value) => handleSumAssuredChange('cow', insuredType, value)}
              >
                <Picker.Item label="Sum Assured" value="" color="purple"/>
                {getSumAssuredOptions(cowBenefitData, insuredType, selectedAgeBands[insuredType]).map((sum) => (
                  <Picker.Item key={sum} label={sum} value={sum} color="purple"/>
                ))}
              </Picker>
              {selectedCowSumAssured[insuredType] && (
                parseFloat(selectedCowSumAssured[insuredType]) <= parseFloat(selectedCowSumAssured['mainLifeInsured']) ? (
                  <Text style={styles.amountText}>
                    {' = M'}
                    {getAmount(cowBenefitData, insuredType, selectedAgeBands[insuredType], selectedCowSumAssured[insuredType]).toFixed(2)}
                  </Text>
                ) : (
                  <View style={styles.errorTextContainer}>
                    <Text style={styles.errorText}>Benefit cannot exceed </Text>
                    <Text style={styles.errorText}>MLI's Cow Benefit</Text>
                  </View>
                )
              )}
            </View>
          )}
          {insuredType === 'parents' && canAddMore('parents', parentsCount, 4) &&  (
            <View style={styles.additionalChildrenContainer}>
              {Array.from({ length: parentsCount }, (_, index) => (
                <View key={`parents_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`parents_${index + 1}`}
                    status={selectedCowInsuredTypes.includes(`parents_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('cow', `parents_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedCowInsuredTypes.includes(`parents_${index + 1}`)
                      ? insuredTypeShortNames['parents']
                      : insuredTypeLongNames['parents']}
                  </Text>
                  {selectedCowInsuredTypes.includes(`parents_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('cow', `parents_${index + 1}`, value)}
                        enabled={insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(cowBenefitData, 'parents').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedCowSumAssured[`parents_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('cow', `parents_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(cowBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedCowSumAssured[`parents_${index + 1}`] && (
                        parseFloat(selectedCowSumAssured[`parents_${index + 1}`]) <= parseFloat(selectedCowSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(cowBenefitData, 'parents', selectedAgeBands[`parents_${index + 1}`], selectedCowSumAssured[`parents_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>Benefit cannot exceed </Text>
                            <Text style={styles.errorText}>MLI's Cow Benefit</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {parentsCount < 3 && (
                <TouchableOpacity onPress={() => setParentsCount(parentsCount + 1)}>
                  <Text style={styles.addMoreText}>Click to add(+) Parent</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {insuredType === 'extendedFamilyMembers' && canAddMore(insuredType, extendedFamilyMembersCount, 8) && (
            <View style={styles.extendedFamilyMembersContainer}>
              {Array.from({ length: extendedFamilyMembersCount }, (_, index) => (
                <View key={`extendedFamilyMembers_${index + 1}`} style={styles.radioContainer}>
                  <RadioButton
                    value={`extendedFamilyMembers_${index + 1}`}
                    status={selectedCowInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) ? 'checked' : 'unchecked'}
                    onPress={() => handleRadioButtonPress('cow', `extendedFamilyMembers_${index + 1}`)}
                  />
                  <Text style={styles.radioLabel}>
                    {selectedCowInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`)
                      ? insuredTypeShortNames['extendedFamilyMembers']
                      : insuredTypeLongNames['extendedFamilyMembers']}
                  </Text>
                  {selectedCowInsuredTypes.includes(`extendedFamilyMembers_${index + 1}`) && (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedAgeBands[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleAgeBandChange('cow', `extendedFamilyMembers_${index + 1}`, value)}
                        enabled={insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
                      >
                        <Picker.Item label="Age Band" value="" color="purple" />
                        {getAgeBands(cowBenefitData, 'extendedFamilyMembers').map((band) => (
                          <Picker.Item key={band} label={band} value={band} color="purple" />
                        ))}
                      </Picker>
                      <Picker
                        selectedValue={selectedCowSumAssured[`extendedFamilyMembers_${index + 1}`]}
                        style={styles.picker}
                        onValueChange={(value) => handleSumAssuredChange('cow', `extendedFamilyMembers_${index + 1}`, value)}
                      >
                        <Picker.Item label="Sum Assured" value="" color="purple" />
                        {getSumAssuredOptions(cowBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`]).map((sum) => (
                          <Picker.Item key={sum} label={sum} value={sum} color="purple" />
                        ))}
                      </Picker>
                      {selectedCowSumAssured[`extendedFamilyMembers_${index + 1}`] && (
                        parseFloat(selectedCowSumAssured[`extendedFamilyMembers_${index + 1}`]) <= parseFloat(selectedCowSumAssured['mainLifeInsured']) ? (
                          <Text style={styles.amountText}>
                            {' = M'}
                            {getAmount(cowBenefitData, 'extendedFamilyMembers', selectedAgeBands[`extendedFamilyMembers_${index + 1}`], selectedCowSumAssured[`extendedFamilyMembers_${index + 1}`]).toFixed(2)}
                          </Text>
                        ) : (
                          <View style={styles.errorTextContainer}>
                            <Text style={styles.errorText}>Benefit cannot exceed </Text>
                            <Text style={styles.errorText}>MLI's Cow Benefit</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}
                </View>
              ))}
              {/*disabled={extendedFamilyChildrenCount + extendedFamilyMembersCount >= 7}*/}
              {extendedFamilyMembersCount < 7 && (
              <TouchableOpacity onPress={() => setExtendedFamilyMembersCount(extendedFamilyMembersCount + 1)} >
                <Text style={styles.addMoreText}>Click to add(+) Extended Family Member</Text>
              </TouchableOpacity>
              )}
              </View>
            )}
          </View>
        )
      ))}
    </View>
    <View style={styles.radioLabelTotal}>
    {
  errorMessage.length > 0 ? (
    <View>
      {errorMessage.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ): errorMessageThree.length > 0 ? (
    <View>
      {errorMessageThree.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
    <View>
      {successMessage.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (
    <>
      <Text style={styles.label}>TOTAL COW BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalCowPremium.toFixed(2)}</Text>
      </>
  )}
</View>
  </View>
)}


<TouchableOpacity
  style={getCombinedButtonStyle ()}
  onPress={() => setShowFamilyProviderBenefitPicker(!showFamilyProviderBenefitPicker)}
>
  <Text style={styles.buttonText}>Monthly Provider Benefit</Text>
  { errorMessage.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ) : (<Text style={styles.totalAmountTextButton}>{'M'}{totalFamilyProviderPremium.toFixed(2)}</Text>)}
  <Icon
    name="arrow-drop-down"
    size={20}
    color="#FFFFFF"
    style={styles.icon}
  />
</TouchableOpacity>

{showFamilyProviderBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(monthlyProviderBenefitData).map((insuredType) => (
        selectedFuneralInsuredTypes.includes(insuredType) && (
        <View key={insuredType} style={styles.row}>
          <RadioButton
            value={insuredType}
            status={selectedMonthlyProviderInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleMonthlyProviderRadioButtonPress(insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedMonthlyProviderInsuredTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedMonthlyProviderInsuredTypes.includes(insuredType) && (
  <View style={styles.pickerContainer}>
    <Picker
      selectedValue={selectedAgeBands[insuredType]}
      style={styles.picker}
      onValueChange={(value) => handleAgeBandChange(insuredType, value)}
      enabled={
        insuredType !== 'mainLifeInsured' &&
        insuredType !== 'partner' &&
        insuredType !== 'children' &&
        insuredType !== 'additionalChildren' &&
        insuredType !== 'extendedFamilyChildren' &&
        insuredType !== 'parents' &&
        insuredType !== 'extendedFamilyMembers'
      }
    >
      <Picker.Item label="Age Band" value="" color="purple" />
      {getAgeBands(monthlyProviderBenefitData, insuredType).map((band) => (
        <Picker.Item key={band} label={band} value={band} color="purple" />
      ))}
    </Picker>
    <Picker
      selectedValue={familyProviderSelectedSumAssured[insuredType]}
      style={styles.picker}
      onValueChange={(value) =>
        setFamilyProviderSelectedSumAssured((prevSumAssured) => ({
          ...prevSumAssured,
          [insuredType]: value,
        }))
      }
    >
      <Picker.Item label="Sum Assured" value="" color="purple" />
      {getSumAssuredAmounts(
        monthlyProviderBenefitData,
        insuredType,
        selectedAgeBands[insuredType]
      ).map((amount) => (
        <Picker.Item key={amount} label={amount} value={amount} color="purple" />
      ))}
    </Picker>
    <Picker
      selectedValue={familyProviderSelectedPeriods[insuredType]}
      style={styles.picker}
      onValueChange={(value) =>
        setFamilyProviderSelectedPeriods((prevPeriods) => ({
          ...prevPeriods,
          [insuredType]: value,
        }))
      }
    >
      <Picker.Item label="Period" value="" color="purple" />
      {getPeriodOptions(
        monthlyProviderBenefitData,
        insuredType,
        selectedAgeBands[insuredType],
        familyProviderSelectedSumAssured[insuredType]
      ).map((period) => (
        <Picker.Item key={period} label={period} value={period} color="purple" />
      ))}
    </Picker>

    {/* Cover Amount Display */}
    <View style={styles.picker}>
  <Text style={styles.coverAmountText}>
    {familyProviderSelectedSumAssured[insuredType] && familyProviderSelectedPeriods[insuredType]
      ? `Cover Amount: M${parseFloat(familyProviderSelectedSumAssured[insuredType]) * parseFloat(familyProviderSelectedPeriods[insuredType])}`
      : 'Cover Amount'}
  </Text>
</View>


{familyProviderSelectedPeriods[insuredType] && familyProviderSelectedSumAssured[insuredType] && (
  insuredType === 'mainLifeInsured' ? (
    <Text style={styles.amountText}>
      {' = M'}
      {getAmount(
        monthlyProviderBenefitData,
        insuredType,
        selectedAgeBands[insuredType],
        `${familyProviderSelectedSumAssured[insuredType]}x${familyProviderSelectedPeriods[insuredType]}`
      ).toFixed(2)}
    </Text>
  ) : (
    parseFloat(familyProviderSelectedSumAssured['partner']) * parseFloat(familyProviderSelectedPeriods['partner']) <=
    parseFloat(familyProviderSelectedSumAssured['mainLifeInsured']) * parseFloat(familyProviderSelectedPeriods['mainLifeInsured']) ? (
      <Text style={styles.amountText}>
        {' = M'}
        {getAmount(
          monthlyProviderBenefitData,
          insuredType,
          selectedAgeBands[insuredType],
          `${familyProviderSelectedSumAssured[insuredType]}x${familyProviderSelectedPeriods[insuredType]}`
        ).toFixed(2)}
      </Text>
    ) : (
      insuredType === 'partner' && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>Partner's Benefit cannot exceed </Text>
          <Text style={styles.errorText}>MLI's Benefit</Text>
        </View>
      )
    )
  )
)}


  </View>
)}

          </View>
        )
      ))}
    </View>
    <View style={styles.radioLabelTotal}>
    {
  errorMessage.length > 0 ? (
    <View>
      {errorMessage.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ): errorMessageThree.length > 0 ? (
    <View>
      {errorMessageThree.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
    <View>
      {successMessage.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (
    <>
      <Text style={styles.label}>TOTAL MONTHLY PROVIDER PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalFamilyProviderPremium.toFixed(2)}</Text>
      </>
  )}
</View>
  </View>
)}

{selectedFuneralInsuredTypes.includes('mainLifeInsured') &&
selectedFuneralSumAssured['mainLifeInsured'] === '50000' && (
<>
<TouchableOpacity
style={getCombinedButtonStyleTwo()}
onPress={() => setShowLifeCoverBenefitPicker(!showLifeCoverBenefitPicker)}
>
<Text style={styles.buttonText}>Life Cover Benefit</Text>
{errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): (<Text style={styles.totalAmountTextButton}>{'M'}{totalLifeCoverPremium.toFixed(2)}</Text>)}
<Icon
name="arrow-drop-down"
size={20}
color="#FFFFFF"
style={styles.icon} // Style for the icon
/>
</TouchableOpacity>

{showLifeCoverBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(lifeCoverBenefitData).map((insuredType) => (
        selectedFuneralInsuredTypes.includes(insuredType) && (
        <View key={insuredType} style={styles.row}>
          <RadioButton
            value={insuredType}
            status={selectedLifeCoverTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleLifeCoverRadioButtonPress(insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedLifeCoverTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedLifeCoverTypes.includes(insuredType) && (
            <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedAgeBands[insuredType]}
              style={styles.picker}
              onValueChange={(value) => handleAgeBandChange(insuredType, value)}
              enabled={insuredType !== 'mainLifeInsured' && insuredType !== 'partner' && insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers' && insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
            >
              <Picker.Item label="Age Band" value="" color="purple" />
              {getAgeBands(lifeCoverBenefitData, insuredType).map((band) => (
                <Picker.Item key={band} label={band} value={band} color="purple" />
              ))}
            </Picker>
            <Picker
              selectedValue={lifeSelectedSumAssured[insuredType]}
              style={styles.picker}
              onValueChange={(value) =>
                setSelectedSumAssured((prevSumAssured) => ({
                  ...prevSumAssured,
                  [insuredType]: value,
                }))
              }
            >
              <Picker.Item label="Sum Assured" value="" color="purple" />
              {getSumAssuredOptions(
                lifeCoverBenefitData,
                insuredType,
                selectedAgeBands[insuredType]
              ).map((sum) => (
                <Picker.Item key={sum} label={sum} value={sum} color="purple" />
              ))}
            </Picker>
            {lifeSelectedSumAssured[insuredType] && (
            parseFloat(lifeSelectedSumAssured[insuredType]) <= parseFloat(lifeSelectedSumAssured['mainLifeInsured']) ? (
              <Text style={styles.amountText}>
              {' = M'}
              {getAmount(
                lifeCoverBenefitData,
                insuredType,
                selectedAgeBands[insuredType],
                lifeSelectedSumAssured[insuredType]
              ).toFixed(2)}
            </Text>
         ) : (
         
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>Partner's Benefit cannot exceed </Text>
              <Text style={styles.errorText}>MLI's Benefit</Text>
            </View>
          
         )
          
        )}
            </View>
          )}
        </View>
      )
    ))}
    </View>
    <View style={styles.radioLabelTotal}>
  {errorMessageThree.length > 0 ? (
  <View>
    {errorMessageThree.map((message, index) => (
      <Text key={index} style={styles.errorText}>{message}</Text>
    ))}
  </View>
) :(Array.isArray(successMessageTwo) && successMessageTwo.length > 0) ? (
  <View>
    {successMessageTwo.map((message, index) => (
      <Text key={index} style={styles.successText}>{message}</Text>
    ))}
  </View>
) : (
    <>
      <Text style={styles.label}>TOTAL LIFE COVER BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalLifeCoverPremium.toFixed(2)}</Text>
      </>
  )}
</View>
  </View>
)}
</>
)}

{selectedFuneralInsuredTypes.includes('mainLifeInsured') &&
selectedFuneralSumAssured['mainLifeInsured'] === '50000' && (
  <>
    <TouchableOpacity
      style={getCombinedButtonStyleTwo()}
      onPress={() => setShowDeathIncomeBenefitPicker(!showDeathIncomeBenefitPicker)}
    >
      <Text style={styles.buttonText}>Death Income Benefit</Text>
      {errorMessageThree.length > 0 ? (
    <Text style={styles.totalAmountTextButton}>{''}</Text>
  ): (<Text style={styles.totalAmountTextButton}>{'M'}{totalDeathIncomePremium.toFixed(2)}</Text>)}
      <Icon
        name="arrow-drop-down"
        size={20}
        color="#FFFFFF"
        style={styles.icon} 
      />
    </TouchableOpacity>

    {showDeathIncomeBenefitPicker && (
      <View style={styles.container}>
        <View style={styles.column}>
          {Object.keys(deathIncomeBenefitData).map((insuredType) => (
            selectedFuneralInsuredTypes.includes(insuredType) && (
            <View key={insuredType} style={styles.row}>
              <RadioButton
                value={insuredType}
                status={selectedDeathIncomeTypes.includes(insuredType) ? 'checked' : 'unchecked'}
                onPress={() => handleDeathIncomeRadioButtonPress(insuredType)}
              />
              <Text style={styles.radioLabel}>
                {selectedDeathIncomeTypes.includes(insuredType)
                  ? insuredTypeShortNames[insuredType]
                  : insuredTypeLongNames[insuredType]}
              </Text>
              {selectedDeathIncomeTypes.includes(insuredType) && (
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedAgeBands[insuredType]}
                    style={styles.picker}
                    onValueChange={(value) => handleAgeBandChange(insuredType, value)}
                    enabled={insuredType !== 'mainLifeInsured' && insuredType !== 'partner' && insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers' && insuredType !== 'children' && insuredType !== 'additionalChildren' && insuredType !== 'extendedFamilyChildren' && insuredType !== 'parents' && insuredType !== 'extendedFamilyMembers'}
                  >
                    <Picker.Item label="Age Band" value="" color="purple" />
                    {getAgeBands(deathIncomeBenefitData, insuredType).map((band) => (
                      <Picker.Item key={band} label={band} value={band} color="purple" />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={deathIncomeSelectedSumAssured[insuredType]}
                    style={styles.picker}
                    onValueChange={(value) => {
                      setDeathIncomeSelectedSumAssured((prevSumAssured) => ({
                        ...prevSumAssured,
                        [insuredType]: value,
                      }));
                      setDeathIncomeSelectedPeriods((prevPeriods) => ({
                        ...prevPeriods,
                        [insuredType]: '',
                      }));
                    }}
                  >
                    <Picker.Item label="Sum Assured" value="" color="purple" />
                    {getSumAssuredAmounts(deathIncomeBenefitData, insuredType, selectedAgeBands[insuredType]).map((amount) => (
                      <Picker.Item key={amount} label={amount} value={amount} color="purple" />
                    ))}
                  </Picker>
                  <Picker
                    selectedValue={deathIncomeSelectedPeriods[insuredType]}
                    style={styles.picker}
                    onValueChange={(value) =>
                      setDeathIncomeSelectedPeriods((prevPeriods) => ({
                        ...prevPeriods,
                        [insuredType]: value,
                      }))
                      
                    }
                  >
                    <Picker.Item label="Period" value="" color="purple" />
                    {deathIncomeSelectedSumAssured[insuredType]
                      ? getPeriodOptions(
                          deathIncomeBenefitData,
                          insuredType,
                          selectedAgeBands[insuredType],
                          deathIncomeSelectedSumAssured[insuredType]
                        ).map((period) => (
                          <Picker.Item key={period} label={period} value={period} color="purple" />
                        ))
                      : null}
                  </Picker>

                  <View style={styles.picker}>
  <Text style={styles.coverAmountText}>
    {deathIncomeSelectedSumAssured[insuredType] && deathIncomeSelectedPeriods[insuredType]
      ? `Cover Amount: M${parseFloat(deathIncomeSelectedSumAssured[insuredType]) * parseFloat(deathIncomeSelectedPeriods[insuredType])}`
      : 'Cover Amount'}
  </Text>
</View>

{deathIncomeSelectedPeriods[insuredType] && deathIncomeSelectedSumAssured[insuredType] && (
  insuredType === 'mainLifeInsured' ? (
    <Text style={styles.amountText}>
      {' = M'}
      {getAmount(
        deathIncomeBenefitData,
        insuredType,
        selectedAgeBands[insuredType],
        `${deathIncomeSelectedSumAssured[insuredType]}x${deathIncomeSelectedPeriods[insuredType]}`
      ).toFixed(2)}
    </Text>
  ) : (
    parseFloat(deathIncomeSelectedSumAssured['partner']) * parseFloat(deathIncomeSelectedPeriods['partner']) <=
    parseFloat(deathIncomeSelectedSumAssured['mainLifeInsured']) * parseFloat(deathIncomeSelectedPeriods['mainLifeInsured']) ? (
      <Text style={styles.amountText}>
        {' = M'}
        {getAmount(
          deathIncomeBenefitData,
          insuredType,
          selectedAgeBands[insuredType],
          `${deathIncomeSelectedSumAssured[insuredType]}x${deathIncomeSelectedPeriods[insuredType]}`
        ).toFixed(2)}
      </Text>
    ) : (
      insuredType === 'partner' && (
        <View style={styles.errorTextContainer}>
          <Text style={styles.errorText}>Partner's Benefit cannot exceed </Text>
          <Text style={styles.errorText}>MLI's Benefit</Text>
        </View>
      )
    )
  )
)}

                  </View>
                )}
              </View>
            )
          ))}
        </View>
        <View style={styles.radioLabelTotal}>
  {errorMessageThree.length > 0 ? (
  <View>
    {errorMessageThree.map((message, index) => (
      <Text key={index} style={styles.errorText}>{message}</Text>
    ))}
  </View>
) : (Array.isArray(successMessageTwo) && successMessageTwo.length > 0) ? (
  <View>
    {successMessageTwo.map((message, index) => (
      <Text key={index} style={styles.successText}>{message}</Text>
    ))}
  </View>
) : (
    <>
          <Text style={styles.label}>TOTAL DEATH INCOME BENEFIT PREMIUM</Text>
          <Text style={styles.totalAmountText}>{' = M'}{totalDeathIncomePremium.toFixed(2)}</Text>
          </>
  )}
</View>
      </View>
    )}
  </>
)}


<View>
{
  errorMessage.length > 0 ? (
    <View>
      {errorMessage.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(errorMessageThree) && errorMessageThree.length > 0) ? (
    <View>
      {errorMessageThree.map((message, index) => (
        <Text key={index} style={styles.errorText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
    <View>
      {successMessage.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessageTwo) && successMessageTwo.length > 0) ? (
    <View>
      {successMessageTwo.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (Array.isArray(successMessageThree) && successMessageThree.length > 0) ? (
    <View>
      {successMessageThree.map((message, index) => (
        <Text key={index} style={styles.successText}>{message}</Text>
      ))}
    </View>
  ) : (
    <>
      <Text style={styles.totalAmountTextTwo}>Subtotal{' = M'}{totalPremium.toFixed(2)}</Text>
      <Text style={styles.totalAmountTextTwo}>Policy Fee{' = M10.00'}</Text>
      <Text style={styles.labelTotal}>TOTAL PREMIUM(.incl fee){' = M'}{(totalPremium + 10).toFixed(2)}</Text>
    </>
  )
}
</View>


    </View>

    <View style={styles.buttonResetContainer} >
    <TouchableOpacity style={styles.buttonReset} onPress={resetAllSelections}>
  <Text style={styles.buttonText}>Reset Selections</Text>
</TouchableOpacity>

<Modal
  transparent={true}
  animationType="slide"
  visible={isModalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    setSuccessMessage([]);
    setSuccessMessageTwo([]);
    setSuccessMessageThree([]);
  }}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      {errorMessage.length > 0 ? (
        <View>
          {errorMessage.map((message, index) => (
            <Text key={index} style={styles.errorText}>{message}</Text>
          ))}
        </View>
      ) : (Array.isArray(errorMessageThree) && errorMessageThree.length > 0) ? (
        <View>
          {errorMessageThree.map((message, index) => (
            <Text key={index} style={styles.errorText}>{message}</Text>
          ))}
        </View>
      ) : (Array.isArray(successMessage) && successMessage.length > 0) ? (
        <View>
          {successMessage.map((message, index) => (
            <Text key={index} style={styles.successText}>{message}</Text>
          ))}
        </View>
      ) : (Array.isArray(successMessageTwo) && successMessageTwo.length > 0) ? (
        <View>
          {successMessageTwo.map((message, index) => (
            <Text key={index} style={styles.successText}>{message}</Text>
          ))}
        </View>
      ) : (Array.isArray(successMessageThree) && successMessageThree.length > 0) ? (
        <View>
          {successMessageThree.map((message, index) => (
            <Text key={index} style={styles.successText}>{message}</Text>
          ))}
        </View>
      ) : null}
      <TouchableOpacity
        onPress={() => {
          setModalVisible(false);
          setSuccessMessage([]);
          setSuccessMessageTwo([]);
          setSuccessMessageThree([]);
        }}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



</View>


    </ScrollView>
  );
};
    
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    padding: 20,
    
  },
  wrapper: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: '100%', 
    alignItems: 'center', 
    marginTop: 70,
    marginBottom: 5,
  },
  logo: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'cornflowerblue',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  pickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    width: '50%', 
    height: 40, 
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'cornflowerblue', 
    borderRadius: 5, 
    padding: 5, 
  },
  
  button: {
    flexDirection: 'row',
    backgroundColor: 'cornflowerblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    height: 50,
    width: '100%',
  },
  buttonResetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonReset: {
    backgroundColor: 'orange',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    height: 50,
    width: '50%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 10, 
    color: '#FFFFFF',
  },
  column: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginBottom: 16,
    width: '100%',
  },
  fixedAmountSection: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10, 
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'purple',
  },
  labelTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: '45'
  },
  amountText: {
    fontSize: 16,
    color: 'purple',
    marginLeft: 10,
  },
  coverAmountText: {
    fontSize: 14,
    color: 'purple',
    marginLeft: 10,
  },
  totalAmountText: {
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  totalAmountTextTwo: {
    fontSize: 16,
    color: 'purple',
    marginLeft: 4,
  },
  totalAmountTextButton: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioContainerColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  radioLabel: {
    color: 'purple',
    marginLeft: 10,
    fontSize: 16,
  },
  radioLabelTotal: {
    color: 'purple',
    marginLeft: 10,
    fontSize: 16,
    flexDirection: 'row',
    alignItems: 'center', 
  },
  buttonError: {
    backgroundColor: 'red',
  },
  errorTextContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
    
  },
  errorTextTotal: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  addMoreText: {
    color: 'cornflowerblue',
    //textDecorationLine: 'underline',
    marginLeft: 10,
    fontSize: 14,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  additionalChildrenContainer: {
    marginLeft: 20,
    marginTop: 10,
    alignItems: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'cornflowerblue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
   
export default App;


