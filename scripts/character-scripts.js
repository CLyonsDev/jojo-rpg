async function alterMomentum(actId, modifier) {
    const act = game.actors.get(actId);

    var newMomentum = act.system['user-attributes']['momentum']['value'] + modifier;
    await act.update({ "system.user-attributes.momentum.value": newMomentum });
}

async function resetMomentum(actId, modifier) {
    const act = game.actors.get(actId);

    await act.update({ "system.user-attributes.momentum.value": 0 });
}