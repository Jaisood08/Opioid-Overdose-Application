import auth from '@react-native-firebase/auth'
import Snackbar from 'react-native-snackbar'
import database from '@react-native-firebase/database'


import { GoogleSignin ,statusCodes} from '@react-native-google-signin/google-signin';

export const googleLogin = (data) => async (dispatch) => {
    
    try{
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        auth().
        signInWithCredential(googleCredential).
        then((data) => {
            console.log(data)
            
            database()
            .ref('/users/' + data.user.uid)
            .update({
                name : data.user.displayName, 
                email : data.user.email,
                image :  data.user.photoURL,
                uid: data.user.uid
            })
            .then(() => console.log('Data set success'))
            
        })

        Snackbar.show({
            text: "Account Signin",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    }
    catch(error){
        console.log(error);
    }
}




export const signUp = (data) => async (dispatch) => {
    console.log(data)
    const {name, Contact, bio, email, password,Address, country, image} = data

    auth().createUserWithEmailAndPassword(email, password)
    .then((data) => {
        console.log(data)
        console.log("User creation was succes")

        database()
        .ref('/users/' + data.user.uid)
        .set({
            name, 
            Contact,
            email,
            country,
            image,
            Bio:bio,
            Address,
            uid: data.user.uid
        })
        .then(() => console.log('Data set success'))
        Snackbar.show({
            text: 'account created',
            textColor: 'white',
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        console.error(error)
        Snackbar.show({
            text: "Signup failed",
            textColor: 'white',
            backgroundColor:'red'
        })
    })
}

export const signIn = (data) => async (dispatch) => {
    console.log(data)
    const {email, password} = data

    auth()
        .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Sign in success")
                Snackbar.show({
                    text: "account signin",
                    textColor: "white",
                    backgroundColor: "#1b262c"
                })
            })
            .catch((error) => {
                console.error(error)
                Snackbar.show({
                    text: "Signin failed",
                    textColor: "white",
                    backgroundColor: "red"
                })
            })
}


export const GoggleData = () => async (dispatch) => {
    try {
        const userInfo = await GoogleSignin.getCurrentUser();
        console.log(userInfo);
      } 
      catch (error) {
            console.error(error);
        }
}


export const signOut = () => async (dispatch) => {
    auth()
    .signOut()
    .then(() => {
        Snackbar.show({
            text: "SignOut success",
            textColor: "white",
            backgroundColor: "#1b262c"
        })
    })
    .catch((error) => {
        try {
            GoogleSignin.signOut();
            this.setState({ user: null }); // Remember to remove the user from your app's state as well
          } catch (error) {
            console.error(error);
            Snackbar.show({
                text: "Signout failed",
                textColor: "white",
                backgroundColor: "red"
            })
          }
    })
}