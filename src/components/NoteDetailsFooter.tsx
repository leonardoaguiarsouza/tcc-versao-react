import  React, {  } from  "react";
import { IonButton, IonIcon, IonFooter, IonToolbar, IonRow, IonCol } from "@ionic/react";
import { checkmarkCircle, trash, save } from "ionicons/icons";
import { Note } from "../interfaces/note";

const NoteDetailsFooter: React.FC<{
        note: Note;
    }> = (props) => {
    
    let check: boolean = false;

    if(!props.note.id)
        check = true;
    else
        check = false;

    function aux() {
        console.log(props.note);
        
    }

    return check ? (
        <IonFooter>
            <IonToolbar color="success">
                <IonButton expand="full" fill="clear" color="light" onClick={aux}>
                    <IonIcon icon={checkmarkCircle} slot="start"></IonIcon>
                    Salvar
                </IonButton>
            </IonToolbar>
        </IonFooter>
    ) : (
        <IonFooter>
            <IonRow text-center className="ion-no-padding">
                <IonCol size="6">
                <IonButton expand="block" fill="outline" color="danger">
                    <IonIcon icon={trash} slot="start"></IonIcon>
                    Apagar
                </IonButton>
                </IonCol>
                <IonCol size="6">
                <IonButton expand="block" fill="solid" color="success">
                    <IonIcon icon={save} slot="start"></IonIcon>
                    Atualizar
                </IonButton>
                </IonCol>
            </IonRow>
        </IonFooter>
    );
};
export default NoteDetailsFooter;