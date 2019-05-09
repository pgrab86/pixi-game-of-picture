let app;

import { resizeToAppSize } from './utils/containerFunctions.js';
import {Game} from './classes/game.class.js';
import {Scenery} from './classes/scenery.class.js';

function initPixi() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }
    app = new PIXI.Application({
        width: 1000,
        height: 700,
        antialias: true,
        transparent: false,
        resolution: 1
    });
    document.body.appendChild(app.view);

    PIXI.loader
        .add("img/puzzle-image.jpg")
        .add("img/snowflake.png")
        .load(initStage);
}
function initStage() {
    //initGameBoard();
    initGameScenery();
}

function initGameBoard() {
    let puzzleTexture = PIXI.loader.resources["img/puzzle-image.jpg"].texture;    
    let container = new PIXI.Container();

    let myGame = new Game(container, puzzleTexture, 4);
    myGame.initStage();
    printGameContainer(container);
}

function initGameScenery() {    
    let scenery = new Scenery(app);
    scenery.initScenery();
}

function printGameContainer(container) {
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
    container.position.x = app.renderer.width / 2;
    container.position.y = app.renderer.height / 2;

    resizeToAppSize(container, 0.8, app.renderer);    

    app.stage.addChild(container);
}

window.addEventListener('DOMContentLoaded', function() {
    initPixi();
});