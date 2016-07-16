import {LocalStorage} from "node-localstorage";

(<any>global).localStorage = new LocalStorage('./build/localStorage');
(<any>global).sessionStorage = new LocalStorage('./build/sessionStorage');
