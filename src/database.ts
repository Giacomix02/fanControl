import { Mode } from "./modes";

class DB{

    constructor(){
       if(!("turbo" in localStorage)) localStorage.setItem("turbo", "false")
       if(!("mode" in localStorage)) localStorage.setItem("mode", Mode.Default)
        
    }

    setTurbo(value:boolean){
        localStorage.setItem("turbo",String(value))  //JSON.stringify(value)
    }

    getTurbo(){
        return localStorage.getItem("turbo") === "true"
    }

    setMode(value:Mode){
        localStorage.setItem("mode",value)
    }

    getMode(){
        return localStorage.getItem("mode")
    }

    deleteAll(){
        localStorage.setItem("turbo", "false")
        localStorage.setItem("mode", Mode.Unset)
    }
}

export const db = new DB()

