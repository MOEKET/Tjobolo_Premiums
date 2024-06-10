import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper';

const App = () => {
  const [showFuneralBenefitPicker, setShowFuneralBenefitPicker] = useState(false);
  const [showTombstoneBenefitPicker, setShowTombstoneBenefitPicker] = useState(false);
  const [showCowBenefitPicker, setShowCowBenefitPicker] = useState(false);
  const [showFamilyProviderBenefitPicker, setShowFamilyProviderBenefitPicker] = useState(false);
  const [showDeathIncomeBenefitPicker, setShowDeathIncomeBenefitPicker] = useState(false);
  const [showLifeCoverBenefitPicker, setShowLifeCoverBenefitPicker] = useState(false);

  const [selectedAgeBands, setSelectedAgeBands] = useState({});
  const [selectedSumAssured, setSelectedSumAssured] = useState({});
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

  const [deathIncomeSelectedAgeBands, setDeathIncomeSelectedAgeBands] = useState({});
  const [deathIncomeSelectedSumAssured, setDeathIncomeSelectedSumAssured] = useState({});
  const [deathIncomeSelectedPeriods, setDeathIncomeSelectedPeriods] = useState({});

  
  const [totalPremium, setTotalPremium] = useState(0);

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
    setTotalPremium(0);
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
    extendedFamilyChildren: {
      '0-20/24': {
        '5000': 3.00, '10000': 6.00, '15000': 9.00, '20000': 12.00, '25000': 15.00
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
    mainInsuredPartner: {
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
    mainInsuredPartner: {
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
    mainLifeAndPartner: {
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
    mainLifeAndPartner: {
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
        '3000x36': 124.20
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
        '3000x36': 232.20
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
        '3000x36': 405.00
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
        '3000x36': 583.20
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
        '3000x36': 864.00
      }
    }
  };
  

const lifeCoverBenefitData = {
  mainLifeAndPartner: {
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
  mainInsuredPartner: 'MIP',
  partner: 'PTN',
  children: 'CHD',
  additionalChildren: 'ADC',
  extendedFamilyChildren: 'EFC',
  parents: 'PRS',
  extendedFamilyMembers: 'EFM',
  mainLifeAndPartner: 'MLP'
};

const insuredTypeLongNames = {
  mainLifeInsured: 'Main Life Insured',
  mainInsuredPartner: 'Main Insured, Partner',
  partner: 'Partner',
  children: 'Children',
  additionalChildren: 'Additional Children',
  extendedFamilyChildren: 'Extended Family Children',
  parents: 'Parents/Parents-in-law',
  extendedFamilyMembers: 'Extended Family Members',
  mainLifeAndPartner: 'Main Life and Partner'
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

const getAmount = (data, insuredType, ageBand, sumAssured) => {
  if (insuredType && ageBand && sumAssured) {
    const amount = data[insuredType][ageBand][sumAssured];
    if (amount !== undefined) {
      return amount;
    }
  }
  return null;
};

const getSumAssuredAmounts = (data, insuredType, ageBand) => {
  if (!data[insuredType] || !data[insuredType][ageBand]) return [];
  return Object.keys(data[insuredType][ageBand])
    .map((key) => key.split('x')[0])
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
};

const getPeriodOptions = (data, insuredType, ageBand, sumAssured) => {
  if (!data[insuredType] || !data[insuredType][ageBand]) return [];
  return Object.keys(data[insuredType][ageBand])
    .filter((key) => key.startsWith(sumAssured))
    .map((key) => key.split('x')[1]);
};


const calculateTotalPremium = (data, selectedInsuredTypes) => {
  return selectedInsuredTypes.reduce((total, insuredType) => {
    const ageBand = selectedAgeBands[insuredType];
    const sumAssured = selectedSumAssured[insuredType];
    const amount = getAmount(data, insuredType, ageBand, sumAssured);
    return total + (amount ? parseFloat(amount) : 0);
  }, 0);
};

const handleFuneralRadioButtonPress = (insuredType) => {
    setSelectedFuneralInsuredTypes((prevSelected) => 
      prevSelected.includes(insuredType) ? prevSelected.filter((type) => type !== insuredType) : [...prevSelected, insuredType]
    );
  };


const handleTombstoneRadioButtonPress = (insuredType) => {
  setSelectedTombstoneInsuredTypes((prevSelected) => 
    prevSelected.includes(insuredType) ? prevSelected.filter((type) => type !== insuredType) : [...prevSelected, insuredType]
  );
};

const handleCowRadioButtonPress = (insuredType) => {
  setSelectedCowInsuredTypes((prevSelected) => 
    prevSelected.includes(insuredType) ? prevSelected.filter((type) => type !== insuredType) : [...prevSelected, insuredType]
  );
};

const handleMonthlyProviderRadioButtonPress = (insuredType) => {
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
};

const handleDeathIncomeRadioButtonPress = (insuredType) => {
  setSelectedDeathIncomeTypes((prevTypes) => {
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
  });
};

const handleLifeRadioButtonPress = (insuredType) => {
  setSelectedLifeCoverInsuredTypes((prevSelected) => {
    if (prevSelected.includes(insuredType)) {
      return prevSelected.filter((type) => type !== insuredType);
    } else {
      return [...prevSelected, insuredType];
    }
  });
};

const totalFuneralPremium = selectedFuneralInsuredTypes.reduce((total, insuredType) => {
  const amount = getAmount(funeralBenefitData, insuredType, selectedFuneralAgeBands[insuredType], selectedFuneralSumAssured[insuredType]);
  return total + amount;
}, 0);

const totalTombstonePremium = selectedTombstoneInsuredTypes.reduce((total, insuredType) => {
  const amount = getAmount(tombstoneBenefitData, insuredType, selectedTombstoneAgeBands[insuredType], selectedTombstoneSumAssured[insuredType]);
  return total + amount;
}, 0);

const totalCowPremium = selectedCowInsuredTypes.reduce((total, insuredType) => {
  const amount = getAmount(cowBenefitData, insuredType, selectedCowAgeBands[insuredType], selectedCowSumAssured[insuredType]);
  return total + amount;
}, 0);

const totalDeathIncomePremium = selectedDeathIncomeTypes.reduce((total, insuredType) => {
  const ageBand = deathIncomeSelectedAgeBands[insuredType];
  const sumAssured = deathIncomeSelectedSumAssured[insuredType];
  const period = deathIncomeSelectedPeriods[insuredType];
  if (ageBand && sumAssured && period) {
    return total + getAmount(deathIncomeBenefitData, insuredType, ageBand, `${sumAssured}x${period}`);
  }
  return total;
}, 0);


const totalFamilyProviderPremium = selectedMonthlyProviderInsuredTypes.reduce((total, insuredType) => {
  const ageBand = familyProviderSelectedAgeBands[insuredType];
  const sumAssured = familyProviderSelectedSumAssured[insuredType];
  const period = familyProviderSelectedPeriods[insuredType];
  if (ageBand && sumAssured && period) {
    return total + getAmount(monthlyProviderBenefitData, insuredType, ageBand, `${sumAssured}x${period}`);
  }
  return total;
}, 0);

const totalLifeCoverPremium = calculateTotalPremium(lifeCoverBenefitData, selectedLifeCoverTypes);

useEffect(() => {
  // Calculate the total premium whenever any of the relevant state variables change
  const total = (
    totalFuneralPremium +
    totalTombstonePremium +
    totalCowPremium +
    totalFamilyProviderPremium +
    totalDeathIncomePremium +
    totalLifeCoverPremium
  );
  
  // Update the total premium state
  setTotalPremium(total);
}, [totalFuneralPremium, totalTombstonePremium, totalCowPremium, totalDeathIncomePremium, totalFamilyProviderPremium, totalLifeCoverPremium]);



  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.logoContainer}>
    <Image source={require('./assets/LOGO.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>UNBUNDLED TJOBOLO PREMIUMS</Text>

      <View style={styles.wrapper}>
  {/* Funeral Benefit */}
  <TouchableOpacity style={styles.button} onPress={() => setShowFuneralBenefitPicker(!showFuneralBenefitPicker)}>
    <Text style={styles.buttonText}>Funeral Benefit</Text>
  </TouchableOpacity>

  {showFuneralBenefitPicker && (
    <View style={styles.container}>
      <View style={styles.column}>
        {Object.keys(funeralBenefitData).map((insuredType) => (
          <View key={insuredType} style={styles.row}>
            <RadioButton
              value={insuredType}
              status={selectedFuneralInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
              onPress={() => handleFuneralRadioButtonPress(insuredType)}
            />
            <Text style={styles.radioLabel}>
              {selectedFuneralInsuredTypes.includes(insuredType)
                ? insuredTypeShortNames[insuredType]
                : insuredTypeLongNames[insuredType]}
            </Text>
            {selectedFuneralInsuredTypes.includes(insuredType) && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedFuneralAgeBands[insuredType]}
                  style={styles.picker}
                  onValueChange={(value) => {
                    setSelectedFuneralAgeBands((prevAgeBands) => ({
                      ...prevAgeBands,
                      [insuredType]: value,
                    }));
                    setSelectedFuneralSumAssured((prevSumAssured) => ({
                      ...prevSumAssured,
                      [insuredType]: '',
                    }));
                  }}
                >
                  <Picker.Item label="Age Band" value="" />
                  {getAgeBands(funeralBenefitData, insuredType).map((band) => (
                    <Picker.Item key={band} label={band} value={band} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedFuneralSumAssured[insuredType]}
                  style={styles.picker}
                  onValueChange={(value) =>
                    setSelectedFuneralSumAssured((prevSumAssured) => ({
                      ...prevSumAssured,
                      [insuredType]: value,
                    }))
                  }
                >
                  <Picker.Item label="Sum Assured" value="" />
                  {getSumAssuredOptions(funeralBenefitData, insuredType, selectedFuneralAgeBands[insuredType]).map((sum) => (
                    <Picker.Item key={sum} label={sum} value={sum} />
                  ))}
                </Picker>
                {selectedFuneralSumAssured[insuredType] && (
                  <Text style={styles.amountText}>
                    {' = M'}
                    {getAmount(funeralBenefitData, insuredType, selectedFuneralAgeBands[insuredType], selectedFuneralSumAssured[insuredType]).toFixed(2)}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>TOTAL FUNERAL BENEFIT PREMIUM</Text>
        <Text style={styles.totalAmountText}>{' = M'}{totalFuneralPremium.toFixed(2)}</Text>
      </View>
    </View>
  )}


    {/* Tombstone Benefit */}
<TouchableOpacity style={styles.button} onPress={() => setShowTombstoneBenefitPicker(!showTombstoneBenefitPicker)}>
  <Text style={styles.buttonText}>Tombstone Benefit</Text>
</TouchableOpacity>

{showTombstoneBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(tombstoneBenefitData).map((insuredType) => (
        <View key={insuredType} style={styles.row}>
          <RadioButton
            value={insuredType}
            status={selectedTombstoneInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleTombstoneRadioButtonPress(insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedTombstoneInsuredTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedTombstoneInsuredTypes.includes(insuredType) && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedTombstoneAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => {
                  setSelectedTombstoneAgeBands((prevAgeBands) => ({
                    ...prevAgeBands,
                    [insuredType]: value,
                  }));
                  setSelectedTombstoneSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: '',
                  }));
                }}
              >
                <Picker.Item label="Age Band" value="" />
                {getAgeBands(tombstoneBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedTombstoneSumAssured[insuredType]}
                style={styles.picker}
                onValueChange={(value) =>
                  setSelectedTombstoneSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: value,
                  }))
                }
              >
                <Picker.Item label="Sum Assured" value="" />
                {getSumAssuredOptions(tombstoneBenefitData, insuredType, selectedTombstoneAgeBands[insuredType]).map((sum) => (
                  <Picker.Item key={sum} label={sum} value={sum} />
                ))}
              </Picker>
              {selectedTombstoneSumAssured[insuredType] && (
                <Text style={styles.amountText}>
                  {' = M'}
                  {getAmount(tombstoneBenefitData, insuredType, selectedTombstoneAgeBands[insuredType], selectedTombstoneSumAssured[insuredType]).toFixed(2)}
                </Text>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>TOTAL TOMBSTONE BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalTombstonePremium.toFixed(2)}</Text>
    </View>
  </View>
)}


     {/* Cow Benefit */}
<TouchableOpacity style={styles.button} onPress={() => setShowCowBenefitPicker(!showCowBenefitPicker)}>
  <Text style={styles.buttonText}>Cow Benefit</Text>
</TouchableOpacity>

{showCowBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(cowBenefitData).map((insuredType) => (
        <View key={insuredType} style={styles.row}>
          <RadioButton
            value={insuredType}
            status={selectedCowInsuredTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleCowRadioButtonPress(insuredType)}
          />
          <Text style={styles.radioLabel}>
            {selectedCowInsuredTypes.includes(insuredType)
              ? insuredTypeShortNames[insuredType]
              : insuredTypeLongNames[insuredType]}
          </Text>
          {selectedCowInsuredTypes.includes(insuredType) && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedCowAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => {
                  setSelectedCowAgeBands((prevAgeBands) => ({
                    ...prevAgeBands,
                    [insuredType]: value,
                  }));
                  setSelectedCowSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: '',
                  }));
                }}
              >
                <Picker.Item label="Age Band" value="" />
                {getAgeBands(cowBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedCowSumAssured[insuredType]}
                style={styles.picker}
                onValueChange={(value) =>
                  setSelectedCowSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: value,
                  }))
                }
              >
                <Picker.Item label="Sum Assured" value="" />
                {getSumAssuredOptions(cowBenefitData, insuredType, selectedCowAgeBands[insuredType]).map((sum) => (
                  <Picker.Item key={sum} label={sum} value={sum} />
                ))}
              </Picker>
              {selectedCowSumAssured[insuredType] && (
                <Text style={styles.amountText}>
                  {' = M'}
                  {getAmount(cowBenefitData, insuredType, selectedCowAgeBands[insuredType], selectedCowSumAssured[insuredType]).toFixed(2)}
                </Text>
              )}
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>TOTAL COW BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalCowPremium.toFixed(2)}</Text>
    </View>
  </View>
)}


<TouchableOpacity
  style={styles.button}
  onPress={() => setShowFamilyProviderBenefitPicker(!showFamilyProviderBenefitPicker)}
>
  <Text style={styles.buttonText}>Monthly Provider Benefit</Text>
</TouchableOpacity>

{showFamilyProviderBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(monthlyProviderBenefitData).map((insuredType) => (
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
                selectedValue={familyProviderSelectedAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => {
                  setFamilyProviderSelectedAgeBands((prevAgeBands) => ({
                    ...prevAgeBands,
                    [insuredType]: value,
                  }));
                }}
              >
                <Picker.Item label="Age Band" value="" />
                {getAgeBands(monthlyProviderBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} />
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
                <Picker.Item label="Sum Assured" value="" />
                {getSumAssuredAmounts(
                  monthlyProviderBenefitData,
                  insuredType,
                  familyProviderSelectedAgeBands[insuredType]
                ).map((amount) => (
                  <Picker.Item key={amount} label={amount} value={amount} />
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
                <Picker.Item label="Period" value="" />
                {getPeriodOptions(
                  monthlyProviderBenefitData,
                  insuredType,
                  familyProviderSelectedAgeBands[insuredType],
                  familyProviderSelectedSumAssured[insuredType]
                ).map((period) => (
                  <Picker.Item key={period} label={period} value={period} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>MONTHLY PROVIDER BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalFamilyProviderPremium.toFixed(2)}</Text>
    </View>
  </View>
)}



<TouchableOpacity
  style={styles.button}
  onPress={() => setShowDeathIncomeBenefitPicker(!showDeathIncomeBenefitPicker)}
>
  <Text style={styles.buttonText}>Death Income Benefit</Text>
</TouchableOpacity>

{showDeathIncomeBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(deathIncomeBenefitData).map((insuredType) => (
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
                selectedValue={deathIncomeSelectedAgeBands[insuredType]}
                style={styles.picker}
                onValueChange={(value) => {
                  setDeathIncomeSelectedAgeBands((prevAgeBands) => ({
                    ...prevAgeBands,
                    [insuredType]: value,
                  }));
                  setDeathIncomeSelectedSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: '',
                  }));
                  setDeathIncomeSelectedPeriods((prevPeriods) => ({
                    ...prevPeriods,
                    [insuredType]: '',
                  }));
                }}
              >
                <Picker.Item label="Age Band" value="" />
                {getAgeBands(deathIncomeBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} />
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
                <Picker.Item label="Sum Assured" value="" />
                {getSumAssuredAmounts(
                  deathIncomeBenefitData,
                  insuredType,
                  deathIncomeSelectedAgeBands[insuredType]
                ).map((amount) => (
                  <Picker.Item key={amount} label={amount} value={amount} />
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
                <Picker.Item label="Period" value="" />
                {deathIncomeSelectedSumAssured[insuredType]
                  ? getPeriodOptions(
                      deathIncomeBenefitData,
                      insuredType,
                      deathIncomeSelectedAgeBands[insuredType],
                      deathIncomeSelectedSumAssured[insuredType]
                    ).map((period) => (
                      <Picker.Item key={period} label={period} value={period} />
                    ))
                  : null}
              </Picker>
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>DEATH INCOME BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalDeathIncomePremium.toFixed(2)}</Text>
    </View>
  </View>
)}



<TouchableOpacity
  style={styles.button}
  onPress={() => setShowLifeCoverBenefitPicker(!showLifeCoverBenefitPicker)}
>
  <Text style={styles.buttonText}>Life Cover Benefit</Text>
</TouchableOpacity>

{showLifeCoverBenefitPicker && (
  <View style={styles.container}>
    <View style={styles.column}>
      {Object.keys(lifeCoverBenefitData).map((insuredType) => (
        <View key={insuredType} style={styles.row}>
          <RadioButton
            value={insuredType}
            status={selectedLifeCoverTypes.includes(insuredType) ? 'checked' : 'unchecked'}
            onPress={() => handleLifeRadioButtonPress(insuredType)}
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
                onValueChange={(value) => {
                  setSelectedAgeBands((prevAgeBands) => ({
                    ...prevAgeBands,
                    [insuredType]: value,
                  }));
                  setSelectedSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: '',
                  }));
                }}
              >
                <Picker.Item label="Age Band" value="" />
                {getAgeBands(lifeCoverBenefitData, insuredType).map((band) => (
                  <Picker.Item key={band} label={band} value={band} />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedSumAssured[insuredType]}
                style={styles.picker}
                onValueChange={(value) =>
                  setSelectedSumAssured((prevSumAssured) => ({
                    ...prevSumAssured,
                    [insuredType]: value,
                  }))
                }
              >
                <Picker.Item label="Sum Assured" value="" />
                {getSumAssuredOptions(
                  lifeCoverBenefitData,
                  insuredType,
                  selectedAgeBands[insuredType]
                ).map((sum) => (
                  <Picker.Item key={sum} label={sum} value={sum} />
                ))}
              </Picker>
            </View>
          )}
        </View>
      ))}
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>LIFE COVER BENEFIT PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalLifeCoverPremium.toFixed(2)}</Text>
    </View>
  </View>
)}


      <Text style={styles.label}>TOTAL PREMIUM</Text>
      <Text style={styles.totalAmountText}>{' = M'}{totalPremium.toFixed(2)}</Text>
    </View>

    <View style={styles.buttonResetContainer} >
    <TouchableOpacity style={styles.buttonReset} onPress={resetAllSelections}>
  <Text style={styles.buttonText}>Reset Selections</Text>
</TouchableOpacity>
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
    alignItems: 'center', // Center the logo horizontally
    marginTop: 20,
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
    textAlign: 'center', // Ensure the text is centered
  },
  pickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    width: '50%', // Adjust width as needed
    height: 40, // Adjust height as needed
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: 'cornflowerblue',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 10,
  },
  amountText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
  totalAmountText: {
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    color: 'purple',
    marginLeft: 10,
    fontSize: 16,
  },
});

    
export default App;


