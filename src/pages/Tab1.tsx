import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Table } from 'antd'
import { columns } from '../utils/columns'
import { data } from '../utils/exampleBonuri';
import 'antd/dist/antd.css';

const Tab1: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('bonuri', JSON.stringify(data))
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
