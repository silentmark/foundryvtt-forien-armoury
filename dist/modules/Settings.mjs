import {constants, defaults, settings} from "./constants.mjs";
import SettingsApp from "./apps/SettingsApp.mjs";
import Utility from "./utility/Utility.mjs";

/**
 * Registers settings with the Foundry
 */
function registerSettings() {
  game.settings.registerMenu(constants.moduleId, settings.app, {
    name: "Forien.Armoury.Settings.MenuName",
    label: "Forien.Armoury.Settings.MenuLabel",
    hint: "Forien.Armoury.Settings.MenuHint",
    icon: "fa-solid fa-cog",
    type: SettingsApp
  })


  // Add enable/disable setting for temporary runes damaging items
  game.settings.register(constants.moduleId, settings.runes.enableDamage, {
    name: 'Forien.Armoury.Settings.Runes.Enable',
    hint: 'Forien.Armoury.Settings.Runes.EnableHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });

  //
  game.settings.register(constants.moduleId, settings.diseases.autoProgress, {
    name: 'Forien.Armoury.Settings.Diseases.AutoProgress',
    hint: 'Forien.Armoury.Settings.Diseases.AutoProgressHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
    onChange: (value) => {
      if (value && game.time.worldTime === 0) {
        Utility.notify(game.i18n.localize("Forien.Armoury.Settings.Diseases.AutoProgressNoWorldTime"), {type: 'warning', permanent: true});
        game.settings.set(constants.moduleId, settings.magicalEndurance.autoRegen, false);
      } else if (game.time.worldTime !== 0) {
        SettingsConfig.reloadConfirm({world: true})
      }
    }
  });

  // Add enable/disable setting for Casting Fatigue feature
  game.settings.register(constants.moduleId, settings.magicalEndurance.enabled, {
    name: 'Forien.Armoury.Settings.CastingFatigue.Enable',
    hint: 'Forien.Armoury.Settings.CastingFatigue.EnableHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });

  // Define ME cost for channeling
  game.settings.register(constants.moduleId, settings.magicalEndurance.costOfChanneling, {
    name: 'Forien.Armoury.Settings.CastingFatigue.CostOfChanneling',
    hint: 'Forien.Armoury.Settings.CastingFatigue.CostOfChannelingHint',
    scope: 'world',
    config: false,
    default: 1,
    type: Number
  });

  // Define how many negative ME increase difficulty by one step
  game.settings.register(constants.moduleId, settings.magicalEndurance.negativeMEPerStep, {
    name: 'Forien.Armoury.Settings.CastingFatigue.NegativeMEPerStep',
    hint: 'Forien.Armoury.Settings.CastingFatigue.NegativeMEPerStepHint',
    scope: 'world',
    config: false,
    default: 5,
    type: Number
  });

  // Use Base CN if true, use Effective CN if false
  game.settings.register(constants.moduleId, settings.magicalEndurance.useBaseCN, {
    name: 'Forien.Armoury.Settings.CastingFatigue.UseBaseCN',
    hint: 'Forien.Armoury.Settings.CastingFatigue.UseBaseCNHint',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  // Select a calculation method for maximum magical endurance
  game.settings.register(constants.moduleId, settings.magicalEndurance.maxME, {
    name: 'Forien.Armoury.Settings.CastingFatigue.MaxME',
    hint: 'Forien.Armoury.Settings.CastingFatigue.MaxMEHint',
    scope: 'world',
    config: false,
    default: 'TBtimesWPB',
    type: String,
    choices: {
      [settings.magicalEndurance.maxME_TBtimesWPB]: 'Forien.Armoury.Settings.CastingFatigue.TBtimesWPB',
      [settings.magicalEndurance.maxME_TBplusWPB]: 'Forien.Armoury.Settings.CastingFatigue.TBplusWPB',
      [settings.magicalEndurance.maxME_TBplus2WPB]: 'Forien.Armoury.Settings.CastingFatigue.TBplus2WPB'
    }
  });

  //
  game.settings.register(constants.moduleId, settings.magicalEndurance.autoRegen, {
    name: 'Forien.Armoury.Settings.CastingFatigue.AutoRegen',
    hint: 'Forien.Armoury.Settings.CastingFatigue.AutoRegenHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean,
    onChange: (value) => {
      if (value && game.time.worldTime === 0) {
        Utility.notify(game.i18n.localize("Forien.Armoury.Settings.CastingFatigue.AutoRegenNoWorldTime"), {type: 'warning', permanent: true});
        game.settings.set(constants.moduleId, settings.magicalEndurance.autoRegen, false);
      } else if (game.time.worldTime !== 0) {
        SettingsConfig.reloadConfirm({world: true})
      }
    }
  });

  // Add enable/disable setting for combat fatigue feature
  game.settings.register(constants.moduleId, settings.combatFatigue.enable, {
    name: 'Forien.Armoury.Settings.CombatFatigue.Enable',
    hint: 'Forien.Armoury.Settings.CombatFatigue.EnableHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });

  // Add enable/disable setting for NPC combat fatigue
  game.settings.register(constants.moduleId, settings.combatFatigue.enableNPC, {
    name: 'Forien.Armoury.Settings.CombatFatigue.EnableNPC',
    hint: 'Forien.Armoury.Settings.CombatFatigue.EnableNPCHint',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  // Add enable/disable setting for arrow reclamation feature
  game.settings.register(constants.moduleId, settings.arrowReclamation.enable, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.Enable',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });

  // Add enable/disable recovery of Arrows
  game.settings.register(constants.moduleId, settings.arrowReclamation.enableArrows, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.EnableArrows',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableArrowsHint',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });
  // Add enable/disable recovery of Bolts
  game.settings.register(constants.moduleId, settings.arrowReclamation.enableBolts, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.EnableBolts',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableBoltsHint',
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });
  // Add enable/disable recovery of Bullets
  game.settings.register(constants.moduleId, settings.arrowReclamation.enableBullets, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.EnableBullets',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableBulletsHint',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  // Add setting that allows for different rules of arrow reclamation
  game.settings.register(constants.moduleId, settings.arrowReclamation.rule, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.Rule',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.RuleHint',
    scope: 'world',
    config: false,
    default: 'default',
    type: String,
    choices: {
      'default': 'Forien.Armoury.Settings.ArrowReclamation.DefaultRule',
      'success': 'Forien.Armoury.Settings.ArrowReclamation.SuccessRule',
      'noCrit': 'Forien.Armoury.Settings.ArrowReclamation.NoCritRule',
      'successNoCrit': 'Forien.Armoury.Settings.ArrowReclamation.SuccessNoCritRule',
      'failure': 'Forien.Armoury.Settings.ArrowReclamation.FailureRule',
      'failureNoCrit': 'Forien.Armoury.Settings.ArrowReclamation.FailureNoCritRule',
      'percentage': 'Forien.Armoury.Settings.ArrowReclamation.PercentageRule',
      'percentageNoCrit': 'Forien.Armoury.Settings.ArrowReclamation.PercentageNoCritRule',
    }
  });

  // Add Percentage setting for Percentage rules
  game.settings.register(constants.moduleId, settings.arrowReclamation.percentage, {
    name: 'Forien.Armoury.Settings.ArrowReclamation.Percentage',
    hint: 'Forien.Armoury.Settings.ArrowReclamation.PercentageHint',
    scope: 'world',
    config: false,
    default: 50,
    type: Number
  });

  // Allow Overcasting when casting from Scrolls
  game.settings.register(constants.moduleId, settings.scrolls.allowOvercasting, {
    name: 'Forien.Armoury.Settings.Scrolls.AllowOvercasting',
    hint: 'Forien.Armoury.Settings.Scrolls.AllowOvercastingHint',
    scope: 'world',
    config: false,
    default: settings.scrolls.allowOvercasting,
    type: String,
    choices: {
      [settings.scrolls.allowOvercastingMagick]: 'Forien.Armoury.Settings.Scrolls.AllowOvercastingMagick',
      [settings.scrolls.always]: 'Forien.Armoury.Settings.Scrolls.Always',
      [settings.scrolls.never]: 'Forien.Armoury.Settings.Scrolls.Never',
    }
  });

  // Difficulty of non Magick languages
  game.settings.register(constants.moduleId, settings.scrolls.difficultyMagick, {
    name: 'Forien.Armoury.Settings.Scrolls.DifficultyMagick',
    hint: 'Forien.Armoury.Settings.Scrolls.DifficultyMagickHint',
    scope: 'world',
    config: false,
    default: defaults.scrolls.difficultyMagick,
    type: String,
    choices: game.wfrp4e.config.difficultyLabels
  });

  // Difficulty of non Magick languages
  game.settings.register(constants.moduleId, settings.scrolls.difficulty, {
    name: 'Forien.Armoury.Settings.Scrolls.Difficulty',
    hint: 'Forien.Armoury.Settings.Scrolls.DifficultyHint',
    scope: 'world',
    config: false,
    default: defaults.scrolls.difficulty,
    type: String,
    choices: game.wfrp4e.config.difficultyLabels
  });

  // Should scroll have their own category in inventory?
  game.settings.register(constants.moduleId, settings.scrolls.ownCategory, {
    name: 'Forien.Armoury.Settings.Scrolls.OwnCategory',
    hint: 'Forien.Armoury.Settings.Scrolls.OwnCategoryHint',
    scope: 'client',
    config: false,
    default: true,
    type: Boolean
  });

  // How much Magical Endurance using scroll costs?
  game.settings.register(constants.moduleId, settings.scrolls.magicalEndurance, {
    name: 'Forien.Armoury.Settings.Scrolls.MagicalEndurance',
    hint: 'Forien.Armoury.Settings.Scrolls.MagicalEnduranceHint',
    scope: 'world',
    config: false,
    default: 0,
    type: Number
  });

  // Should scroll have replaced Description with one from the spell as well?
  game.settings.register(constants.moduleId, settings.scrolls.updateName, {
    name: 'Forien.Armoury.Settings.Scrolls.UpdateName',
    hint: 'Forien.Armoury.Settings.Scrolls.UpdateNameHint',
    scope: 'world',
    config: false,
    default: 'ask',
    type: String,
    choices: {
      [settings.scrolls.ask]: 'Forien.Armoury.Settings.Scrolls.Ask',
      [settings.scrolls.always]: 'Forien.Armoury.Settings.Scrolls.Always',
      [settings.scrolls.never]: 'Forien.Armoury.Settings.Scrolls.Never',
    }
  });

  // Should scroll have replaced Description with one from the spell as well?
  game.settings.register(constants.moduleId, settings.scrolls.replaceDescription, {
    name: 'Forien.Armoury.Settings.Scrolls.ReplaceDescription',
    hint: 'Forien.Armoury.Settings.Scrolls.ReplaceDescriptionHint',
    scope: 'world',
    config: false,
    default: true,
    type: Boolean
  });

  game.settings.register(constants.moduleId, settings.initialized, {
    scope: 'world',
    config: false,
    default: false,
    type: Boolean
  });
  
  // Should scroll have replaced Description with one from the spell as well?
  game.settings.register(constants.moduleId, settings.socketTests.mode, {
    name: 'Forien.Armoury.Settings.SocketTests.Mode',
    hint: 'Forien.Armoury.Settings.SocketTests.ModeHint',
    scope: 'world',
    config: false,
    default: 'onKeyPress',
    type: String,
    choices: {
      [settings.socketTests.onKeyPress]: 'Forien.Armoury.Settings.SocketTests.OnKeyPress',
      [settings.socketTests.always]: 'Forien.Armoury.Settings.SocketTests.Always',
      [settings.socketTests.never]: 'Forien.Armoury.Settings.SocketTests.Never',
    }
  });
}

export {registerSettings};
