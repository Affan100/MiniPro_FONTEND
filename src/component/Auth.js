import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import './Auth.css';
// import Home from './Home';


firebase.initializeApp({
    apiKey: "AIzaSyABkAvfQINIRpudOhg3Znj2UA76Ff_RIv0",
    authDomain: "mini-project-2755f.firebaseapp.com",
    projectId: "mini-project-2755f"
})


// class Auth extends Component {
const Auth = props => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callback: {
            signInSuccessUrl: () => false
        }
    };

    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user)
        })
    })


    return (
        <div className='login'>

            {isSignedIn ?
                (<div>
                    <div>
                        <img alt='profile picture' className='img' width='50px' src={firebase.auth().currentUser.photoURL} />
                        {/* <span className='email'>Welcome: {firebase.auth().currentUser.displayName}</span> */}
                        <span className='email'>{firebase.auth().currentUser.email}</span>

                        <span className='logout'>
                            <Button variant="danger" onClick={() => firebase.auth().signOut()}>Logout</Button>
                        </span>
                    </div>
                </div>)

                :

                (<StyledFirebaseAuth
                    uiConfig={uiConfig}
                    firebaseAuth={firebase.auth()}
                />)
            }
        </div >
    );


}
export default Auth;