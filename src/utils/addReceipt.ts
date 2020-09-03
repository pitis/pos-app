import axios from 'axios'
import moment from 'moment'
import { Product } from '../interfaces/Product.interface'

export const addReceipt = async (
  productsOnReceipt: Product[],
  total: number,
  reducereProcent: number
) => {
  let finalObjString: string = `{"APIkey":"88a0ed238faf8efc289f3c1c896668b0","u":"admin","p":"Testamaplicatia30"
    ,"c":"097532","met":"Bonuri","act":"Ins"}`

  let finalObj = JSON.parse(finalObjString)

  let dataFact = {
    facturi_key: '',
    facturi_punct_de_lucru: '',
    facturi_gestiune: '',
    facturi_data: moment().format(),
    facturi_data_scadenta: '2020-09-31',
    modalitate_plata_bon: 'Cash',
    mod_plata_cash: total,
    mod_plata_card: 0.0,
    mod_plata_tiket: 0.0,
    facturi_cota_tva: '19%',
    facturi_moneda: 'RON',
    facturi_nume_client: '',
    facturi_tip_persoana: 'fizica',
    // facturi_codf_client: 18181818181,
    // facturi_nrreg_client: cd23123213,
    // facturi_sediu_client: Bacau,
    // facturi_judet_client: Bacau,
    // facturi_cont_client: Cont,
    // facturi_banca_client: banca,
    // facturi_clienti_adresa_livrare: adresa de livrare,
    // facturi_obs_client: obs_client,
    // facturi_nume_delegat: nume delegat,
    // facturi_act_delegat: act delegat,
    // facturi_obs_delegat: obs delegat,
    // facturi_obs_up: alte observatii,
    facturi_status: 'Emisa',
  }

  let dataProd: any = []

  productsOnReceipt.forEach((elem, index) => {
    let receiptProduct = {
      facturi_prod_nume: elem.Denumire,
      facturi_prod_moneda: elem.Moneda,
      facturi_prod_pretftva: elem.Pretul_fara_TVA,
      facturi_prod_pretctva: elem.Pret_cu_TVA,
      facturi_prod_cant: elem.count,
      facturi_prod_um: 'BUC',
      facturi_prod_val: 0.81 * parseFloat(elem.Pret_cu_TVA),
      facturi_prod_val_tva: 0.19 * parseFloat(elem.Pret_cu_TVA),
      facturi_prod_val_tot: elem.Pret_cu_TVA,
      prod_cod: elem.Id,
      prod_sku: '-',
      prod_cod1: '-',
      prod_cod_cautare: elem.Id,
      facturi_prod_tva: '19%',
    }

    dataProd[index] = receiptProduct
  })

  finalObj.dataFact = dataFact
  finalObj.dataProd = dataProd

  let postReceipt = await axios.post(
    `https://api.facturis-online.ro/api/?json=${JSON.stringify(finalObj)}`
  )

  //add to localStorage

  let newBon = {
    key: localStorage.bonuri.length,
    data: moment().format('LLL'),
    valoare: total * 0.81,
    valoare_tva: total * 0.19,
    valoare_totala: total,
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash',
  }

  let bonuri = JSON.parse(localStorage.bonuri)
  bonuri.push(newBon)
  localStorage.bonuri = JSON.stringify(bonuri)

  console.log(postReceipt.data)
}
