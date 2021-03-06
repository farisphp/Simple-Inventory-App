import { firestore } from "../firebase";

const db = firestore.collection("/product");

class ProductDataService {
    getAll() {
      return db;
    }
  
    create(product) {
      return db.add(product);
    }
  
    update(id, value) {
      return db.doc(id).update(value);
    }
  
    delete(id) {
      return db.doc(id).delete();
    }
}
  
export default new ProductDataService();