import { IonButton, IonIcon } from '@ionic/react';
import { logoGoogle, logoFacebook } from 'ionicons/icons'
import { useHistory } from "react-router-dom";
import React from 'react';
import firebase from 'firebase'

const LoginButtons: React.FC = () => {
  let history = useHistory();

  function GoToHome() {
    history.push("/home");
  }

  async function userLoginGoogle() {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        GoToHome();
      })
    } catch(error) {
      console.log(">> " + error)
    }
  }

  async function userLoginFacebook() {
    try {
      await firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
        GoToHome();
      })
    } catch(error) {
      console.log(">> " + error)
    }
  }

  return (
    <div className="ion-padding">
        <IonButton color="danger" expand="block" onClick={userLoginGoogle}><IonIcon slot="start" icon={logoGoogle}></IonIcon>Entre com Google</IonButton>
        <IonButton color="tertiary" expand="block" onClick={userLoginFacebook}><IonIcon slot="start" icon={logoFacebook}></IonIcon>Entre com Facebook</IonButton>
    </div>
  );
};

export default LoginButtons;