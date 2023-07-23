export default class Settings {

  /**
   * Registers settings with the Foundry
   */
  registerSettings() {
    // Add enable/disable setting for temporary runes damaging items
    game.settings.register('forien-armoury', 'runes.damageEnable', {
      name: 'Forien.Armoury.Settings.Runes.Enable',
      hint: 'Forien.Armoury.Settings.Runes.EnableHint',
      scope: 'world',
      config: true,
      default: false,
      type: Boolean
    });

    // Add enable/disable setting for arrow reclamation feature
    game.settings.register('forien-armoury', 'arrowReclamation.Enable', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.Enable',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableHint',
      scope: 'world',
      config: true,
      default: false,
      type: Boolean
    });

    // Add enable/disable recovery of Arrows
    game.settings.register('forien-armoury', 'arrowReclamation.EnableArrows', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.EnableArrows',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableArrowsHint',
      scope: 'world',
      config: true,
      default: true,
      type: Boolean
    });
    // Add enable/disable recovery of Bolts
    game.settings.register('forien-armoury', 'arrowReclamation.EnableBolts', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.EnableBolts',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableBoltsHint',
      scope: 'world',
      config: true,
      default: false,
      type: Boolean
    });
    // Add enable/disable recovery of Bullets
    game.settings.register('forien-armoury', 'arrowReclamation.EnableBullets', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.EnableBullets',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.EnableBulletsHint',
      scope: 'world',
      config: true,
      default: true,
      type: Boolean
    });

    // Add setting that allows for different rules of arrow reclamation
    game.settings.register('forien-armoury', 'arrowReclamation.Rule', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.Rule',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.RuleHint',
      scope: 'world',
      config: true,
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
    game.settings.register('forien-armoury', 'arrowReclamation.Percentage', {
      name: 'Forien.Armoury.Settings.ArrowReclamation.Percentage',
      hint: 'Forien.Armoury.Settings.ArrowReclamation.PercentageHint',
      scope: 'world',
      config: true,
      default: 50,
      type: Number
    });

    // Add Percentage setting for Percentage rules
    game.settings.register('forien-armoury', 'module.initialized', {
      scope: 'world',
      config: false,
      default: false,
      type: Boolean
    });
  }


}