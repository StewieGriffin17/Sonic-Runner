import { makeMotobug } from "../entities/motobug";
import { makeSonic } from "../entities/sonic";
import k from "../kaplayCtx";

export default function game(){
    k.setGravity(3100);

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

    const sonic = makeSonic(k.vec2(200, 650));
    sonic.setControls();
    sonic.setEvents();
    sonic.onCollide("enemy", (enemy) => {
        if(!sonic.isGrounded()){
        k.play("destroy", {volume: 0.4});
        k.play("hyperRing", {volume: 0.4});
        k.destroy(enemy);
        sonic.play("jump");
        sonic.jump();
        // Add more logic later
        return;
        }

        k.play("hurt", {volume: 0.4});
        // Add more logic later
        k.go("gameOver")
    });

    let gameSpeed = 300;
    k.loop(1, () => {
        gameSpeed += 50;
    });

    const spawnMotobug = () =>{
        const motobug = makeMotobug(k.vec2(1950, 670));
        motobug.onUpdate(() => {
            if(gameSpeed < 3000){
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            motobug.move(-gameSpeed, 0);
        });

        motobug.onExitScreen(() =>{
            if(motobug.pos.x < 0) k.destroy(motobug);
        });

        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotobug);
    };
    spawnMotobug();

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 770),
        k.body({isStatic: true}),
    ]);

    k.onUpdate(() => {
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
        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformsWidth * 4, 450);
    });
}