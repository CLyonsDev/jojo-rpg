export default class JJBA2eCharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/jojo-rpg/templates/standuser-sheet.hbs",
            classes: ["jjba2e", "sheet", "namedCharacter", "character-scripts"]
        });
    }

    get template() {
        return "systems/jojo-rpg/templates/standuser-sheet.hbs";
    }

    activateListeners(html) {
        super.activateListeners(html);

        // Bind a click event to a button with the class "my-button"
        html.find('.inc-momentum').click((event) => {
            // Handle the click event
            alterMomentum(this.actor._id, 1);
        });

        html.find('.dec-momentum').click((event) => {
            // Handle the click event
            alterMomentum(this.actor._id, -1);
        });

        html.find('.res-momentum').click((event) => {
            // Handle the click event
            resetMomentum(this.actor._id);
        });
    }
}