import Utility from "./Utility.mjs";

export default class TemporaryRunes {
  static bindHooks() {
    Hooks.on("updateActiveEffect", this._onEffectUpdate.bind(this));
  }

  static _onEffectUpdate(effect, update, _data) {
    let effectName = effect.name.toLowerCase();

    const runeOf = game.i18n.localize('Forien.Armoury.Runes.effectNameIncludes.RuneOf');
    const temporary = game.i18n.localize('Forien.Armoury.Runes.effectNameIncludes.Temporary');

    if (effectName.includes(runeOf) && effectName.includes(temporary) && effect.parent instanceof Actor) {

      if (update.disabled === true) {
        this.processRemovingRune(effect).then(msg => {
          Utility.notify(msg, {permanent: true})
        });
      }
    }
  }

  static async processRemovingRune(effect) {
    let actor = effect.parent;
    let itemUuid = effect.origin;
    /**
     * @type {ActorWfrp4e|null}
     */
    await actor.deleteEmbeddedDocuments("ActiveEffect", [effect._id]);
    /**
     * @type {ItemWfrp4e|null}
     */
    let item = await fromUuid(itemUuid);
    let itemEffect = item.effects.find(e => e.name === effect.name);

    await item.deleteEmbeddedDocuments("ActiveEffect", [itemEffect._id]);

    let itemDamaged = await this.damageFromRune(item, actor);
    let msg = game.i18n.format('Forien.Armoury.Runes.RemovedEffectTemporaryRuneDisabled', {effectName: effect.name, actorName:actor.name, itemName: item.name});

    return `${msg} ${itemDamaged}`;
  }

  /**
   * @param {ItemWfrp4e} item
   * @param {ActorWfrp4e} actor
   * @returns {Promise<string|`Armour received 1 Damage on ${string}.`|string>}
   */
  static async damageFromRune(item, actor) {
    switch (item.type) {
      case 'weapon':
        return await this.damageWeapon(item, actor);
      case 'armour':
        return await this.damageArmour(item, actor);
      default:
        return await this.damageTrapping(item, actor);
    }
  }

  /**
   * @param {ItemWfrp4e} item
   * @param {ActorWfrp4e} actor
   * @returns {Promise<string>}
   */
  static async damageWeapon(item, actor) {
    let itemDamaged = ``;

    let itemData = item.toObject();
    let regex = /\d{1,3}/gm;
    let maxDamage = Number(regex.exec(item.damage.value)[0] || 0) + Number(item.properties.qualities.durable?.value || 0) || 999;
    itemData.system.damageToItem.value = Math.min(maxDamage, itemData.system.damageToItem.value + 1);

    itemDamaged += game.i18n.localize('Forien.Armoury.Runes.Weapon');
    itemDamaged += ` ${game.i18n.localize('Forien.Armoury.Runes.Received1Damage')}`;

    if (maxDamage === itemData.system.damageToItem.value) {
      itemData.system.equipped = false;
      itemData.name += ` (${game.i18n.localize('Forien.Armoury.Runes.ItemDamagedInName')})`;
      itemDamaged += ` ${game.i18n.localize('Forien.Armoury.Runes.AndGotUnequipped')}`
      itemDamaged += ` (${game.i18n.localize('Forien.Armoury.Runes.ItsNowImprovisedWeapon')})`
    }

    itemDamaged += `.`;
    await actor.updateEmbeddedDocuments("Item", [itemData]);

    return itemDamaged;
  }

  /**
   * @param {ItemWfrp4e} item
   * @param {ActorWfrp4e} actor
   * @returns {Promise<`Armour received 1 Damage on ${string}.`|string>}
   */
  static async damageArmour(item, actor) {
    let itemDamaged = ``;

    let durable = item.properties.qualities.durable;
    let armourToDamage = item.toObject();

    let locationKeys = Object.keys(armourToDamage.system.AP);
    let locations = [];

    for (let key in locationKeys) {
      let location = locationKeys[key];
      let AP = armourToDamage.system.AP[location];
      let damage = armourToDamage.system.APdamage[location];

      if (AP > 0 && AP > damage) {
        locations.push(locationKeys[key]);
      }
    }

    if (locations.length === 0) {
      return `${game.i18n.localize('Forien.Armoury.Runes.ArmourCouldNotBeDamagedMore')}.`;
    }

    let location = locations[Math.floor((Math.random() * locations.length))];
    armourToDamage.system.APdamage[location] = Math.min(armourToDamage.system.AP[location] + (Number(durable?.value) || 0), armourToDamage.system.APdamage[location] + 1);

    let locationName = game.i18n.localize(`WFRP4E.Locations.${location}`);
    itemDamaged = `${game.i18n.format('Forien.Armoury.Runes.ArmourReceived1DamageOnLocation', {locationName: locationName})}.`;

    await actor.updateEmbeddedDocuments("Item", [armourToDamage]);

    return itemDamaged;
  }


  /**
   *
   * @param {ItemWfrp4e} item
   * @param {ActorWfrp4e} actor
   * @returns {Promise<string>}
   */
  static async damageTrapping(item, actor) {
    let itemDamaged = ``;

    let itemData = item.toObject();
    let maxDamage = Number(item.properties.qualities.durable?.value || 0);

    if (itemData.system.damageToItem === undefined) {
      itemData.system.damageToItem = {type: 'Number', value: 0, shield: 0};
    }

    if (maxDamage > 0 && maxDamage > itemData.system.damageToItem.value) {
      itemData.system.damageToItem.value = Math.min(maxDamage, itemData.system.damageToItem.value + 1);

      itemDamaged += game.i18n.localize('Forien.Armoury.Runes.Item');
      itemDamaged += ` ${game.i18n.localize('Forien.Armoury.Runes.Received1Damage')}`;
    } else {
      itemDamaged += game.i18n.localize('Forien.Armoury.Runes.ItemGotDamaged');
    }

    if (itemData.system.damageToItem.value >= maxDamage) {
      itemData.name += ` (${game.i18n.localize('Forien.Armoury.Runes.ItemDamagedInName')})`;

      if (itemData.system.worn) {
        itemData.system.worn = false;
        itemDamaged += ` ${game.i18n.localize('Forien.Armoury.Runes.AndGotUnequipped')}`;
      }
    }

    itemDamaged += `.`;
    await actor.updateEmbeddedDocuments("Item", [itemData]);

    return itemDamaged;
  }
}