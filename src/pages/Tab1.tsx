import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Table } from 'antd'
import { columns } from '../utils/columns'
import 'antd/dist/antd.css';


const data = [
  {
    key: '1',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 32,
    valoare_totala: 'New York No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
  {
    key: '2',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 42,
    valoare_totala: 'London No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
  {
    key: '3',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 32,
    valoare_totala: 'Sidney No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
  {
    key: '4',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 32,
    valoare_totala: 'Sidney No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
  {
    key: '5',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 32,
    valoare_totala: 'Sidney No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
  {
    key: '6',
    data: new Date().toString(),
    valoare: 123,
    valoare_tva: 32,
    valoare_totala: 'Sidney No. 1 Lake Park',
    moneda: 'RON',
    status: 'Emis',
    mod_plata: 'Cash'
  },
];

const Tab1: React.FC = () => {
  useEffect(() => {
    if (!localStorage.bonuri) {
      localStorage.setItem('bonuri', JSON.stringify(data))
    }
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bonuri</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Table columns={columns} pagination={false} dataSource={JSON.parse(localStorage.getItem("bonuri"))} scroll={{ x: 500, y: 800 }} />
      </IonContent>
    </IonPage>
  )
}

export default Tab1;
