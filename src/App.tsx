import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import firebase from "firebase";

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NoteDetails from './pages/note-details/NoteDetails';
import Sidebar from './components/Sidebar';

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

const App: React.FC = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) setUser(user);
    });
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Sidebar user={user}/>
          <IonRouterOutlet id="main">
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/home" exact> <Home user={user} /> </Route>
            <Route path="/note" component={NoteDetails} exact />
            <Route path="/note/:id" exact render={(props) => <NoteDetails {...props} />}/> 
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter >
    </IonApp>
  )
};

export default App;
