import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonItem, IonLabel, useIonViewWillEnter, useIonViewDidLeave, useIonViewDidEnter } from '@ionic/react';
import { add } from 'ionicons/icons';
import React, { useState } from 'react';
import firebase from "firebase";
import './Home.css';
import LogoutButton from '../../components/LogoutButton';

const Home: React.FC = () => {
  const userId = firebase.auth().currentUser?.uid;
  let initialArray: Array<[any, any]> = [];
  let array: Array<[any, any]> = [];
  const [itemList, setItemList] = useState(initialArray);

  const fetchData = async() => {
    try {
        const response = await firebase.firestore()
            .collection("notes")
            .where("user", "==", userId)
            .get();

        response.forEach(element => {
          let path = "/note/" + element.id;
          let title = element.data()?.title;
          array.push([path, title])
        })
    } catch(err) {
        console.error(err);
    }
  };  

  useIonViewDidEnter(()=> {
    if(userId) fetchData().then(() => {
      setItemList(array);
    });
  }, [])
  
  useIonViewDidLeave(()=> {
     setItemList(initialArray);
     array = [];
  })
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton autoHide={false}></IonMenuButton>
          </IonButtons>
          <IonTitle text-center>Versão React</IonTitle>
          <LogoutButton slot="end" />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/note" color="secondary">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonList>
          {
            itemList.map(
                ( _item, _index ) => (
                <IonItem key={_index} button routerLink={_item[0]}>
                  <IonLabel>{_item[1]}</IonLabel>
                </IonItem>
            ) )
          }
        </IonList>

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
