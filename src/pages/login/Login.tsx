import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, useIonViewDidLeave } from '@ionic/react';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import firebase from 'firebase'
import LoginButtons from '../../components/LoginButtons';
import {  createLoading } from '../../loading';
import { toast } from '../../toast';

const Login: React.FC = () => {
  let history = useHistory();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useIonViewDidLeave(() => {
    setEmail("");
    setPassword("");
  });

  function goToHome() {
    history.push("/home");
  }

async function userLogin() {
  const loading = createLoading();
  (await loading).present();
    
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        goToHome();
      })
    } catch (error) {

      let message: string;
      console.log(error.code);
      
      switch(error.code){
        case 'auth/email-already-in-use':
          message = "E-mail já cadastrado!"
        break;

        case 'auth/invalid-email':
          message = "Verifique o e-mail digitado!"
        break;

        default:
          message = "Verifique se os dados foram preenchidos corretamente"
        break;
      }

      toast(message, 2000, "danger");
    } finally {
      (await loading).dismiss();
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Versão React</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol className="ion-align-self-center" size-md="6" size-lg="5" size-xs="12">
              <div className="ion-text-center">
                <h3>Login</h3>
               </div>
              <div className="ion-padding">
                <IonItem>
                  <IonLabel position="floating">E-mail</IonLabel>
                  <IonInput value={email} onIonChange={(e: any) => setEmail(e.target.value)} type="email" id="email" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Senha</IonLabel>
                  <IonInput value={password} onIonChange={(e: any) => setPassword(e.target.value)} type="password" id="password" required></IonInput>
                </IonItem>
              </div>
              <div className="ion-padding">
                <IonButton expand="block" onClick={userLogin}>Entrar</IonButton>
              </div>
              <div className="ion-padding-horizontal ion-padding-bottom links">
                <IonRouterLink routerLink="/login" className="link">Esqueceu a senha</IonRouterLink>
                <IonRouterLink routerLink="/register" routerDirection="forward" className="link highlighted">Cadastre-se</IonRouterLink>
              </div>
              <div className="ion-text-center">
                <IonLabel>Ou então</IonLabel>
             </div>
             <LoginButtons />
          </IonCol>
        </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;