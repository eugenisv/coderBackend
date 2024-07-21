import { Router } from "express";

export default class Router{
    constructor(){
        this.router = Router();
        this.init();
    }

    getRouter(){
        return this.router;
    }
    init(){}

    get(path, ...callbacks){
        this.router.get(path, this.applyCallbacks(callbacks));
    }
    
}
