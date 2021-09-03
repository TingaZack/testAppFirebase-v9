import { Component } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import { collection, addDoc, getFirestore } from "firebase/firestore";

// import { getAuth,  } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TestApp';

  auth: any;
  database: any;
  dbFirestore: any;
  data = {
    username: 'loading...'
  };

  bookingsList: any;

  constructor() {
    this.auth = getAuth();
    this.database = getDatabase();
    this.dbFirestore = getFirestore();


    /*
    @bookingsRef: refences the booking node or path on the Realtime Database where the 'bookings' is located.
    */
    const bookingsRef = ref(this.database, 'bookings');


    /*
    this method is respobsible for retreiving the list of bookings from the Realtime Database.
    */
    onValue(bookingsRef, (snapshot) => {
      this.bookingsList = [];
      snapshot.forEach(element => {
        /*
        @bookingsList: this loops through the list and pushes it to the newly created array and @Object.assign assigns the key to its object.
        */
        this.bookingsList.push(Object.assign(element.val(), { key: element.key }));
        console.log(this.bookingsList);
      });
    });

    /*
    @onAuthStateChanged: checks whether the user is logged in or not and provides the user details in an object form called 'user'.
    */
    onAuthStateChanged(this.auth, user => {
      if (user) {
        /*
        @userObject: It references the path to where the current logged in user details or object is located on the Realtime Database.
        */
        const userObject = ref(this.database, 'users/' + user.uid);
        /*
        @userObject: It references the path to where the current logged in user details or object is located on the Realtime Database.
        */
        onValue(userObject, (snapshot) => {
          this.data = snapshot.val();
          console.log('User Data: ', this.data);
        });

        /*
        @addDoc: It's responsible for posting data on Firestore.
        */
        try {
          const docRef = addDoc(collection(this.dbFirestore, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
          });
          console.log("Document written with ID: ", docRef);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

      } else {
        console.log('No user is logged in...');
      }
    });

    // createUserWithEmailAndPassword(this.auth, 'selepe.lk@gmail.com', '123456').then((userCredential) => {
    //     // Signed in and navigate to your landing page
    //     const user = userCredential.user;
    //     console.log(user);

    //     // ...
    //   }).catch((error) => {
    //     // remain on this page

    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorMessage);
    //     // remain on this page
    //     // ..
    //   });

  }


  /*
  @delete: Responsible for deleting data on the Realtime Database.
  */
  delete(key: string) {
    console.log(key);
    const deleteBookingRef = ref(this.database, 'bookings/' + key);
    remove(deleteBookingRef).then(() => {
      console.log('Dleted  Successfully!!!!!!');
    });
  }

    
  /*
  @submit: Stores user information to the Realtime Database under their 'UID'.
  */

  submit() {
    onAuthStateChanged(this.auth, user => {
      if (user) {
        set(ref(this.database, 'users/' + user.uid), {
          username: this.title,
          email: user.email,
          profile_picture: user.photoURL,
          phone_number: '0783849933',
          bio: 'I\m hard working...',
        }).then(() => {
          console.log('Successful');
        }).catch(er => {
          console.log(er.message);
        });

      } else {
        console.log('No user is logged in...');

      }
    })
  }
}
