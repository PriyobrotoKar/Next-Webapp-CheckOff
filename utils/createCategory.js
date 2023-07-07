import { db } from "@/firebase/firebase";
import { doc, addDoc, collection } from "firebase/firestore";
import { fetchCategories } from "./fetchCategories";

const createCategory = async (data, setCatLoading, setError) => {
  try {
    console.log(data);
    setCatLoading(true);
    const category = await fetchCategories(data);
    if (category.length === 0) {
      const docRef = await addDoc(collection(db, "categories"), {
        catName: data.category,
        owner: data.id,
        timestamp: new Date().getTime(),
      });
      console.log("created category with id:" + docRef.id);
      setCatLoading(false);
    } else {
      setCatLoading(false);
      throw "category exists";
    }
  } catch (error) {
    setError(error);
    setCatLoading(false);
  }
};
export default createCategory;
