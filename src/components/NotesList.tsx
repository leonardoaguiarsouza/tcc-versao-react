import  React, { useContext, useCallback, useState, useEffect } from  "react";
import { IonButton, IonIcon, IonFooter, IonToolbar, IonRow, IonCol, NavContext, IonList, IonItem, IonLabel, useIonViewWillEnter, useIonViewDidEnter } from "@ionic/react";
import { checkmarkCircle, trash, save } from "ionicons/icons";
import firebase from "firebase";

function renderNotes(notes: any[]) {
  if (notes.length > 0) {      
      return notes.map((note, index) => (
        <IonItem key={index} button routerLink={note[0]}>
            <IonLabel>{note[1]}</IonLabel>
        </IonItem>
      ));
  }
  else return [];
}

// const Note = ({note}: any) => {
//   return ( 
//         <IonItem button routerLink={note[0]}>
//             <IonLabel>{note[1]}</IonLabel>
//         </IonItem>
//   );
// };

function Awesome({awesome}: any) {
  console.log(awesome);
  return(<></>);
};

const NotesList: React.FC<{
        notes: any;
      }> = (props) => {
        
      // const [notes, setNotes] = useState();
      useEffect(()=>{
        // setNotes(props.notes);
        // console.log(props.notes);
      }, [])
      
      return (
          <IonList>
              <IonItem button routerLink="asd">
                <IonLabel>"asda"</IonLabel>
              </IonItem>
          </IonList>
      );
};

export default NotesList;