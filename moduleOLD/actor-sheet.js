/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */

 import{
  _announceInitiativeUse
 }from "./combat.js"
import { _jojoLog } from "./utils.js";
 

export class SimpleActorSheet extends ActorSheet {

  /** @override */
	static get defaultOptions() {
	  return mergeObject(super.defaultOptions, {
  	  classes: ["worldbuilding", "sheet", "actor"],
  	  template: "systems/jojo-rpg/templates/actor-stand-user-sheet.html",
      width: 850,
      height: 660,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
      dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const data = super.getData();
    data.dtypes = ["String", "Number", "Boolean"];

    return data;
  }

  _returnRollFormula(requestedRank)
  {
    switch(requestedRank.toLowerCase()) {
      case "a":
        return new Roll("3d20kh", this.actor.data.data);
      case "b":
        return new Roll("2d20kh", this.actor.data.data);
      case "c":
        return new Roll("1d20", this.actor.data.data);
      case "d":
        return new Roll("2d20kl", this.actor.data.data);
      case "e":
        return new Roll("3d20kl", this.actor.data.data);
      default:
        return new Roll("1d4", this.actor.data.data);
    }
  }

  _presetRoll(event){
    event.preventDefault();

    const element = event.currentTarget;
    const btnRank = element.value;

    let roll;

    console.log(btnRank);

    roll = this._returnRollFormula(btnRank);

    let rollOutcome = roll.roll();
      let fResult = Number(rollOutcome.result);
      let adjustedRoll = "";
      let styleOverride = "";
      let html = "";
      let label = "Making a character " + btnRank.toUpperCase() + "-Rank roll.";

      console.log(fResult);
      switch(true)
      {
        case (fResult <= 0):
          adjustedRoll = "CRITICAL FAILURE";
          styleOverride="background-color: #434343; color:#ffffff";
        break;

        case(fResult <=5):
          adjustedRoll = "DEFINITE FAILURE";
          styleOverride="background-color: #674ea7; color:#ffffff";
        break;

        case(fResult <=10):
          adjustedRoll = "MODERATE FAILURE";
          styleOverride="background-color: #3d85c6; color:#ffffff";
        break;

        case(fResult <=15):
          adjustedRoll = "MODERATE SUCCESS";
          styleOverride="background-color: #ffd966";
        break;

        case(fResult <= 20):
          adjustedRoll = "DEFINITE SUCCESS";
          styleOverride="background-color: #ff9900";
        break;

        case (fResult >= 21):
          adjustedRoll = "CRITICAL SUCCESS";
          styleOverride="background-color: #e06666";
        break;
      }

    html = `<div class="dice-roll">`
    html += `     <div class="dice-result">`
    html += `     <div style="${styleOverride}" class="dice-formula">${adjustedRoll}</div>`
    html += `     <div class="dice-tooltip">`
    html += `          <section class="tooltip-part">`
    html += `               <div class="dice">`
    html += `                    <p class="part-formula">`
    html += `                         ${rollOutcome.formula}`
    html += `                         <span class="part-total">${fResult.toString()}</span>`
    html += `                    </p>`
    html += `                    <ol class="dice-rolls">`
    html += `                         <li class="roll die ${rollOutcome.formula}">${rollOutcome.total}</li>`
    html += `                    </ol>`
    html += `               </div>`
    html += `          </section>`
    html += `     </div>`
    html += `     <h4 class="dice-total">${fResult}</h4>`
    html += `</div>`

      let chatData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      content: html,
      flavor: label
      };

      AudioHelper.play({src: "sounds/dice.wav", volume: 0.8, autoplay: true, loop: false}, true);

      ChatMessage.create(chatData, {});
  }

  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    if(dataset.roll){
      let roll;

      console.log(dataset.ranking);
      
      roll = this._returnRollFormula(dataset.ranking);

      let modifier = document.getElementById(this.actor._id+'-modifier-box').value;
      let momentum = dataset.momentum;

      let rollOutcome = roll.roll();
      let fResult = Number(rollOutcome.result) + Number(modifier) + Number(momentum);
      let adjustedRoll = "";
      let styleOverride = "";
      let html = "";
      let label = dataset.label ? `Rolling Stand ${dataset.label} (RANK ${dataset.ranking}).` : '';

      console.log(fResult);
      switch(true)
      {
        case (fResult <= 0):
          adjustedRoll = "CRITICAL FAILURE";
          styleOverride="background-color: #434343; color:#ffffff";
        break;

        case(fResult <=5):
          adjustedRoll = "DEFINITE FAILURE";
          styleOverride="background-color: #674ea7; color:#ffffff";
        break;

        case(fResult <=10):
          adjustedRoll = "MODERATE FAILURE";
          styleOverride="background-color: #3d85c6; color:#ffffff";
        break;

        case(fResult <=15):
          adjustedRoll = "MODERATE SUCCESS";
          styleOverride="background-color: #ffd966";
        break;

        case(fResult <= 20):
          adjustedRoll = "DEFINITE SUCCESS";
          styleOverride="background-color: #ff9900";
        break;

        case (fResult >= 21):
          adjustedRoll = "CRITICAL SUCCESS";
          styleOverride="background-color: #e06666";
        break;
      }

    html = `<div class="dice-roll">`
    html += `     <div class="dice-result">`
    html += `     <div style="${styleOverride}" class="dice-formula">${adjustedRoll}</div>`
    html += `     <div class="dice-tooltip">`
    html += `          <section class="tooltip-part">`
    html += `               <div class="dice">`
    html += `                    <p class="part-formula">`
    html += `                         ${rollOutcome.formula} + (momentum) + (other)`
    html += `                         <span class="part-total">${fResult.toString()}</span>`
    html += `                    </p>`
    html += `                    <ol class="dice-rolls">`
    html += `                         <li class="roll die ${rollOutcome.formula}">${rollOutcome.total}+${momentum}+${modifier}</li>`
    html += `                    </ol>`
    html += `               </div>`
    html += `          </section>`
    html += `     </div>`
    html += `     <h4 class="dice-total">${fResult}</h4>`
    html += `</div>`

      let chatData = {
      speaker: ChatMessage.getSpeaker({actor: this.actor}),
      content: html,
      flavor: label
      };

      AudioHelper.play({src: "sounds/dice.wav", volume: 0.8, autoplay: true, loop: false}, true);

      ChatMessage.create(chatData, {});

      /*rollOutcome.toMessage({
        speaker: ChatMessage.getSpeaker({actor: this.actor}),
        flavor: label
      });

      let resultChatData = {
        content: adjustedRoll
      };

      ChatMessage.create(resultChatData);*/
    }
  }

  _setStandImage(event)
  {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    let url = dataset.standImageURL;
    console.log(standImageURL);
  }

  /* -------------------------------------------- */

  /** @override */
	activateListeners(html) {
    super.activateListeners(html);

    // Everything below here is only needed if the sheet is editable
    if (!this.options.editable) return;

    // Update Inventory Item
    html.find('.item-edit').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      const item = this.actor.getOwnedItem(li.data("itemId"));
      item.sheet.render(true);
    });

    // Delete Inventory Item
    html.find('.item-delete').click(ev => {
      const li = $(ev.currentTarget).parents(".item");
      this.actor.deleteOwnedItem(li.data("itemId"));
      li.slideUp(200, () => this.render(false));
    });

    html.find('.'+this.actor._id+'-modifier-button-inc').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-modifier-box').value, 10);
      value = isNaN(value)? 0 : value;
      value++;
      document.getElementById(this.actor._id+'-modifier-box').value = value;
    });

    html.find('.'+this.actor._id+'-modifier-button-dec').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-modifier-box').value, 10);
      value = isNaN(value)? 0 : value;
      value--;
      document.getElementById(this.actor._id+'-modifier-box').value = value;
    });

    html.find('.'+this.actor._id+'-modifier-button-rst').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-modifier-box').value, 10);
      value = isNaN(value)? 0 : value;
      value = 0;
      document.getElementById(this.actor._id+'-modifier-box').value = value;
    });

    html.find('.'+this.actor._id+'-mominc').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-increment-box').value, 10);
      value = isNaN(value)? 0 : value;
      value++;
      if(value > 3)
        value = 3;
      document.getElementById(this.actor._id+'-increment-box').value = value;
    });

    html.find('.'+this.actor._id+'-momdec').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-increment-box').value, 10);
      value = isNaN(value)? 0 : value;
      value--;
      if(value < -3)
        value = -3;
      document.getElementById(this.actor._id+'-increment-box').value = value;
    });

    html.find('.'+this.actor._id+'-LightWounds-Inc').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-currentlightwounds').value, 10);
      value = isNaN(value)? 0 : value;
      value++;
      document.getElementById(this.actor._id+'-currentlightwounds').value = value;
    });

    html.find('.'+this.actor._id+'-LightWounds-Dec').click(ev => {
      var value = parseInt(document.getElementById(this.actor._id+'-currentlightwounds').value, 10);
      value = isNaN(value)? 0 : value;
      value--;
      if(value < 0)
        value = 0;
      document.getElementById(this.actor._id+'-currentlightwounds').value = value;
    });

    html.find('.'+this.actor.data._id+'-grab-url').click(ev => {
      var url = this.actor.data.data.standImageURL;
      console.log(url);
      //console.log(document.getElementById('stand-img-view'));
      //console.log(this.actor);

      if(url)
        html.find('.'+this.actor.data._id+'-standImgView').src = url;
      else
        html.find('.'+this.actor.data._id+'-standImgView').src = "/systems/jojo-rpg/images/Stand_Img_Placeholder.png"; 
      /*if(url)
        document.getElementById('stand-img-view').src = url;
      else
        document.getElementById('stand-img-view').src = "/systems/jojo-rpg/images/Stand_Img_Placeholder.png";
      */
      //this.actor.update();
    });

    html.find('.initiative-button').click(ev => {

      if(game.combat === null)
      {
        _jojoLog("No combat exists!");
        ChatMessage.create({
        content: "No combat has been started yet!",
        type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
        whisper: [game.user.id]
      });
      
      return;
      }

      var id = this.actor._id;
      var combatants = game.combat.combatants;
      var linkedCombatant;
      var actorCanAct;

      _jojoLog(id);
      console.log(combatants);

      for(let i = 0; i < combatants.length; i++)
      {
        var combatantData = combatants[i].actor.data;
        if(combatantData._id == id)
        {
          _jojoLog("Found ID match!");
          linkedCombatant = combatants[i];
        }
      }

      
      actorCanAct = this.actor.data.data.canAct;


      if(linkedCombatant)
      {
        game.combat.setInitiative(linkedCombatant._id, 0);

        if(actorCanAct == true)
        {
          this.actor.update({'data.canAct': false});
          //linkedCombatant.actor.update({'data.canAct': false});
          _announceInitiativeUse(this.actor.data);
        }else{
          _jojoLog("This actor cannot act yet!");
          ChatMessage.create({
          content: "You've already used your initiative for this round!",
          type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
          whisper: [game.user.id]
        });
      }
      }else{
        _jojoLog("This actor is not a part of any combat!");
        ChatMessage.create({
        content: "You must be part of a combat to use your initiative!",
        type: CONST.CHAT_MESSAGE_TYPES.WHISPER,
        whisper: [game.user.id]
      });
      }


      //console.log(this.actor.data.data);
      //console.log(game.combat.combatants);

      //_jojoLog(canAct);
    });

    html.find('.initiative-checkbox').click(ev => {
      var canAct = this.actor.data.data.canAct;
      var combatants = game.combat.combatants;
      //console.log(canAct);
      //console.log(this.actor);
      //console.log(combatants);
      
      var playerCombatantId;

      if(game.combat != null && combatants != undefined)
      {
        var combatants = game.combat.combatants;
        console.log(combatants);

        for(var i = 0; i < combatants.length; i++){
          if(combatants[i] == undefined)
            return;

          if(combatants[i].actor.data._id == this.actor.data._id && combatants[i].token != undefined)
          {
            playerCombatantId = combatants[i]._id;
            //console.log("MATCH!");
          }
        }

        if(canAct && playerCombatantId !== 'undefined')
        {
          //console.log("has acted");
          game.combat.setInitiative(playerCombatantId, 0);
          _announceInitiativeUse(this.actor.data);
        }else if(playerCombatantId !== 'undefined'){
          //console.log("has not acted");
          game.combat.setInitiative(playerCombatantId, 1);
        }
      }
    });

    /*html.find('.preset-roll-btn').click(env=>{
      var rankValue = $(this).value;
      console.log("clicked " + rankValue.toString());
    });*/

    html.find('.preset-roll-btn').click(this._presetRoll.bind(this));

    html.find('.rollable').click(this._onRoll.bind(this));


    if(this.actor.data.data.standImageURL)
    {
      if(document.getElementById(this.actor.data._id+'-stand-img-view'))
      {
        document.getElementById(this.actor.data._id+'-stand-img-view').src = this.actor.data.data.standImageURL;
        //this.actor.update();
      }
    }
  }
}
