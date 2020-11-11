import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonRouterLink, useIonViewDidLeave } from '@ionic/react';
import React, { useState } from 'react';
import firebase from 'firebase'
import { useHistory } from 'react-router';
import LoginButtons from '../../components/LoginButtons';

const Register: React.FC = () => {
  let history = useHistory();
  let userCollection = firebase.firestore().collection('users');

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  useIonViewDidLeave(() => {
    setName("");
    setBirthDate("");
    setEmail("");
    setPassword("");
  });

  function GoToHome() {
    history.push("/home");
  }

  async function userRegister() {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        let userObj = {
          id: firebase.auth().currentUser?.uid,
          birthDate: birthDate,
          name: name
        }
        userCollection.add(userObj).then(() => {
          GoToHome();
        });
      });
    } catch(error) {
        console.log(">> " + error)
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
                <h3>Registre-se</h3>
              </div>
              <div className="ion-padding">
                <IonItem>
                  <IonLabel position="floating">Nome</IonLabel>
                  <IonInput value={name} onIonChange={(e: any) => setName(e.target.value)} type="text" name="name" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Data de nascimento</IonLabel>
                  <IonInput value={birthDate} onIonChange={(e: any) => setBirthDate(e.target.value)} name="birthDate" type="date" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">E-mail</IonLabel>
                  <IonInput value={email} onIonChange={(e: any) => setEmail(e.target.value)} name="email" type="email" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Senha</IonLabel>
                  <IonInput value={password} onIonChange={(e: any) => setPassword(e.target.value)} name="password" type="password" required></IonInput>
                </IonItem>
              </div>
              <div className="ion-padding">
                <IonButton onClick={userRegister} expand="block">Cadastre-se</IonButton>
              </div>
              <div className="ion-padding-horizontal ion-padding-bottom links-end">
                <IonRouterLink routerLink="/login" className="link highlighted">Fazer Login</IonRouterLink>
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

export default Register;