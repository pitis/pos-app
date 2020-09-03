import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { receipt, addCircle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/styles.css';

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.facturisLogged) setLogged(true)
  }, [])

  useEffect(() => {
    if (logged) localStorage.setItem('facturisLogged', 'logat')
  }, [logged])

  return <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/" render={() => <Redirect to="/login" />} exact={true} />
          <Route path="/login" render={(props) => <Login {...props} setLogged={setLogged} />} exact={true} />
          <Route path="/tab1" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
        </IonRouterOutlet>
        {(logged || localStorage.facturisLogged) ? <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={receipt} />
            <IonLabel>Lista bonuri</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={addCircle} />
            <IonLabel>Adauga bon</IonLabel>
          </IonTabButton>
        </IonTabBar> : <IonTabBar slot="bottom"></IonTabBar>
        }
      </IonTabs>
    </IonReactRouter>
  </IonApp>
}

export default App;
