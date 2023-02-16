/*
    A huge thanks to the developers of foundryvtt-cyberpunkred
    who pointed me in the right direction for this script.
*/

import {
    _jojoLog
} from "./utils.js";

export const _getInitiativeFormula = function(incomingObject) {
    if(game.combat != null)
    {

    var intData = null;
    var intId = null;
    var initiativeIsAvailable = false;

    // Determine what was just passed to initiative.
    if(typeof incomingObject.actor !== 'undefined' && incomingObject.actor !== null)
    {
        // incomingObject is a combatant.
        intData = incomingObject.actor.data.data;
        intId = incomingObject._id;
        //console.log(incomingObject);
    } else {
        _jojoLog("ERROR. Non-actor passed to initiative.");
        return "-1";
    }


        //console.log(intData);
        _jojoLog("Setting Initiative Value.");
        initiativeIsAvailable = intData.canAct;
    
        var newInit;
        
        if(initiativeIsAvailable == true) {
            _jojoLog("Initiative Available!");
            return "1";
        }else if(initiativeIsAvailable == false)
        {
            _jojoLog("Initiative Not Available!");
            return "0";
        }
        return "-1";
    }
}