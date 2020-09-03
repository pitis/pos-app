import axios from 'axios'
import { Product } from '../interfaces/Product.interface'

export const addReceipt = async (
  productsOnReceipt: Product[],
  reducereProcent: number
) => {
  console.log(productsOnReceipt, reducereProcent)

  let loginInfo = `{"APIkey":"88a0ed238faf8efc289f3c1c896668b0","u":"admin","p":"Testamaplicatia30"
  ,"c":"097532","met":"Bonuri","act":"Ins"}`

  console.log(JSON.parse(loginInfo))

  // let postReceipt = await axios.post(`https://api.facturis-online.ro/api/?json=`)
}
