import moment from 'moment'

export const data = [
  {
    key: '1',
    data: moment('2020-05-07 12:30').format('LLL'),
    valoare: 16.8,
    valoare_tva: 3.19,
    valoare_totala: 20,
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash',
  },
  {
    key: '2',
    data: moment('2020-05-07 13:30').format('LLL'),
    valoare: 26.89,
    valoare_tva: 5.11,
    valoare_totala: 32.0,
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash',
  },
  {
    key: '3',
    data: moment('2020-05-07 14:30').format('LLL'),
    valoare: 36.13,
    valoare_tva: 6.86,
    valoare_totala: 43,
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash',
  },
  {
    key: '4',
    data: moment('2020-05-07 15:30').format('LLL'),
    valoare: 6.3,
    valoare_tva: 1.2,
    valoare_totala: 7.5,
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash',
  },
]
