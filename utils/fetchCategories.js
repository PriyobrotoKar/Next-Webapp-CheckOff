import { db } from "@/firebase/firebase";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";

export const fetchCategories = async (data) => {
  try {
    const result = [];
    const q = query(
      collection(db, "categories"),
      where("owner", "==", data.id),
      where("catName", "==", `${data.category}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllCategories = async (uid) => {
  try {
    const result = [];
    const q = query(
      collection(db, "categories"),
      where("owner", "==", uid),
      orderBy("timestamp", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      result.push({ ...doc.data(), id: doc.id });
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
