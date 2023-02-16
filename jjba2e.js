import JJBA2eCharacterSheet from "./module/sheets/JJBA2eCharacterSheet.js";

Hooks.once("init", function(){
    console.log("Initializing JJBA:TTRPG2e...");

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("jjba2e", JJBA2eCharacterSheet, {makeDefault: true});
});