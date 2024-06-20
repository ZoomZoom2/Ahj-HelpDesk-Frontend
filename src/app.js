import {Controller} from "./controller";
import Api from "./api";

const url = 'http://localhost:7070/api'

const api = new Api(url)

const controller = new Controller(api);
controller.addListeners()

