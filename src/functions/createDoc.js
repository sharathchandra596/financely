import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebase";
import { toast } from "react-toastify";

export default async function createDoc(user) {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
          email: user.email,
        });
        toast.success("doc created successfully");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("user already exists");
    }
  }
