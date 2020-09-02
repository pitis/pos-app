import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonToast, IonItem, IonText, IonList, IonLabel, IonNote, IonButton } from '@ionic/react';

const Tab2: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [products, setProducts] = useState<[]>([]);
  const [productsOnReceipt, setProductsOnReceipt] = useState<[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false)

  useEffect(() => {
    async function getProducts() {
      try {
        let productsRes = await axios.get(`https://api.facturis-online.ro/api/?json={"APIkey":"88a0ed238faf8efc289f3c1c896668b0","u":"admin","p":"Testamaplicatia30"
        ,"c":"097532","met":"Produse","act":"Get"}`)
        console.log(productsRes.data.result)
        setProducts(productsRes.data.result)
      } catch (error) {
        console.error(error)
      }
    }
    getProducts()
  }, [])

  return (
    <IonPage>
      <IonHeader >
        <IonToolbar color='tertiary'>
          <IonTitle>Adauga bon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div style={{ display: 'flex', height: '100%', background: '#999' }}>

        <div style={{ width: '70%', height: '100%' }}>
          <IonContent color='medium'>
            <IonToast
              isOpen={showToast}
              onDidDismiss={() => setShowToast(false)}
              message="Your settings have been saved."
              duration={3000}
            />
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Adauga bon</IonTitle>
              </IonToolbar>
            </IonHeader>
            <div style={{ display: 'flex' }}>
              <IonSearchbar style={{ width: '80%' }} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
              <IonText>Aici o sa fie + - cate</IonText>
            </div>

            {products && products.map((elem: { Denumire: string }, index) => <IonItem key={index}>{elem.Denumire}</IonItem>)}
          </IonContent>
        </div>
        <div style={{ width: '30%', height: '95%', margin: 'auto' }}>
          <IonContent >
            <IonList>
              {products && products.map((elem: { Denumire: string, Pret_cu_TVA: number }, index) => {
                return <IonItem key={index}>
                  <IonLabel>{elem.Denumire} x {elem.Pret_cu_TVA}</IonLabel>
                  <IonNote slot="end">{index + 2}</IonNote>
                </IonItem>
              })}
            </IonList>
            <IonButton style={{ marginTop: '140%' }} expand="block" color='primary' onClick={() => console.log('incasare')}>Incaseaza</IonButton>
          </IonContent>
        </div>

      </div>
    </IonPage>
  );
};

export default Tab2;
