import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonLabel, IonItem, IonBackButton, IonInput, IonTextarea, IonCheckbox } from '@ionic/react';
import React, { useState } from 'react';
import './NoteDetails.css';

import NoteDetailsFooter from '../../components/NoteDetailsFooter';
  
const NoteDetails: React.FC = () => {
    const [ionTitle, setIonTitle] = useState("Nova Nota...")
    const [state, setState] = React.useState({
        title: "",
        content: "",
        active: false
    });

    function handleChange(evt: any) {
        const value = evt.target.name === "active" ? evt.target.checked : evt.target.value;
        
        setState({
          ...state,
          [evt.target.name]: value
        });

        if(evt.target.name === "title") setIonTitle(value)
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
                    <IonInput value={state.title} onIonChange={(e: any) => handleChange(e) } name="title" required>
                    </IonInput>
                </IonItem>
                
                <IonItem>
                    <IonLabel position="stacked">Conteúdo</IonLabel>
                    <IonTextarea value={state.content} onIonChange={(e: any) => handleChange(e) } name="content" rows={8}></IonTextarea>
                </IonItem>

                <IonItem>
                    <IonLabel position="fixed">Ativo</IonLabel>
                    <IonCheckbox defaultChecked={state.active} onIonChange={(e: any) => handleChange(e) } name="active">
                    </IonCheckbox>
                </IonItem>
            </IonContent>
            <NoteDetailsFooter note={state} />
        </IonPage>
    );
};

export default NoteDetails;
