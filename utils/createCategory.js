import { db } from "@/firebase/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import fetchCategories from "./fetchCategories";

const createCategory = async (data) => {
  try {
    console.log(data);
    const category = await fetchCategories(data);
    if (category.length === 0) {
      const docRef = await addDoc(collection(db, "categories"), {
        catName: data.category,
        owner: data.id,
        timestamp: new Date().getTime(),
      });
      console.log("created category with id:" + docRef.id);
    } else {
      throw "category exists";
    }
  } catch (error) {
    console.error(error);
  }
};
export default createCategory;
