import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonLabel, IonItem, IonBackButton, IonInput, IonTextarea, IonCheckbox, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Note } from "../../interfaces/note";
import firebase from "firebase";
import './NoteDetails.css';

import NoteDetailsFooter from '../../components/NoteDetailsFooter';
import { Component } from 'ionicons/dist/types/stencil-public-runtime';
  
const NoteDetails: React.FC<{
        match: any;
    }> = (props) => {

    let initialState: any = {
        title: "",
        content: "",
        active: null
    }
        
    type DocumentData = { [field: string]: any };
    const id = props.match.params.id;
    const noteCollection = firebase.firestore().collection('notes');  
    const [ionTitle, setIonTitle] = useState("Nova Nota...");
    const [state, setState] = React.useState(initialState);    

    const fetchData = async() => {
        try {
            const response = await firebase.firestore()
                .collection("notes")
                .doc(id)
                .get();

            let data: any;

            if (response.exists)
                data = response.data();

            setState(data);
        } catch(err) {
            console.error(err);
        }
    };

    useIonViewWillEnter(()=> {
        if(id) fetchData();        
    }, [])

    function compareObj(object1: any, object2: any) {
        return object1.active === object2.active;
      }

    function handleChange(evt: any) {
        let value = evt.target.name === "active" ? evt.target.checked : evt.target.value;
        if(evt.target.name === "title") setIonTitle(value)

        if(!compareObj(state, initialState)) {
            setState({
                ...state,
                [evt.target.name]: value
            });
        }
    }
    
    if(ionTitle === "")
        setIonTitle("Nova Nota...")

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                    <IonBackButton defaultHref="/home"></IonBackButton>
                    </IonButtons>
                    <IonTitle>{ ionTitle }</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Título</IonLabel>
                    <IonInput value={state.title} onIonChange={(e: any) => handleChange(e) } name="title" />
                </IonItem>
                
                <IonItem>
                    <IonLabel position="stacked">Conteúdo</IonLabel>
                    <IonTextarea value={state.content} onIonChange={(e: any) => handleChange(e) } name="content" rows={8} />
                </IonItem>
              
                <IonItem>
                    <IonLabel position="fixed">Ativo</IonLabel>
                    <IonCheckbox checked={state.active} onIonChange={(e: any) => handleChange(e) } name="active" />
                </IonItem>
            </IonContent>
            <NoteDetailsFooter note={state} id={id}/>
        </IonPage>
    );
};

export default NoteDetails;
