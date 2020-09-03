import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { trashOutline, pricetagOutline } from 'ionicons/icons'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonToast,
  IonItem,
  IonText,
  IonList,
  IonLabel,
  IonNote,
  IonButton,
  IonModal,
  IonRange,
  IonIcon,
} from '@ionic/react'
import { Product } from '../interfaces/Product.interface'
import { addReceipt } from '../utils/addReceipt'

const Tab2: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [counter, setCounter] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [productsOnReceipt, setProductsOnReceipt] = useState<Product[]>([])
  const [showToast, setShowToast] = useState<boolean>(false)
  const [reducereProcent, setReducereProcent] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    async function getProducts() {
      try {
        let productsRes = await axios.get(`https://api.facturis-online.ro/api/?json={"APIkey":"88a0ed238faf8efc289f3c1c896668b0","u":"admin","p":"Testamaplicatia30"
        ,"c":"097532","met":"Produse","act":"Get"}`)
        console.log(productsRes.data.result)
        setProducts(productsRes.data.result)
        setFilteredProducts(productsRes.data.result)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [])

  useEffect(() => {
    if (products) {
      setFilteredProducts(
        products.filter(
          (product: Product) =>
            product.Denumire.toUpperCase().indexOf(searchText.toUpperCase()) >
            -1
        )
      )
    }
  }, [searchText, products])

  useEffect(() => {
    let totalBon: number = 0
    productsOnReceipt.forEach(elem => {
      totalBon += parseFloat(elem.Pret_cu_TVA) * elem.count
    })
    setTotal(totalBon)
  }, [productsOnReceipt])

  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen={showModal}>
          <IonText>Alege procentul de reducere</IonText>
          <IonItem>
            <IonRange
              pin={true}
              min={0}
              max={30}
              value={reducereProcent}
              onIonChange={(e) => setReducereProcent(e.detail.value as number)}
            />
          </IonItem>
          <IonButton onClick={() => setShowModal(false)}>Salveaza</IonButton>
        </IonModal>
        <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
      </IonContent>
      <IonHeader>
        <IonToolbar color='tertiary'>
          <IonTitle>Adauga bon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div style={{ display: 'flex', height: '100%', background: '#999' }}>
        <div style={{ width: '70%', height: '100%' }}>
          <IonContent color='medium' style={{ width: '98%' }}>
            <IonToast
              isOpen={showToast}
              color={'danger'}
              onDidDismiss={() => setShowToast(false)}
              position={'top'}
              message='Insereaza produse inainte sa incasezi.'
              duration={3000}
            />
            <IonHeader collapse='condense'>
              <IonToolbar>
                <IonTitle size='large'>Adauga bon</IonTitle>
              </IonToolbar>
            </IonHeader>
            <div style={{ display: 'flex' }}>
              <IonSearchbar
                style={{ width: '80%' }}
                value={searchText}
                placeholder={'Cauta produse...'}
                onIonChange={(e) => setSearchText(e.detail.value!)}
              ></IonSearchbar>
              <div className='counter'>
                <div className='counter__inner'>
                  <button
                    onClick={() => {
                      if (counter !== 1) setCounter(counter - 1)
                    }}
                  >
                    -
                  </button>
                  <IonText color='primary'>{counter}</IonText>
                  <button onClick={() => setCounter(counter + 1)}>+</button>
                </div>
              </div>
            </div>

            {filteredProducts &&
              filteredProducts.map(
                (
                  elem: Product,
                  index: number
                ) => (
                    <IonItem
                      key={index}
                      onClick={() => {
                        setProductsOnReceipt([
                          ...productsOnReceipt,
                          { ...elem, key: uuidv4(), count: counter }
                        ])
                      }}
                    >
                      {elem.Denumire}
                    </IonItem>
                  )
              )}
          </IonContent>
        </div>
        <div style={{ width: '30%', height: '100%' }}>
          <IonContent style={{ height: '88%' }}>
            <div slot='fixed' className='buttons-container'>
              <button
                className='delete-button'
                onClick={() => {
                  setProductsOnReceipt([])
                  setReducereProcent(0)
                }}
              >
                <IonIcon icon={trashOutline} />
              </button>
              <button
                className='reducere-button'
                onClick={() => setShowModal(true)}
              >
                <IonIcon icon={pricetagOutline} />
              </button>
            </div>
            <IonList style={{ marginTop: '1.5rem' }}>
              {productsOnReceipt &&
                productsOnReceipt.map(
                  (
                    elem: Product,
                    index: number
                  ) => (
                      <IonItem key={elem.key}>
                        <IonNote slot='start'>{elem.count}</IonNote>
                        <IonLabel>
                          {elem.Denumire}{' '}
                          {parseFloat(elem.Pret_cu_TVA).toFixed(2)}RON
                      </IonLabel>
                        <IonNote
                          slot='end'
                          onClick={() => {
                            let receiptRef = [...productsOnReceipt]

                            setProductsOnReceipt(
                              receiptRef.filter(
                                (elem2, index2) => index2 !== index
                              )
                            )
                          }}
                        >
                          X
                      </IonNote>
                      </IonItem>
                    )
                )}
              {reducereProcent > 0 && <IonItem>
                <IonNote slot='start'>1</IonNote>
                <IonLabel>
                  {`Reducere ${reducereProcent}%`}
                </IonLabel>
                <IonNote
                  slot='end'
                  onClick={() => setReducereProcent(0)}
                >
                  X
                      </IonNote>
              </IonItem>}
            </IonList>
          </IonContent>
          <h3 style={{ color: 'white' }}>Total: {total}RON</h3>
          <IonButton
            style={{}}
            expand='block'
            color='primary'
            onClick={() => {
              if (productsOnReceipt.length > 0) addReceipt(productsOnReceipt, total, reducereProcent)
              else setShowToast(true)
            }}
          >
            Incaseaza
          </IonButton>
        </div>
      </div>
    </IonPage>
  )
}

export default Tab2
