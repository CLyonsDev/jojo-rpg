// Resets every combatant's initiative boolean to 'true' when we advance to a new turn.

var currentRound = -1;

Hooks.on("updateCombat", async function(combat) {

    //console.log(combat.current.round);
    //console.log(currentRound);

    if(combat.current.round == currentRound)
    {
        return;
    }else{
        currentRound = combat.current.round;
    }

    //console.log(combat.current.round);

    //console.log("NEW ROUND");
    if(game.user.isGM && combat.data.round != 0 && combat.turns && combat.data.active)
    {
        //console.log(combat.data.round);

        var combatants = combat.combatants;
    
    
        for (let i = 0; i < combatants.length; i++) {
            let combatant = combatants[i];
            //console.log(combatant);
            let token = canvas.tokens.get(combatant.tokenId);
            //console.log(token);
            let actor=token.actor;
    
            //console.log(actor.data.data.canAct);
            await actor.update({'data.canAct': true});
            game.combat.setInitiative(combatant._id, 1);
            //console.log(actor.data.data.canAct);
        }

        announceNewRound();

        /*var allInitiativesUsed = true;
        combat.combatants.forEach(c => {
            if(c.actor.data.data.canAct)
            {
                allInitiativesUsed = false;
            }
        });
        if(allInitiativesUsed)
        {
        announceAllInitiativeUsed();
        }*/
    }
});

function announceNewRound()
{
    if(game.combat.data.round > 0)
    {
        ChatMessage.create({
            content: "<h1>NEW ROUND</h1>\nInitiative has been refunded.",
            type: CHAT_MESSAGE_TYPES.OOC,
            flavor: "Round " + game.combat.data.round
        });
    }
}

function announceAllInitiativeUsed()
{
    if(game.combat.data.round > 0)
    {
        ChatMessage.create({
            content: "<h1>ALL COMBATANTS HAVE USED THEIR INITIATIVE.</h1>",
            type: CHAT_MESSAGE_TYPES.OOC,
            flavor: "Round " + game.combat.data.round
        });
    }
}


//actor.update({data: actorData});
        //actor.data.data.canAct = true;
        //await actor.update({'data.data.canAct': true});

    /*await combatants.forEach(async (c) => {
        console.log(c.actor.data.data.canAct);
        c.actor.data.data.canAct = true;
        console.log(c.actor.data.data.canAct);
    });

    console.log("Updating combat...");
    await combat.update({combatants : combat.combatants});
    console.log("Done.");
    console.log("Updating combatant...");

    /*if(combat.data.round != 0 && combat.turns && combat.data.active)
    {
        console.log("Next Round.");
        console.log(combat);

        for (let i = 0; i < combat.data.combatants.length; i++) {
            var currentCombatant = combat.data.combatants[i];
            
            if(currentCombatant)
            {
                console.log(currentCombatant);
                console.log("Can act? " + currentCombatant.actor.data.data.canAct);
                //await currentCombatant.actor.update({'data.canAct': true});
                console.log("Can act? " + currentCombatant.actor.data.data.canAct);
                currentCombatant.actor.prepareData();
            }
        }

        /*combat.combatants.forEach(combatant => {
            //var actor = combatant.actor;
            var actorData = combatant.actor.data.data;
            //combatant.actor.data.data.initiative.hasacted = true;\
            //console.log(actorData);
            //actor.update({"actorData.canAct": true});
            console.log(actorData);
            //console.log("Previous state: " + combatant.actor.data.data.initiative.canAct);
            //combatant.actor.update({'data.initiative.canAct': true});
            //console.log("New state: " + combatant.actor.data.data.initiative.canAct);
            //console.log(combatant.actor);
        });
    }*/