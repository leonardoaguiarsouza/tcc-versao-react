import  React, { useContext, useCallback } from  "react";
import { IonButtons, IonButton, IonIcon, NavContext } from "@ionic/react";
import { logOut } from "ionicons/icons";
import firebase from "firebase";

const LogoutButton: React.FC<{
        slot?: string;
    }> = (props) => {
   
    const {navigate} = useContext(NavContext);

    const goToLogin = useCallback(
        () => navigate('/login', 'back'),
        [navigate]
    );
    
    async function userLogout() {
        try {
        await firebase.auth().signOut().then(() => {
            goToLogin();
        })
        } catch(error) {
            console.log(">> " + error)
        }
    }   

    let check: boolean;

    if(props.slot != null)
        check = true;
    else
        check = false;

    return check ? (
        <IonButtons slot={props.slot}>
            <IonButton onClick={userLogout}>
              <IonIcon icon={logOut}></IonIcon>
                Logout
              </IonButton> 
          </IonButtons>
    ) : (
        <IonButtons>
            <IonButton onClick={userLogout}>
              <IonIcon icon={logOut}></IonIcon>
                Logout
              </IonButton> 
          </IonButtons>
    );
};
export default LogoutButton;