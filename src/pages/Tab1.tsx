import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Table } from 'antd'
import { columns } from '../utils/columns'
import 'antd/dist/antd.css';

const Tab1: React.FC = () => {
  useEffect(() => {
    if (!localStorage.bonuri) localStorage.setItem('bonuri', JSON.stringify([]))
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
