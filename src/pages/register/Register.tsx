import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonRouterLink } from '@ionic/react';
import { logoGoogle, logoFacebook } from 'ionicons/icons'

import React from 'react';
import ExploreContainer from '../../components/ExploreContainer';

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="secondary">
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
                  <IonInput name="name" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Data de nascimento</IonLabel>
                  <IonInput name="birthDate" type="date" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">E-mail</IonLabel>
                  <IonInput type="email" required></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Senha</IonLabel>
                  <IonInput type="password" required></IonInput>
                </IonItem>
              </div>
              <div className="ion-padding">
                <IonButton expand="block">Cadastre-se</IonButton>
              </div>
              <div className="ion-padding-horizontal ion-padding-bottom links-end">
                <IonRouterLink routerLink="/login" className="link highlighted">Fazer Login</IonRouterLink>
              </div>
              <div className="ion-text-center">
                <IonLabel>Ou então</IonLabel>
              </div>
              <div className="ion-padding">
                <IonButton color="danger" expand="block"><IonIcon icon={logoGoogle}></IonIcon>Entre com Google</IonButton>
                <IonButton color="tertiary" expand="block"><IonIcon icon={logoFacebook}></IonIcon>Entre com Facebook</IonButton>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Register;