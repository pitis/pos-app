import React, { useState, Dispatch, SetStateAction } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonToast, IonInput, IonButton } from '@ionic/react';
import { Redirect } from 'react-router-dom'
import { setFlagsFromString } from 'v8';

const Login: React.FC<{ setLogged: Dispatch<SetStateAction<boolean>> }> = ({ setLogged }) => {
    const [cif, setCif] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [redirecting, setRedirecting] = useState<boolean>(false)
    const [showToast, setShowToast] = useState<boolean>(false)

    if (redirecting || localStorage.facturisLogat) return <Redirect to='/tab1' />

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonToast
                    isOpen={showToast}
                    position={'top'}
                    onDidDismiss={() => setShowToast(false)}
                    message="Invalid login details."
                    color={'danger'}
                    duration={3000}
                />
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Login</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonList>
                    <IonItem>
                        <IonInput value={cif} placeholder="CIF" type="number" onIonChange={e => setCif(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={username} placeholder="Username" onIonChange={e => setUsername(e.detail.value!)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput value={password} placeholder="Password" type="password" onIonChange={e => setPassword(e.detail.value!)}></IonInput>
                    </IonItem>
                </IonList>
                <IonButton color="primary" expand={'block'} onClick={() => {
                    if (username === 'admin' && password === 'Testamaplicatia30' && cif === '097532') {
                        localStorage.setItem('facturisLogat', 'logat')
                        console.log('logat')
                        setLogged(true)
                        setRedirecting(true)
                    } else setShowToast(true)
                }}>Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Login
