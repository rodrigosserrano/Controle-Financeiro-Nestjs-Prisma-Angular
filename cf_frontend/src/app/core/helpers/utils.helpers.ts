export class UtilsHelpers {
  static IsEmpty(obj: object) {
    for(let prop in obj){
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }
}
