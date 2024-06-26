# Changelog

## v2.X.X

### v2.0.0
* Added Runebound species with Reiklander and Orphaned subspecies
* Updated code to be compatible with wfrp4e v7.1.0, namely changed `actor.itemCategories` to `actor.itemTypes`
* Updated all effects to make them work properly with new Active Effect rework
* Created `Magic Scrolls` type for Items.
  * This is new item type in the system, which allows casting Spells from Scrolls, without need to add spell itself to an Actor
* New Weapon Rune
  * Rune of Fracture. Adds Impact, but damages weapon by 2 per attack.

@todo
- check symptom effects
- add runebound rolltables to compendium
- make makro for generating random scroll
- merge and test PR from silent_mark

## v1.X.X

### v1.4.1
* Fixed harmless console error that appeared when creating new Item on Actor that isn't a Disease

### v1.4.0
* Added accessory: Amulet of „Resilience“
* Added new career: Monster Hunter
  * This career utilizes one of three unique Fighting Styles and focuses on tracking down and fighting monstrous beasts
* Added new journal: Forien's Lore
  * Describing Hunters' Guild and Runebounds
* Added 8 new Talents
  * `Fighting Style (Any)` and `Fighting Master (Style)` along with variant for every of the three styles.
* Added 4 symptoms made by RassilonMonk
* Added 5 new Diseases by RassilonMonk
* Added a `Drunk` Trait
* Added a general Macro to quickly open the Forien's Armoury Settings
* Reworked structure of `.mjs` files in the module, since codebase grows
* Created Settings App, which allows to display settings in more visually appealing and intuitive way
* Modified some icons by adding a wfrp4e-style border to them.
* Improved the API and streamlined a lot of code responsible for handling ESModules.
  * API is now version `1.1.0`, should be backwards-compatible.
* Added `Casting Fatigue` feature, proposed and designed by VividOblivion. 
* Created a `WorldTimeObserver`, which allows me to track world time updates and fire off events based on passed time
* Hooked up Magical Endurance Regeneration (from Casting Fatigue) to the `WorldTimeObserver` for automated regeneration
  * This requires some time tracking module (like `Simple Calendar`) to actually modify the `World Time` setting.
* Created am Automatic Disease Progression, which will progress diseases' duration and incubation automatically
  * This requires some time tracking module (like `Simple Calendar`) to actually modify the `World Time` setting.
* Improved Debug readability, by adding tags based on ESModule name, as well as trace to warnings and errors. 

### v1.3.2
* Added full debug support. Can be enabled in settings (client side)
  * Use `Forien's Armoury` as filter in console to only see this module's messages

### v1.3.1
* Added three accessories: Amulet of „Protection“, Elegant Pipe and Spectacles
* Fixed arrow items' image paths
* Fixed weird edge case with Roll Limited Skill macro
* Fixed Combat Fatigue counting wrong amount of turns

### v1.3.0
* Reintroduced the Slashing, Recoverable and Unrecoverable properties for weapons and ammunition
* Introduced new Incendiary, Poisonous and Blinding qualities
* Unbreakable quality now ensures ammunition will be recovered
* Added Combat Fatigue feature (implementing Getting Tired from CRB p.168)
* Added new items
  * Cutlass, Light Bomb, Cracker Bullet, Razor Bullet, Poisoned Arrows, Fire Arrows, Winged Arrows
* Changed Torch (weapon) to use Incendiary quality instead of effect
* Added Repulsive trait
* Added macro for testing Advanced Skills with result limits
* Updated the Journals with new information
* Minor fixes to items (improved gunpowder, powder horns)
* Fixed error with Arrow Reclamation

### v1.2.1
* Fixed remaining item links in compendiums
* Fixed ReImport not deleting old stuff
### v1.2.0
* Fixed invalid item links for WFRP4e Core 4.0.0
* Removed stray debugger
### v1.1.6
* Fixed the Item Piles Rolltables looped import due to a bug with non-existing compendium in WFRP4e Core 4.0.0
### v1.1.5
* Fixed the "Percentage" modes for Ammo Reclamation not working properly
### v1.1.4
* Fixed serious bug that would delete all RollTables on Re-Importing the Item Piles Integration instead of only RollTables in one specific folder
### v1.1.3
* Fixed Repair Item feature not working without specified Type and Subtype
### v1.1.2
* Introduced various Price Tables by Nibbler

### v1.1.0
* Fixed some duplicated IDs from WFRP4e Core module (for example Potion Bag was overriding Sling Bag) (Issue #35)
* Fixed "Check Equipment for Repairs" macro that would not allow repairing damaged Armour if Armour only had 1 AP 
* Allowed "trapping" Torch to be lit up
  * This converts the Torch into an equippable "weapon"
* Effects on ATL Light items now have time limit set up for Time's Up module (Issue #34)
* Added an OPT-IN setting that will configure ATL presets to work well with Light items from Compendium (Issue #34)
* Done some groundwork to better support module integrations in the future.
* Added Item Piles Integration in form of a prefab Merchants and RollTables to be used to populate those Merchants (Issues #27, #28)
  * Added Import Rolltable feature along with Re-Import setting that will convert Rolltable entries from UiA to Core module if UiA is not installed
  * Added Service Items that work well with prefab Merchants, including Repair services
* Expanded Repair Item functionality to allow macro being run on GM side for the player, also to limit the types of items that can be repaired
* Changed "Check Career!" Macro to be built-in api functionality in preparation to be used in the upcoming Token Action HUD for WFRP4e
  * Also, that functionality now supports localization!

### v1.0.0
* **Completely rewrote the Module** for Foundry 11 and WFRP4e 6. 
  * Old version was made for Foundry 0.6 and WFRP4e 1.6
  * Leaving the old changelog as is, even though many things have been removed
* Changed License to MIT
* Added bunch of my own Houserules in a Journal
* Added new careers:
  * Dwarven Runesmiths
  * Runebound Rangers
* Added bunch of new items, weapons, trappings
  * Generic Ingredients for each Tradition
  * Gambeson type Armour
  * Rebalanced Soft Leather Armour
  * Changed Breastplate (only covers front)
  * Added Cuirass (more like vanilla Breastplate)
  * Powder Kegs
  * Quivers and Powder Horns
  * and more
* Added fully automated Rune support for Runesmith
  * Runes are effects on Items
  * Temporary Runes when disabled will delete themselves from Actor and Item
  * Optionally, Item will be damaged when Temporary Rune is removed from it
  * For best effects, I suggest using [Times Up](https://foundryvtt.com/packages/times-up) by Tim Posney
* Added new type of Magic for Runebound Rangers

## v0.X.X
### v0.2.X

#### v0.2.13
* Updated to work with WFRP 2.0.0 and higher
* Fixed dependency bug with FVTT 0.6.6

#### v0.2.12
* Possibly fixed bug with WFRP4e 2.0.0
* Adjustments to ingredients' descriptions in compendium

#### v0.2.11
* fixes to German translation by ElCamino

#### v0.2.10
* added German translation thanks to ElCamino

#### v0.2.9
* added French translation thanks to LeRatierBretonnien and Gharazel

#### v0.2.8
* added FoundryGet integration

#### v0.2.7
* fixed icons for WFRP 1.6.1
* upped compatibleCoreVersion to 0.6.3

#### v0.2.6
* fixed bug, where Bleeding was being applied even without Slashing
* added module setting that allows to disable Slashing rules 

#### v0.2.5
* Fixed some GWMWG weapons according to Rat Catchers Guild update, thanks to hamofficer
* Added support for retrieving arrows out of combat
* removed unnecessary logging

#### v0.2.4
* Added notification when combat ends about all recovered ammunition. Only owner and GM see it. 
* fixed Unbreakable
* added `i18nformat` helper for Handlebars that can either accept multiple arguments, or object of substitutes

#### v0.2.3
* prepared groundwork for translation using Babele to any language
* added automation for applying Bleed Conditions upon hit with Slashing weapon
* started translating Forien's Armoury compendium to Polish (all names and most descriptions done)

#### v0.2.2
* under DasSauerkraut's permission, integrated Gerwin Waffenhalter’s Magnificent Weapons Gallery weapons and slashing quality 
* prepared module for translation to Polish
* translated basic strings for now, Compendium still English only
* added check for ammunition to avoid errors on tests not using ammunition
* removed unnecessary logging

#### v0.2.1
* fixed links to changelog and readme in module.json

#### v0.2.0
* Extended Arrow Recovery system with more rules
* Added new qualities and flaws to use with projectiles:
  * Unbreakable (used extisting quality) – projectiles is always recovered, bypassing rules, as long as it is recoverable (settings/quailities)
  * Recoverable – projectile can be recovered, even if settings won't allow it
  * Unrecoverable – projectile always perishes, will never be recovered
  * Sturdy – projectile is sturdy and easier to recover
  * Frail – projectile breaks easily and is harder to recover
  * Hard To Find – projectile is hard to find, if it would be recovered, roll again with -10 modifier
* Added new qualities and flaws to some items in compendium
* Added variants for lead and stone bullets that use projectile qualities and flaws
* Created changelog

### v0.1.X

#### v0.1.7
* Fixed Arrow Recovery to use sockets, so it works for everyone, not only GM

#### v0.1.6 - Arrow Recovery
* Added arrow recovery feature with several rules
