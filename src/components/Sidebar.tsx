import  React, { useEffect, useState } from  "react";
import { IonMenu, IonContent, IonList, IonItem } from "@ionic/react";
import LogoutButton from "./LogoutButton";
import firebase from "firebase";

const Sidebar: React.FC<{
        user: any;
    }> = (props) => {

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const fetchData = async() => {
        try {
            const response = await firebase.firestore()
                .collection("users")
                .where("id", "==", props.user?.uid)
                .get();

            response.forEach(element => {
                setUserName(element.data()?.name)
            });
            
        } catch(err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if(props.user && !props.user?.displayName) {
            fetchData();
        } else {
            setUserName(props.user?.displayName);
        }
        setUserEmail(props.user?.email);
        
    })

    return (
        <IonMenu type="overlay" contentId="main">
            <IonContent>
              <IonList>
                <IonItem lines="none">
                  <div className="userInfo">
                    <h3><b>{userName}</b></h3>
                    <p>{userEmail}</p>
                  </div>
                </IonItem>
              </IonList>
              <LogoutButton className="alinharBotao" />
            </IonContent>
          </IonMenu>
    );
};
export default Sidebar;