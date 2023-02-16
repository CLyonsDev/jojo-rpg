/*
    Big thanks to Gerdofal of foundryvtt-cyberpunkred, and the kind people on
    the FoundryVTT Discord for assistance in making this work.
    
    Also a massive thank you to Esby for creating this fantastic role-playing system.

    I sincerely hope that everyone has fun creating their own stories in Hirohiko Araki's
    wonderful world.

    Stand Proud 🖤
       - Collin
*/

// Import Modules
import {
    _getInitiativeFormula
} from "./newInitiative.js";
import {
    _jojoLog
} from "./utils.js";
/*import {
    _resetCombatantInitiative
} from "./combat.js"
import {
    _nextRound
} from "./resetInitiative.js";*/

Hooks.once('init', async function() {
    _jojoLog('Initializing JoJo\'s Bizarre Adventure.');

    _jojoLog('Registering Initiative Settings...');

    //CONFIG.debug.hooks = true;
    Combat.prototype._getInitiativeFormula = _getInitiativeFormula;

    /*_jojoLog('Registering Round Settings...');
    Combat.prototype.nextRound = _nextRound;

    game.settings.register("jojoRpg", "onRoundEnd", {
        name: "SETTINGS.RoundEnd",
        hint: "SETTINGS.RoundEndHint",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
    });*/
})