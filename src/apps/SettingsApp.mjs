import {constants, settings} from "../constants.mjs";
import {Debug}               from "../utility/Debug.mjs";
import Utility               from "../utility/Utility.mjs";

const {ApplicationV2, HandlebarsApplicationMixin} = foundry.applications.api;

export default class SettingsApp extends HandlebarsApplicationMixin(ApplicationV2) {
  static #templates = {
    app: "apps/settings/settings.hbs",
    tab: "apps/settings/tab.hbs",
    promo: "apps/settings/promo.hbs",
    setting: "apps/settings/setting.hbs",
  };

  static DEFAULT_OPTIONS = {
    tag: "form",
    form: {
      handler: this._updateObject,
      submitOnChange: false,
      closeOnSubmit: true,
    },
    id: settings.app,
    classes: ["armoury-settings", "forien-armoury", "standard-form"],
    window: {
      resizable: false,
      title: `${constants.moduleLabel}`,
    },
    position: {
      width: 600,
      height: 670,
    },
    actions: {
      addFilter: this._onAddFilter,
    },
  };

  static PARTS = {
    content: {template: Utility.getTemplate(SettingsApp.partials.app)},
    footer: {template: "templates/generic/form-footer.hbs"},
  };

  static TABS = {
    primary: {
      tabs: [
        {id: "main"},
        {id: "arrow-reclamation"},
        {id: "combat-fatigue"},
        {id: "casting-fatigue"},
        {id: "scrolls"},
        {id: "grimoires"},
        {id: "integrations"},
      ],
    },
  };

  /**
   * Returns key->path pairs for Handlebar partials
   *
   * @return {{app: string, promo: string, tab: string, setting: string}}
   */
  static get partials() {
    return SettingsApp.#templates;
  }

  /**
   * @inheritDoc
   */
  async _prepareContext(options = {}) {
    const context = await super._prepareContext(options);

    context.tabs = this.processSettingTabs();
    context.buttons = [{type: "submit", icon: "fa-regular fa-floppy-disk", label: "SETTINGS.Save"}];

    return context;
  }

  /**
   * Returns setting's configuration data along with value and other useful properties
   *
   * @param {string} settingName
   *
   * @return {*|null}
   */
  prepareSetting(settingName) {
    const setting = game.settings.settings.get(`${constants.moduleId}.${settingName}`);

    if (!setting) return null;
    if (setting.scope === "world" && !game.user.isGM) return null;

    const s = foundry.utils.deepClone(setting);

    s.id = `${s.namespace}.${s.key}`;
    s.name = game.i18n.localize(s.name);
    s.hint = game.i18n.localize(s.hint);
    s.value = game.settings.get(s.namespace, s.key);
    s.type = setting.type instanceof Function ? setting.type.name : "String";
    s.isCheckbox = setting.type === Boolean;
    s.isSelect = s.choices !== undefined;
    s.isNumber = setting.type === Number;

    return s;
  }

  /**
   * Transforms Tab Structure Definition from `SettingsApp.settingTabs()` by filling it with settings' data and pruning
   * out empty arrays and objects
   *
   * @return {{castingFatigue: {always: [string], enable: {settings: [string,string,string,string], when: string}},
   *   arrow: {always: [string], enable: {settings: [string,string,string,string,string], when: string}},
   *   combatFatigue: {always: [string], enable: {settings: [string], when: string}}, main: {always: [string,string]},
   *   integrations: {groups: [[string],[string,string]]}}}
   */
  processSettingTabs() {
    const tabsData = this.settingTabs;

    for (const key in tabsData) {
      const tab = tabsData[key];

      if (tab.always) {
        tab.always = tab.always.map(this.prepareSetting).filter(s => !!s);
        if (tab.always.length === 0)
          delete tab.always;
      }

      if (tab.enable) {
        tab.enable.settings = tab.enable.settings.map(this.prepareSetting).filter(s => !!s);

        if (tab.enable.settings.length === 0)
          delete tab.enable;
      }

      if (tab.groups) {
        for (let i in tab.groups) {
          tab.groups[i] = tab.groups[i].map(this.prepareSetting).filter(s => !!s);
        }

        tab.groups = tab.groups.filter(g => g.length);
        if (tab.groups.length === 0)
          delete tab.groups;
      }

      if (foundry.utils.isEmpty(tab)) {
        delete tabsData[key];
      }
    }

    return tabsData;
  }

  /**
   * Returns Tab Definiton which is used to build tabs and sorting settings into proper places
   *
   * @return {{castingFatigue: {always: string[], enable: {settings: (string)[], when: string}}, arrow: {always:
   *   string[], enable: {settings: (string)[], when: string}}, combatFatigue: {always: string[], enable: {settings:
   *   string[], when: string}}, main: {always: (string)[]}, integrations: {groups: (string[]|(string)[])[]}}}
   */
  get settingTabs() {
    return {
      main: {
        always: [
          settings.runes.enableDamage,
          settings.properties.enabled,
          Debug.setting,
        ],
      },

      actor: {
        always: [
          settings.diseases.autoProgress,
          settings.injuries.autoProgress,
          settings.actor.rollToken,
        ],
        enable: {
          when: settings.actor.rollToken,
          settings: [
            settings.actor.rollMode,
            settings.actor.rollMoney,
            settings.actor.defaultMoney,
            settings.actor.moneyMode,
          ],
        },
      },

      arrow: {
        always: [
          settings.arrowReclamation.enable,
        ],
        enable: {
          when: settings.arrowReclamation.enable,
          settings: [
            settings.arrowReclamation.enableArrows,
            settings.arrowReclamation.enableBolts,
            settings.arrowReclamation.enableBullets,
            settings.arrowReclamation.rule,
            settings.arrowReclamation.percentage,
          ],
        },
      },

      combatFatigue: {
        always: [
          settings.combatFatigue.enable,
        ],
        enable: {
          when: settings.combatFatigue.enable,
          settings: [
            settings.combatFatigue.enableNPC,
            settings.combatFatigue.enableCorePassOut,
          ],
        },
      },

      castingFatigue: {
        always: [
          settings.magicalEndurance.enabled,
        ],
        enable: {
          when: settings.magicalEndurance.enabled,
          settings: [
            settings.magicalEndurance.maxME,
            settings.magicalEndurance.costOfChanneling,
            settings.magicalEndurance.negativeMEPerStep,
            settings.magicalEndurance.useBaseCN,
            settings.magicalEndurance.autoRegen,
          ],
        },
      },

      scrolls: {
        always: [
          settings.scrolls.allowOvercasting,
          settings.scrolls.ownCategory,
          settings.scrolls.difficultyMagick,
          settings.scrolls.difficulty,
          settings.scrolls.magicalEndurance,
          settings.scrolls.updateName,
          settings.scrolls.replaceDescription,
          settings.scrolls.defaultEncumbrance,
          settings.scrolls.defaultAvailability,
        ],
      },

      grimoires: {
        always: [
          settings.grimoires.requireEquipped,
          settings.grimoires.transferWithoutLore,
          settings.grimoires.requireReadWrite,
          settings.grimoires.hideSpellsWithoutLanguage,
          settings.grimoires.ownCategory,
          settings.grimoires.defaultEncumbrance,
          settings.grimoires.defaultAvailability,
        ],
      },

      integrations: {
        groups: [
          [
            settings.integrations.atl.resetPresets,
          ],
          [
            settings.integrations.itemPiles.setCurrencies,
            settings.integrations.itemPiles.reimportRolltables,
          ],
        ],
      },
    };
  }

  _configureRenderOptions(options) {
    super._configureRenderOptions(options);
    options.title = `${constants.moduleLabel} – ${game.i18n.localize("SETTINGS.Configure")}`;
  }

  /**
   * @inheritDoc
   */
  async _onRender(context, options) {
    super._onRender(context, options);

    const checkboxes = this.element.querySelectorAll("input[type=\"checkbox\"]");

    for (const checkbox of checkboxes) {
      checkbox.addEventListener("change", ev => {
        this.toggleActiveClass(ev.target, this.element);
      });

      this.toggleActiveClass(checkbox, this.element);
    }
  }

  /**
   * Toggles Active Class on a element with proper `data-show-when` attribute based on Checkbox's status
   *
   * @param element
   * @param html
   */
  toggleActiveClass(element, html) {
    let name = element.name;
    let div = html.querySelector(`[data-show-when="${name}"]`);
    div?.classList.toggle("active", element.checked);
  }

  /**
   * @inheritDoc
   */
  static async _updateObject(event, form, formData, options = {}) {
    for (let setting in formData.object)
      await game.settings.set(constants.moduleId, setting, formData.object[setting]);
  }
}
