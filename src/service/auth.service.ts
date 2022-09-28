//  import { db } from "../../firebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  type UserCredential,
  type User as FirebaseUser,
} from "firebase/auth";
import { db } from "../../firebase";
// import db
import type { Cookies } from "./../../types/Cookies";
import type { async } from "@firebase/util";
// import type { Users } from '@/views/Users.vue';
import type { User } from "types/User";
export class AuthService {
  constructor(private $cookies: Cookies) {}
  async createUser(name: string, email: string, password: any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        updateProfile(auth.currentUser as FirebaseUser, {
          displayName: name,
        });
        await setDoc(doc(db, `users`, cred.user.uid), {
          name: name,
          email: email,
          id: cred.user.uid,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async login(email: string, password: string): Promise<FirebaseUser> {
    const auth = getAuth();
    return new Promise((res, rej) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          this.$cookies.set("AUTH", true);
            this.$cookies.set("USER", JSON.stringify(cred.user));
          res(cred.user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async cookieSignOut(){
    const auth = getAuth(); 
  }
  async signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(async (cred) => {
        this.$cookies.set("AUTH", false);
        this.$cookies.remove("USER",cred);
        console.log("cookies signed out");
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async listenForAuthChange() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
      } else {
        console.log("user no dey");
      }
      return auth.currentUser;
    });
  }
  
  getUserFromCookie(): FirebaseUser {
    let loggedIn = this.$cookies.get("AUTH");
    if (!loggedIn) {
      throw new Error("User is not logged in");
    }
    let user = this.$cookies.get("USER");
    if (!user) {
      throw new Error("User is not logged in");
    }
    return user;
  }
}
