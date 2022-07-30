import {validate} from "class-validator";

export class UtilsHelper {

    static IsEmpty(obj: object) {
        for(let prop in obj){
            if(obj.hasOwnProperty(prop)) {
                return false;
            }
        }

        return JSON.stringify(obj) === JSON.stringify({});
    }

    static FormatStringData(data: string | any) {
        let day  = data.split("/")[0];
        let month  = data.split("/")[1];
        let year  = data.split("/")[2];

        let date = year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);

        return new Date(date);
    }

    static treatmentResult(result: object, text: string = null, throwErr: boolean = false) {
        if (!result) {
            if (throwErr) {
                throw Error(text)
            } else {
                return JSON.stringify({ result: text })
            }
        } else {
            return { result: result }
        }
    }
}