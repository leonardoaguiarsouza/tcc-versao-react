import  React, { useContext, useCallback, useState } from  "react";
import { IonButton, IonIcon, IonFooter, IonToolbar, IonRow, IonCol, NavContext, IonToast } from "@ionic/react";
import { checkmarkCircle, trash, save } from "ionicons/icons";
import { Note } from "../interfaces/note";
import firebase from "firebase";
import { toast } from "../toast";

const NoteDetailsFooter: React.FC<{
        note: any;
        noteActive: any;
        id: any;
    }> = (props) => {

    const {navigate} = useContext(NavContext);

    const goToHome = useCallback(
        () => navigate('/home', 'back'),
        [navigate]
    );

    const noteCollection = firebase.firestore().collection('notes');
    const userId = firebase.auth().currentUser?.uid;

    function addNote() {
        props.note.createdAt = new Date();
        props.note.lastModify = new Date();
        props.note.user = userId;
        props.note.active = props.noteActive;
        noteCollection.add(props.note).then(() => {
            goToHome();
            console.log("Nota criada com sucesso!");
        });
    }

    function updateNote() {
        props.note.lastModify = new Date();
        props.note.active = props.noteActive;
        noteCollection.doc(props.id).update(props.note).then(() => {
            goToHome();
            toast("Nota atualizada com sucesso!");
            console.log("Nota atualizada com sucesso!");
        });
    }

    function deleteNote() {
        noteCollection.doc(props.id).delete().then(() => {
            goToHome();
            toast("Nota excluida com sucesso!");
            console.log("Nota excluida com sucesso!");
        });
    }

    return !props.id ? (
        <IonFooter>
            <IonToolbar color="success">
                <IonButton expand="full" fill="clear" color="light" onClick={addNote}>
                    <IonIcon icon={checkmarkCircle} slot="start"></IonIcon>
                    Salvar
                </IonButton>
            </IonToolbar>
        </IonFooter>
    ) : (
        <IonFooter>
            <IonRow text-center className="ion-no-padding">
                <IonCol size="6">
                <IonButton expand="block" fill="outline" color="danger" onClick={deleteNote}>
                    <IonIcon icon={trash} slot="start"></IonIcon>
                    Apagar
                </IonButton>
                </IonCol>
                <IonCol size="6">
                <IonButton expand="block" fill="solid" color="success" onClick={updateNote}>
                    <IonIcon icon={save} slot="start"></IonIcon>
                    Atualizar
                </IonButton>
                </IonCol>
            </IonRow>
        </IonFooter>
    );
};
export default NoteDetailsFooter;