export const _checkInitiativeProgress = function() {

};

export const _announceInitiativeUse = function(combatant) {
    console.log(combatant);
    
    ChatMessage.create({
        content: "<h2>" + combatant.name + " has used their Initiative.</h2>",
        type: CHAT_MESSAGE_TYPES.OOC,
        flavor: "Round " + game.combat.data.round
    });
};

export const _resetCombatantInitiative = function(combat) {
    for (let i = 0; i < combat.combatants.length; i++) {
        const currentCombatant = combat.combatants[i];
        currentCombatant.data.canAct = true;
    }
}