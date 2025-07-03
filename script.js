import { GameController } from './GameController.js';
import { View } from './view.js';


const N = 4, M = 4;
const controller = new GameController(N, M);
const view = new View(controller, N, M);