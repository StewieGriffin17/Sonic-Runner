import k from "./kaplayCtx"
import game from "./scenes/game";
import gameOver from "./scenes/gameover";
import mainManu from "./scenes/mainManu";

// Loading graphics assets
k.loadSprite("bg-alt", "graphics/bg-alt.png");
k.loadSprite("platforms-alt", "graphics/platforms-alt.png");
k.loadSprite("sonic", "graphics/sonic.png", {
    sliceX: 8,
    sliceY: 2,
    anims: {
        run : {from: 0, to: 7, loop: true, speed: 30},
        jump : {from: 8, to: 15, loop: true, speed: 100},
    },
});
k.loadSprite("ring", "graphics/ring.png", {
    sliceX: 16,
    sliceY: 1,
    anims: {
        spin: {from: 0, to: 15, loop: true, speed: 30},
    },
});
k.loadSprite("motobug", "graphics/motobug.png", {
    sliceX: 5,
    sliceY: 1,
    anims: {
        run : {from: 0, to: 4, loop: true, speed: 8},
    },
});

//  Loading font 
k.loadFont("mania", "fonts/mania.ttf");

// Loading sounds
k.loadSound("city", "sounds/city.mp3");
k.loadSound("destroy", "sounds/destroy.wav");
k.loadSound("hurt", "sounds/hurt.wav");
k.loadSound("hyperRing", "sounds/hyperRing.wav");
k.loadSound("jump", "sounds/jump.wav");
k.loadSound("ring", "sounds/ring.wav");

k.scene("mainManu", mainManu);

k.scene("game", game);

k.scene("gameOver", gameOver);

k.go("mainManu");