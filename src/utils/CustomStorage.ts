export const CustomStorageConst = {
    PRODUCTOS: "PRODUCTOS",
    USUARIO: "USUARIO"
  };
  
  export class CustomStorage {
    /**
     * Permite obtener un dato del localStorage
     * @param key
     */
    public static get(key: string): any {
      let res;
      let temp = localStorage.getItem(key);
      try {
        res = JSON.parse(temp);
      } catch (err) {
        res = temp;
      }
      return res;
    }
    /**
     * Permite guardar un dato en el localStorage
     * @param key
     * @param data
     */
    public static set(key: string, data: any): void {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (err) {
        localStorage.setItem(key, data);
      }
    }
  
    /**
     * Permite guardar varios datos en el localStorage
     * @param data
     */
    public static setAny(data: { key: string; object: any }[]): void {
      for (let object of data) {
        localStorage.setItem(object.key, JSON.stringify(object.object));
      }
    }
  
    public static remove(data: string[]) {
      for (let key of data) {
        localStorage.removeItem(key);
      }
    }
  }
  