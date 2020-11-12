import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonLabel, IonItem, IonBackButton, IonInput, IonTextarea, IonCheckbox, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import React, { useState } from 'react';
import NoteDetailsFooter from '../../components/NoteDetailsFooter';
import firebase from "firebase";
import './NoteDetails.css';

const NoteDetails: React.FC<{
        match: any;
    }> = (props) => {

    let initialState: any = {
        title: "",
        content: "",
        active: null
    }
        
    const id = props.match.params.id;
    const noteCollection = firebase.firestore().collection('notes');
    const [ionTitle, setIonTitle] = useState("Nova Nota...");
    const [state, setState] = React.useState(initialState);    
    const [noteActive, setNoteActive] = useState(false);    
    
    const fetchData = async() => {
        try {
            const response = await noteCollection
                .doc(id)
                .get();

            let data: any;

            if (response.exists)
                data = response.data();

            setState(data);
            setNoteActive(data.active);
        } catch(err) {
            console.error(err);
        }
    };

    useIonViewWillEnter(()=> {
        if(id) fetchData();
    })
    
    function handleChange(evt: any) {
        setState({
            ...state,
            [evt.target.name]: evt.target.value
        });
    }

    function handleChangeLeo(evt: any) {
        if(evt.detail.checked != null)
            setNoteActive(evt.detail.checked);
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
                    <IonCheckbox checked={noteActive} onIonChange={(e: any) => handleChangeLeo(e) } name="active" id="active" />
                </IonItem>
            </IonContent>
            <NoteDetailsFooter note={state} noteActive={noteActive} id={id}/>
        </IonPage>
    );
};

export default NoteDetails;