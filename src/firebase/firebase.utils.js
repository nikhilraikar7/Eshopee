import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCHfqGn5vBthYXigZl3y2S-Ss2jOd9vfas",
    authDomain: "eshopee-db-dbefa.firebaseapp.com",
    projectId: "eshopee-db-dbefa",
    storageBucket: "eshopee-db-dbefa.appspot.com",
    messagingSenderId: "45696602460",
    appId: "1:45696602460:web:969a8bb883cf558e7a7199",
    measurementId: "G-ZQ9H0X8ETV"
  };

export const createUserProfileDocument = async(userAuth , additionalData) => {
  if(!userAuth) return ;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log("SnapShot is " + snapShot);

  if(!snapShot.exists){
    const { displayName , email } = userAuth ;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,email,createdAt,...additionalData
      })
    }catch(error){
      console.log('error creating user' , error.message);
    }

  }

  return userRef;
}

export const addCollectionAndDocuments = async ( collectionKey , objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef , obj);
  })

  return await batch.commit();

};

export const convertCollectionSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title , items } = doc.data();

    return {
    routeName : encodeURI(title.toLowerCase()) , 
    id : doc.id ,
    title , 
    items
};

  });

  return transformedCollection.reduce((accumulator , collection) => {
    accumulator[collection.title.toLowerCase()] = collection ;
    return accumulator ;
  } ,{} );
};

export const getCurrentUser = () => {
  return new Promise ((resolve , reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  });
}

  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt : 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase ;