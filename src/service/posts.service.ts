//  import { db } from "../../firebase";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import type { Post } from "../../types/Post";
import  type { User } from "types/User";
import { db } from "../../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {v4 as uuidv4} from 'uuid'
// import { uploadBytes } from 'firebase/storage';

export class PostsService {
  async addPosts(post: Post, uid: string, image: File) {
    const auth = getAuth();
    const mainId = uuidv4()
    const storage = getStorage();
    const storageRef = ref(storage,`allPosts/${uuidv4()}.${image.name.split('.').pop()}`);
   
    const docRef = await setDoc(
      doc(db, "users", uid, "personalPosts", mainId),
      post
    );
    const docRef2 = await setDoc(doc(db, "allPosts", mainId), post);
    if (image) {
      await uploadBytes(storageRef, image).then(async (snapshot) => {
        console.log("uploaded file");
        const downloadURL=await getDownloadURL(storageRef);
        const docRef = doc(db, "allPosts", mainId);
        const docRef2 = doc(db,"users",uid,"personalPosts",mainId)
        await updateDoc(docRef2,{
          image:downloadURL
        })
        await updateDoc(docRef,{
          image:downloadURL
        })
      });
    }
  }
  async getAdmin(uid:string){
    const docRef = doc(db, "admin", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  }
  async updatePost(post: Post, uid: string, id: string) {
    const docRef = doc(db, "allPosts", id);
    const  docRef2 = doc(db,"users",uid,"personalPosts",id)
    await updateDoc(docRef, post);
    await updateDoc(docRef2, post);

  }

  async getPersonalPosts(uid: string): Promise<Post[]> {
    const querySnapshot = await getDocs(
      collection(db, "users", uid, "personalPosts")
    );
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return data;
  }
  async getPosts(): Promise<Post[]> {
    const querySnapshot = await getDocs(collection(db, "allPosts"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    return data;
  }
  async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(collection(db, "users"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    return data;
  }
  async getSinglePost(id:string) {
    const docRef = doc(db, "allPosts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    return docSnap.data();
  }
  async getMySinglePost(uid: string, id: string): Promise<Post[]> {
    const docRef = doc(db, "users", uid, "personalPosts", id);
    const docSnap = await getDoc(docRef);
    if (!(docSnap.exists())) {
     throw new Error("Doc not found")
    } 
    return docSnap.data() as Promise<Post[]>;
  }
  async getUserPost(uid: string, id: string) {
    const docRef = doc(db, "users", id, "personalPosts", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
  async deletePost(id: string, uid: string) {
    await deleteDoc(doc(db, "allPosts", id));
    await deleteDoc(doc(db, "users", uid, "personalPosts", id));
  }
  async deleteUser(id: string, uid: string) {
    // await deleteDoc(doc(db, "allPosts", id));
    await deleteDoc(doc(db, "users", id));
  }
}
