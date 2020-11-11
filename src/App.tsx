import React from 'react';
import { Redirect, Route, BrowserRouter } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

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

/* Custom CSS */
import './css/styles.css';

/* Theme variables */
import './theme/variables.css';
import NoteDetails from './pages/note-details/NoteDetails';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/home" component={Home} exact />
            <Route path="/note" component={NoteDetails} exact />
            <Route path="/note/:id" component={NoteDetails} exact />
          </IonRouterOutlet>
        </IonReactRouter >
      </IonApp>
    </BrowserRouter>
  )
};

export default App;
