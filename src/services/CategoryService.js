import { firestore } from "../firebase";

const db = firestore.collection("/categories");

class CategoryDataService {
    getAll() {
      return db;
    }

    getById(id){
      return db.doc(id).get();
    }
  
    create(category) {
      return db.add(category);
    }
  
    update(id, value) {
      return db.doc(id).update(value);
    }
  
    delete(id) {
      return db.doc(id).delete();
    }
}
  
export default new CategoryDataService();