import k from "../kaplayCtx";

export function makeSonic(pos){
    const sonic = k.add([
        k.sprite("sonic", { anim: "run" }),
        k.scale(6),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
    ]);
}
