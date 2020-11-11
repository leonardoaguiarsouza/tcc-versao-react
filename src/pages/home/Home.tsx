import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import React from 'react';
import './Home.css';

import { add } from 'ionicons/icons';
  
const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonTitle text-center>Versão React</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/note" color="secondary">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        {/* <IonList>
          <IonItem button routerLink="/note', note.id">
            <IonLabel></IonLabel>
          </IonItem>
        </IonList> */}

        <IonGrid>
          <IonRow justify-content-center>
            <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
              
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
