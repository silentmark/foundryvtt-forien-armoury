import GrimoireSheet                    from "./apps/GrimoireSheet.mjs";
import ScrollSheet                      from "./apps/ScrollSheet.mjs";
import SettingsApp                      from "./apps/SettingsApp.mjs";
import {constants, dataTypes, settings} from "./constants.mjs";
import GrimoireModel                    from "./data-models/Grimoire.mjs";
import ScrollModel                      from "./data-models/Scroll.mjs";
import ArrowReclamation                 from "./features/ArrowReclamation.mjs";
import CastingFatigue                   from "./features/CastingFatigue.mjs";
import CheckCareers                     from "./features/CheckCareers.mjs";
import CombatFatigue                    from "./features/CombatFatigue.mjs";
import Diseases                         from "./features/Diseases.mjs";
import Grimoires                        from "./features/Grimoires.mjs";
import Injuries                         from "./features/Injuries.mjs";
import ItemProperties                   from "./features/ItemProperties.mjs";
import ItemRepair                       from "./features/ItemRepair.mjs";
import Macros                           from "./features/Macros.js";
import TemporaryRunes                   from "./features/Runes.mjs";
import Scrolls                          from "./features/Scrolls.mjs";
import Species                          from "./features/Species.mjs";
import Tokens                           from "./features/Tokens.mjs";
import {styleHelpers}                   from "./helpers/styleHelpers.js";
import Integrations                     from "./Integrations.mjs";
import {registerSettings}               from "./Settings.mjs";
import {Debug}                          from "./utility/Debug.mjs";
import Utility                          from "./utility/Utility.mjs";
import WorldTimeObserver                from "./utility/WorldTimeObserver.mjs";

export default class ForienArmoury {
  /**
   * List of Modules to be initialized and added to API
   */
  #modules = [
    ArrowReclamation,
    CastingFatigue,
    CheckCareers,
    CombatFatigue,
    Diseases,
    Grimoires,
    Integrations,
    Injuries,
    ItemProperties,
    ItemRepair,
    Macros,
    Scrolls,
    Species,
    TemporaryRunes,
    Tokens,
    WorldTimeObserver,
  ];

  /**
   * Actually initialized modules
   */
  modules = new Map();

  /**
   * @type {SocketlibSocket}
   * @public
   */
  #socket;

  /**
   * @type {{}}
   * @public
   */
  helpers;

  constructor() {
    this.#registerDataModels();
    this.#initializeModules();
    this.#bindHooks();
    this.#preloadTemplates();
    this.#registerSettings();
    this.#hackWFRP4e();

    Utility.notify("Module initialized!", {consoleOnly: true});
  }

  /**
   *
   * @return {TemporaryRunes}
   */
  get runes() {
    return this.modules.get("temporaryRunes");
  }

  /**
   *
   * @return {ItemRepair}
   */
  get itemRepair() {
    return this.modules.get("itemRepair");
  }

  /**
   * @return {CombatFatigue}
   */
  get combatFatigue() {
    return this.modules.get("combatFatigue");
  }

  /**
   * @return {CastingFatigue}
   */
  get castingFatigue() {
    return this.modules.get("castingFatigue");
  }

  /**
   * @return {ItemProperties}
   */
  get itemProperties() {
    return this.modules.get("itemProperties");
  }

  /**
   * @return {ArrowReclamation}
   */
  get arrowReclamation() {
    return this.modules.get("arrowReclamation");
  }

  /**
   * @return {CheckCareers}
   */
  get checkCareers() {
    return this.modules.get("checkCareers");
  }

  /**
   * @return {Macros}
   */
  get macros() {
    return this.modules.get("macros");
  }

  /**
   * @return {Integrations}
   */
  get integrations() {
    return this.modules.get("integrations");
  }

  #registerDataModels() {
    Object.assign(CONFIG.Item.dataModels, {
      [dataTypes.scroll]: ScrollModel,
      [dataTypes.grimoire]: GrimoireModel,
    });
    Object.assign(CONFIG.Item.typeLabels, {
      [dataTypes.scroll]: "Forien.Armoury.Scrolls.MagicScroll",
      [dataTypes.grimoire]: "Forien.Armoury.Grimoires.Grimoire",
    });
    foundry.applications.apps.DocumentSheetConfig.registerSheet(Item, constants.moduleId, ScrollSheet, {
      types: [dataTypes.scroll],
      makeDefault: true,
    });
    foundry.applications.apps.DocumentSheetConfig.registerSheet(Item, constants.moduleId, GrimoireSheet, {
      types: [dataTypes.grimoire],
      makeDefault: true,
    });
  }

  /**
   * Initializes API modules
   */
  #initializeModules() {
    for (let module of this.#modules) {
      const Module = new module();
      this.modules.set(Module.camelName, Module);
    }

    this.helpers = {
      styles: styleHelpers,
    };
  }

  /**
   * Binds hooks
   */
  #bindHooks() {
    Hooks.once("ready", () => {
      if (game.modules.get("socketlib")?.active) {
        this.#socket = socketlib.registerModule(constants.moduleId);
        this.modules.get("arrowReclamation").registerSockets(this.#socket);
      }

      if (Utility.getSetting(settings.initialized) === false) {
        this.#initialConfig();
      }
    });

    this.modules.forEach(module => module.bindHooks());

    Utility.notify("Hooks registered.", {consoleOnly: true});
  }

  /**
   * Preloads templates used by the modules.
   */
  #preloadTemplates() {
    const templates = {
      [constants.moduleId]: {
        settings: SettingsApp.partials,
      },
    };

    this.modules.forEach((module, name) => {
      templates[constants.moduleId][name] = module.getTemplates();
    });


    Utility.preloadTemplates(templates);
  }

  /**
   * Not really hacking anything, just adding entries to system config for increased compatibility.
   *
   * For example, adding a Runebound lore so Runebound Spells can be searched via Item Browser
   */
  #hackWFRP4e() {
    game.wfrp4e.config.magicLores.runebound = "Forien.Armoury.Runebound.LoreName";

    this.modules.forEach((module, _name) => {
      let config = module.applyWfrp4eConfig();

      foundry.utils.mergeObject(game.wfrp4e.config, config);
    });
  }

  /**
   * Registers settings with the Foundry
   */
  #registerSettings() {
    registerSettings();
    this.modules.forEach(module => {
      module.registerSettings();
    });
    Debug.registerSetting();
  }

  #initialConfig() {
    this.modules.forEach(module => {
      module.registerSettings();
    });
  }

  /**
   * Returns the version of the API.
   * @return {string}
   */
  version() {
    return "1.2.0";
  }
}
