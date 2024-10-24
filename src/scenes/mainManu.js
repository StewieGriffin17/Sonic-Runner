import k from "../kaplayCtx";
import { makeSonic } from "../entities/sonic";

export default function mainManu(){
    if(!k.getData("bestScore")) k.setData("bestScore", 0);
    k.onButtonPress("jump", () => k.go("game"));
    
    // Setting the background and running platform
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("bg-alt"), 
            k.pos(0, 0), 
            k.scale(2), 
            k.opacity(0.8),
        ]),
        k.add([
            k.sprite("bg-alt"), 
            k.pos(bgPieceWidth * 2, 0), 
            k.scale(2), 
            k.opacity(0.8),
        ]),
    ];
    
    const platformsWidth = 1280;
    const platforms = [
        k.add([
            k.sprite("platforms-alt"),
            k.pos(0, 450),
            k.scale(4),
        ]),
        k.add([
            k.sprite("platforms-alt"),
            k.pos(platformsWidth * 4, 450),
            k.scale(4),
        ]),
    ];

    // Adding text
    k.add([
        k.text("Sonic Endless Runner", {font: "mania", size: 96}),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    k.add([
        k.text("Press Space/Click to Play", {font: "mania", size: 48}),
        k.pos(k.center().x, k.center().y-200),
        k.anchor("center"),
    ]);

    // Calling sonic game object
    makeSonic(k.vec2(200, 650));

    // Making the background and running platform endless
    k.onUpdate(() =>{
        if(bgPieces[1].pos.x < 0){
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }
        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        if(platforms[1].pos.x < 0){
            platforms[0].moveTo(platforms[1].pos.x + platformsWidth * 4, 450);
            platforms.push(platforms.shift());
        }
        platforms[0].move(-3000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformsWidth * 4, 450);
    });
};
 