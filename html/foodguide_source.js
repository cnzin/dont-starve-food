/*
Makes use of no third-party code (for better or worse)

Copyright (c) 2013

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function () {
	'use strict';
	var calories_per_day = 75,
		total_day_time = 480,
		seg_time = total_day_time / 16,
		day_time = 10 * total_day_time / 16,
		dusk_time = 2 * total_day_time / 16,
		night_time = total_day_time - day_time - dusk_time,
		base_cook_time = night_time * 0.3333,
		perish_warp = 1,
		stack_size_largeitem = 10,
		stack_size_meditem = 20,
		stack_size_smallitem = 40,
		healing_tiny = 1,
		healing_small = 5,
		healing_medsmall = 10,
		healing_med = 25,
		healing_medlarge = 35,
		healing_large = 50,
		healing_huge = 75,
		healing_superhuge = 100,
		perish_superfast = 3 * total_day_time * perish_warp,
		perish_fast = 6 * total_day_time * perish_warp,
		perish_med = 12 * total_day_time * perish_warp,
		perish_slow = 18 * total_day_time * perish_warp,
		perish_preserved = 24 * total_day_time * perish_warp,
		perish_superslow = 40 * total_day_time * perish_warp,
		calories_tiny = calories_per_day / 8,
		calories_small = calories_per_day / 6,
		calories_med = calories_per_day / 3,
		calories_large = calories_per_day / 2,
		calories_huge = calories_per_day,
		calories_superhuge = calories_per_day * 2,
		spoiled_health = -1,
		spoiled_hunger = -10,
		food = {
			butter: {
				name: 'Butter',
				fat: 1,
				dairy: 1,
				health: healing_large,
				hunger: calories_med,
				perish: perish_superslow,
				stack: stack_size_smallitem
			},
			butterflywings: {
				name: 'Butterfly Wings',
				isveggie: true,
				decoration: 2,
				health: healing_med,
				hunger: calories_tiny,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			fish: {
				name: 'Fish',
				ismeat: true,
				meat: 0.5,
				fish: 1,
				health: healing_med,
				hunger: calories_small,
				perish: perish_superfast,
				stack: stack_size_smallitem
			},
			fish_cooked: {
				name: 'Cooked Fish',
				ismeat: true,
				meat: 0.5,
				fish: 1,
				health: healing_large,
				hunger: calories_small,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			froglegs: {
				name: 'Frog Legs',
				ismeat: true,
				meat: 0.5,
				health: healing_tiny,
				hunger: calories_small,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			froglegs_cooked: {
				name: 'Cooked Frog Legs',
				ismeat: true,
				meat: 0.5,
				health: healing_small,
				hunger: calories_small,
				perish: perish_med,
				stack: stack_size_smallitem
			},
			honey: {
				name: 'Honey',
				sweetener: true,
				health: healing_medsmall,
				hunger: calories_small,
				perish: perish_superslow,
				stack: stack_size_smallitem
			},
			mandrake: {
				name: 'Mandrake',
				veggie: 1,
				magic: 1,
				health: healing_huge,
				hunger: calories_huge,
				stack: stack_size_smallitem
			},
			mandrake_cooked: {
				name: 'Cooked Mandrake',
				uncookable: true,
				veggie: 1,
				magic: 1,
				health: healing_superhuge,
				hunger: calories_superhuge,
				stack: stack_size_smallitem
			},
			monstermeat: {
				name: 'Monster Meat',
				ismeat: true,
				meat: 1,
				monster: true,
				health: -healing_med,
				hunger: calories_med,
				perish: perish_med,
				stack: stack_size_meditem
			},
			monstermeat_cooked: {
				name: 'Cooked Monster Meat',
				ismeat: true,
				meat: 1,
				monster: true,
				health: -healing_small,
				hunger: calories_med,
				perish: perish_slow,
				stack: stack_size_meditem
			},
			meat: {
				name: 'Meat',
				ismeat: true,
				meat: 1,
				health: healing_med,
				hunger: calories_med,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			meat_cooked: {
				name: 'Cooked Meat',
				ismeat: true,
				meat: 1,
				health: healing_medlarge,
				hunger: calories_large,
				perish: perish_med,
				stack: stack_size_meditem
			},
			morsel: {
				name: 'Morsel',
				ismeat: true,
				meat: 0.5,
				health: healing_small,
				hunger: calories_small,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			morsel_cooked: {
				name: 'Cooked Morsel',
				ismeat: true,
				meat: 0.5,
				health: healing_med,
				hunger: calories_small,
				perish: perish_med,
				stack: stack_size_smallitem
			},
			drumstick: {
				name: 'Drumstick',
				ismeat: true,
				meat: 0.5,
				health: healing_tiny,
				hunger: calories_small,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			drumstick_cooked: {
				name: 'Fried Drumstick',
				ismeat: true,
				meat: 0.5,
				health: healing_small,
				hunger: calories_small,
				perish: perish_med,
				stack: stack_size_meditem
			},
			egg: {
				name: 'Tallbird Egg',
				egg: 4,
				health: healing_small,
				hunger: calories_med
			},
			egg_cooked: {
				name: 'Fried Tallbird Egg',
				egg: 4,
				health: 0,
				hunger: calories_large
			},
			carrot: {
				name: 'Carrot',
				isveggie: true,
				veggie: 1,
				health: healing_tiny,
				hunger: calories_small,
				perish: perish_med,
				stack: stack_size_smallitem
			},
			carrot_cooked: {
				name: 'Roasted Carrot',
				isveggie: true,
				veggie: 1,
				health: healing_small,
				hunger: calories_med,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			corn: {
				name: 'Corn',
				isveggie: true,
				veggie: 1,
				health: healing_small,
				hunger: calories_med,
				perish: perish_med,
				stack: stack_size_smallitem
			},
			corn_cooked: {
				name: 'Popcorn',
				isveggie: true,
				veggie: 1,
				health: healing_small,
				hunger: calories_small,
				perish: perish_slow,
				stack: stack_size_smallitem
			},
			pumpkin: {
				name: 'Pumpkin',
				isveggie: true,
				veggie: 1,
				health: healing_small,
				hunger: calories_large,
				perish: perish_med,
				stack: stack_size_meditem
			},
			pumpkin_cooked: {
				name: 'Hot Pumpkin',
				isveggie: true,
				veggie: 1,
				health: healing_med,
				hunger: calories_large,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			eggplant: {
				name: 'Eggplant',
				isveggie: true,
				veggie: 1,
				health: healing_med,
				hunger: calories_med,
				perish: perish_med,
				stack: stack_size_meditem
			},
			eggplant_cooked: {
				name: 'Braised Eggplant',
				isveggie: true,
				veggie: 1,
				health: healing_large,
				hunger: calories_med,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			durian: {
				name: 'Durian',
				isfruit: true,
				monster: 1,
				fruit: 1,
				health: -healing_small,
				hunger: calories_med,
				perish: perish_med,
				stack: stack_size_meditem
			},
			durian_cooked: {
				name: 'Extra Smelly Durian',
				isfruit: true,
				monster: 1,
				fruit: 1,
				health: 0,
				hunger: calories_med,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			pomegranate: {
				name: 'Pomegranate',
				isfruit: true,
				fruit: 1,
				health: healing_med,
				hunger: calories_tiny,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			pomegranate_cooked: {
				name: 'Sliced Pomegranate',
				isfruit: true,
				fruit: 1,
				health: healing_huge,
				hunger: calories_small,
				perish: perish_superfast,
				stack: stack_size_smallitem
			},
			dragonfruit: {
				name: 'Dragon Fruit',
				isfruit: true,
				fruit: 1,
				health: healing_med,
				hunger: calories_tiny,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			dragonfruit_cooked: {
				name: 'Prepared Dragon Fruit',
				isfruit: true,
				fruit: 1,
				health: healing_huge,
				hunger: calories_small,
				perish: perish_superfast,
				stack: stack_size_smallitem
			},
			berries: {
				name: 'Berries',
				isfruit: true,
				fruit: 0.5,
				health: healing_tiny,
				hunger: calories_tiny,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			berries_cooked: {
				name: 'Roasted Berries',
				isfruit: true,
				fruit: 0.5,
				health: healing_small,
				hunger: calories_small,
				perish: perish_superfast,
				stack: stack_size_smallitem
			},
			goop: {
				name: 'Rot',
				uncookable: true,
				health: spoiled_health,
				hunger: spoiled_hunger,
				stack: stack_size_smallitem
			},
			seeds: {
				name: 'Seeds',
				uncookable: true,
				health: healing_tiny,
				hunger: calories_tiny,
				perish: perish_superslow,
				stack: stack_size_smallitem
			},
			seeds_cooked: {
				name: 'Toasted Seeds',
				uncookable: true,
				health: healing_small,
				hunger: calories_small,
				perish: perish_med,
				stack: stack_size_smallitem
			},
			honeycomb: {
				name: 'Honeycomb',
				sweetener: true
			},
			twigs: {
				name: 'Twigs',
				inedible: 1
			},
			petals: {
				name: 'Petals',
				uncookable: true,
				health: healing_tiny,
				hunger: 0,
				perish: perish_fast,
				stack: stack_size_smallitem
			},
			trunk_summer: {
				name: 'Koalefant Trunk',
				uncookable: true,
				ismeat: true,
				health: healing_medlarge,
				hunger: calories_large,
				perish: perish_fast,
				stack: stack_size_meditem
			},
			trunk_summer_cooked: {
				name: 'Koalefant Trunk Steak',
				uncookable: true,
				ismeat: true,
				health: healing_large,
				hunger: calories_huge,
				perish: perish_slow,
				stack: stack_size_meditem
			}
		},
		testRequirement = function (requirement) { return requirement.test; },
		//note: qty not used yet, this is for rapid summation
		ORTest = function (cooker, names, tags) { return this.item1.test(cooker, names, tags) || this.item2.test(cooker, names, tags); },
		ORString = function () { return this.item1 + ' or ' + this.item2; },
		OR = function (item1, item2) { return {item1: item1, item2: item2, test: ORTest, toString: ORString, cancel: item1.cancel || item2.cancel}; },
		NOTTest = function (cooker, names, tags) { return !this.item.test(cooker, names, tags); },
		NOTString = function () { return 'not ' + this.item; },
		NOT = function (item) { return {item: item, test: NOTTest, toString: NOTString, cancel: true}; },
		NAMETest = function (cooker, names, tags) { return names[this.name] || names[this.name + '_cooked']; },
		NAMEString = function () { return food[this.name].name + (this.qty ? this.qty : ''); },
		NAME = function (name, qty) { return {name: name, qty: qty || null, test: NAMETest, toString: NAMEString}; }, //permits cooked variant
		SPECIFICTest = function (cooker, names, tags) { return names[this.name]; },
		SPECIFICString = function () { return '*' + food[this.name].name + (this.qty ? this.qty : ''); },
		SPECIFIC = function (name, qty) { return {name: name, qty: qty || null, test: SPECIFICTest, toString: SPECIFICString}; }, //disallows cooked/uncooked variant
		TAGTest = function (cooker, names, tags) { return tags[this.tag]; },
		TAGString = function () { return this.tag + (this.qty ? this.qty : ''); },
		TAG = function (tag, qty) { return {tag: tag, qty: qty || null, test: TAGTest, toString: TAGString}; },
		recipes = {
			butterflymuffin: {
				name: 'Butter Muffin',
				test: function(cooker, names, tags) {
					return names.butterflywings && tags.veggie;
				},
				requires: 'Butterfly Wings, veggie',
				requirements: [NAME('butterflywings'), TAG('veggie')],
				priority: 1,
				weight: 1,
				foodtype: "veggie",
				health: healing_med,
				hunger: calories_large,
				perish: perish_slow,
				cooktime: 2
			},
			frogglebunwich: {
				name: 'Froggle Bunwich',
				test: function(cooker, names, tags) {
					return names.froglegs && !names.froglegs_cooked && tags.veggie;
				},
				requirements: [SPECIFIC('froglegs'), TAG('veggie')],
				priority: 1,
				foodtype: "meat",
				health: healing_med,
				hunger: calories_large,
				perish: perish_slow,
				cooktime: 2
			},
			stuffedeggplant: {
				name: 'Stuffed Eggplant',
				test: function(cooker, names, tags) {
					return names.eggplant && tags.veggie && tags.veggie > 1;
				},
				requirements: [NAME('eggplant'), TAG('veggie', '>1')],
				priority: 1,
				foodtype: "veggie",
				health: healing_small,
				hunger: calories_large,
				perish: perish_slow,
				cooktime: 2
			},
			fishsticks: {
				name: 'Fishsticks',
				test: function(cooker, names, tags) {
					return tags.fish && names.twigs;
				},
				requirements: [TAG('fish'), NAME('twigs')],
				priority: 10,
				foodtype: "meat",
				health: healing_large,
				hunger: calories_large,
				perish: perish_med,
				cooktime: 2
			},
			honeynuggets: {
				name: 'Honey Nuggets',
				test: function(cooker, names, tags) {
					return names.honey && tags.meat && tags.meat <= 1.5;
				},
				requirements: [NAME('honey'), TAG('meat', '<=1.5')],
				priority: 2,
				foodtype: "meat",
				health: healing_med,
				hunger: calories_huge,
				perish: perish_slow,
				cooktime: 2
			},
			honeyham: {
				name: 'Honey Ham',
				test: function(cooker, names, tags) {
					return names.honey && tags.meat && tags.meat > 1.5;
				},
				requirements: [NAME('honey'), TAG('meat', '>1.5')],
				priority: 2,
				foodtype: "meat",
				health: healing_huge,
				hunger: calories_huge,
				perish: perish_slow,
				cooktime: 2
			},
			dragonpie: {
				name: 'Dragonpie',
				test: function(cooker, names, tags) {
					return (names.dragonfruit || names.dragonfruit_cooked) && !tags.meat;
				},
				requirements: [NAME('dragonfruit'), NOT(TAG('meat'))],
				priority: 1,
				foodtype: "veggie",
				health: healing_huge,
				hunger: calories_huge,
				perish: perish_slow,
				cooktime: 2
			},
			kabobs: {
				name: 'Kabobs',
				test: function(cooker, names, tags) {
					return tags.meat && names.twigs;
				},
				requirements: [TAG('meat'), NAME('twigs')],
				priority: 5,
				foodtype: "meat",
				health: healing_small,
				hunger: calories_large,
				perish: perish_slow,
				cooktime: 2
			},
			mandrakesoup: {
				name: 'Mandrake Soup',
				test: function(cooker, names, tags) {
					return names.mandrake;
				},
				requirements: [SPECIFIC('mandrake')],
				priority: 10,
				foodtype: "veggie",
				health: healing_superhuge,
				hunger: calories_superhuge,
				perish: perish_fast,
				cooktime: 3
			},
			baconeggs: {
				name: 'Bacon and Eggs',
				test: function(cooker, names, tags) {
					return tags.egg && tags.egg > 1 && tags.meat && 1 < tags.meat && !tags.veggie;
				},
				requirements: [TAG('egg', '>1'), TAG('meat', '>1'), NOT(TAG('veggie'))],
				priority: 10,
				foodtype: "meat",
				health: healing_huge,
				hunger: calories_huge,
				perish: perish_preserved,
				cooktime: 2
			},
			meatballs: {
				name: 'Meatballs',
				test: function(cooker, names, tags) {
					return tags.meat;
				},
				requirements: [TAG('meat')],
				priority: -1,
				foodtype: "meat",
				health: healing_small * 5,
				hunger: calories_small * 5,
				perish: perish_med,
				cooktime: 0.75
			},
			bonestew: {
				name: 'Meaty Stew',
				test: function(cooker, names, tags) {
					return tags.meat && tags.meat >= 3;
				},
				requirements: [TAG('meat', '>=3')],
				priority: 0,
				foodtype: "meat",
				health: healing_med,
				hunger: calories_large * 4,
				perish: perish_med,
				cooktime: 0.75
			},
			perogies: {
				name: 'Pierogi',
				test: function(cooker, names, tags) {
					return tags.egg && tags.meat && tags.veggie;
				},
				requirements: [TAG('egg'), TAG('meat'), TAG('veggie')],
				priority: 5,
				foodtype: "meat",
				health: healing_large,
				hunger: calories_large,
				perish: perish_preserved,
				cooktime: 1
			},
			turkeydinner: {
				name: 'Turkey Dinner',
				test: function(cooker, names, tags) {
					return names.drumstick && names.drumstick > 1 && tags.meat && 1 < tags.meat && (tags.veggie || tags.fruit);
				},
				requirements: [SPECIFIC('drumstick', '>1'), TAG('meat', '>1'), OR(TAG('veggie'), TAG('fruit'))],
				priority: 10,
				foodtype: "meat",
				health: healing_med,
				hunger: calories_huge,
				perish: perish_fast,
				cooktime: 3
			},
			ratatouille: {
				name: 'Ratatouille',
				test: function(cooker, names, tags) {
					return tags.veggie;
				},
				requirements: [TAG('veggie')],
				priority: 0,
				foodtype: "veggie",
				health: healing_med,
				hunger: calories_med,
				perish: perish_slow,
				cooktime: 1
			},
			jammypreserves: {
				name: 'Fist Full of Jam',
				test: function(cooker, names, tags) {
					return tags.fruit && !tags.veggie;
				},
				requirements: [TAG('fruit'), NOT(TAG('veggie'))],
				priority: 0,
				foodtype: "veggie",
				health: healing_med,
				hunger: calories_small * 3,
				perish: perish_slow,
				cooktime: 0.5
			},
			fruitmedley: {
				name: 'Fruit Medley',
				test: function(cooker, names, tags) {
					return tags.fruit && !tags.veggie;
				},
				requirements: [TAG('fruit'), NOT(TAG('veggie'))],
				priority: 0,
				foodtype: "veggie",
				health: healing_huge,
				hunger: calories_med,
				perish: perish_fast,
				cooktime: 0.5
			},
			fishtacos: {
				name: 'Fish Tacos',
				test: function(cooker, names, tags) {
					return tags.fish && (names.corn || names.corn_cooked);
				},
				requirements: [TAG('fish'), NAME('corn')],
				priority: 10,
				foodtype: "meat",
				health: healing_huge,
				hunger: calories_large,
				perish: perish_fast,
				cooktime: 0.5
			},
			waffles: {
				name: 'Waffles',
				test: function(cooker, names, tags) {
					return names.butter && (names.berries || names.berries_cooked) && tags.egg;
				},
				requirements: [NAME('butter'), NAME('berries'), TAG('egg')],
				priority: 10,
				foodtype: "veggie",
				health: healing_huge,
				hunger: calories_large,
				perish: perish_fast,
				cooktime: 0.5
			},
			monsterlasagna: {
				name: 'Monster Lasagna',
				test: function(cooker, names, tags) {
					return tags.monster && tags.monster >= 2;
				},
				requirements: [TAG('monster', '>=2')],
				priority: 10,
				foodtype: "meat",
				health: -healing_tiny,
				hunger: calories_large,
				perish: perish_med,
				cooktime: 0.5
			},
			wetgoop: {
				name: 'Wet Goop',
				test: function(cooker, names, tags) {
					return true;
				},
				requirements: [],
				priority: -2,
				health: 0,
				hunger: 0,
				perish: perish_fast,
				cooktime: 0.25
			}
		},
		output = [], i, index,
		matchingNames = (function () {
			var name,
				anywhere,
				filter = function (element) {
					if (element.uncookable) {
						element.match = 0;
					} else if (element.lowerName.indexOf(name) === 0) {
						element.match = 1;
					} else if (anywhere.test(element.lowerName)) {
						element.match = 2;
					} else {
						element.match = 0;
					}
					return element.match;
				},
				byMatch = function (a, b) {
					var aname, bname;
					if (a.match === b.match) {
						aname = a.raw ? a.raw.name : a.name;
						bname = b.raw ? b.raw.name : b.name;
						if (aname !== bname) {
							return aname > bname ? 1 : aname < bname ? -1 : 0;
						}
						return a.name === b.name ? 0 : a.raw === b ? 1 : -1;
					}
					return a.match - b.match;
				};
			return function (arr, search) {
				name = search.toLowerCase();
				anywhere = new RegExp('\\b' + name.split('').join('.*') + '.*');
				return arr.filter(filter).sort(byMatch);
			};
		}()),
		getSuggestions = (function () {
			var recipeList = [],
				names,
				tags,
				setIngredientValues = function (items) {
					var i, k, item;
					names = {};
					tags = {};
					for (i = 0; i < items.length; i++) {
						item = items[i];
						if (item !== null) {
							names[item.id] = 1 + (names[item.id] || 0);
							for (k in item) {
								if (item.hasOwnProperty(k) && k !== 'perish') {
									tags[k] = item[k] + (tags[k] || 0);
								} else if (k === 'perish') {
									tags[k] = Math.min(tags[k] || perish_preserved, item[k]);
								}
							}
						}
					}
				};
			return function (items, exclude, itemComplete) {
				var i, ii, valid;
				recipeList.length = 0;
				setIngredientValues(items);
				for (i = 0; i < recipes.length; i++) {
					valid = false;
					for (ii = 0; ii < recipes[i].requirements.length; ii++) {
						if (recipes[i].requirements[ii].test(null, names, tags)) {
							if (!recipes[i].requirements[ii].cancel) {
								valid = true;
							}
						} else if (!itemComplete && recipes[i].requirements[ii].cancel) {
							valid = false;
							break;
						} else if (itemComplete && !recipes[i].requirements[ii].cancel) {
							valid = false;
							break;
						}
					}
					//valid && recipeList.push(recipes[i]);
					valid && (!exclude || exclude.indexOf(recipes[i]) === -1) && recipeList.push(recipes[i]);
					//recipes[i].test(null, names, tags) && recipeList.push(recipes[i]);
				}
				recipeList.sort(function (a, b) {
					return b.priority - a.priority;
				});
				tags.img = '';
				tags.name = 'Combined';
				//recipeList.unshift(tags);
				return recipeList;
			};
		}()),
		getRecipes = (function () {
			var recipeList = [],
				names,
				tags,
				setIngredientValues = function (items) {
					var i, k, item;
					names = {};
					tags = {};
					for (i = 0; i < items.length; i++) {
						item = items[i];
						if (item !== null) {
							names[item.id] = 1 + (names[item.id] || 0);
							for (k in item) {
								if (item.hasOwnProperty(k) && k !== 'perish') {
									tags[k] = item[k] + (tags[k] || 0);
								} else if (k === 'perish') {
									tags[k] = Math.min(tags[k] || perish_preserved, item[k]);
								}
							}
						}
					}
				};
			return function (items) {
				var i;
				recipeList.length = 0;
				setIngredientValues(items);
				for (i = 0; i < recipes.length; i++) {
					recipes[i].test(null, names, tags) && recipeList.push(recipes[i]);
				}
				recipeList.sort(function (a, b) {
					return b.priority - a.priority;
				});
				tags.img = '';
				tags.name = 'Combined';
				recipeList.unshift(tags);
				return recipeList;
			};
		}()),
		index = 0,
		mainElement = document.getElementById('main'),
		foodElement = document.getElementById('food'),
		recipesElement = document.getElementById('recipes'),
		fragment, navbar = document.getElementById('navbar');

	var info = [];
	for (i in food) {
		if (food.hasOwnProperty(i)) {
			food[i].match = 0;
			food[i].lowerName = food[i].name.toLowerCase();
			food[i].id = i;
			food[i].img = 'img/' + food[i].name.replace(/ /g, '_').toLowerCase() + '.png';
			info.length = 0;
			if (i.indexOf('_cooked') !== -1) {
				food[i].cooked = true;
			}
			if (food[i + '_cooked']) {
				food[i].cook = food[i + '_cooked'];
				food[i + '_cooked'].raw = food[i];
			}
			food[i].fruit && info.push('fruit' + (food[i].fruit === 1 ? '' : ' (' + food[i].fruit + ')'));
			food[i].veggie && info.push('vegetable' + (food[i].veggie === 1 ? '' : ' (' + food[i].veggie + ')'));
			food[i].meat && info.push('meat' + (food[i].meat === 1 ? '' : ' (' + food[i].meat + ')'));
			food[i].egg && info.push('egg' + (food[i].egg === 1 ? '' : ' (' + food[i].egg + ')'));
			food[i].fish && info.push('fish');
			food[i].magic && info.push('magic');
			food[i].decoration && info.push('decoration');
			food[i].inedible && info.push('inedible');
			food[i].monster && info.push('monster food');
			food[i].sweetener && info.push('sweetener');
			food[i].fat && info.push('fat');
			food[i].dairy && info.push('dairy');
			food[i].cooked && info.push('cooked ' + food[i].raw.name);
			food[i].cook && info.push('cook into ' + food[i].cook.name);
			food[i].uncookable && info.push('cannot be added to crock pot');
			food[i].info = info.join('; ');
			food[index++] = food[i];
		}
	}
	food.length = index;
	food.forEach = Array.prototype.forEach;
	food.filter = Array.prototype.filter;
	food.sort = Array.prototype.forEach;
	index = 0;
	for (i in recipes) {
		if (recipes.hasOwnProperty(i)) {
			recipes[i].match = 0;
			recipes[i].name = recipes[i].name || i;
			recipes[i].id = i;
			recipes[i].lowerName = recipes[i].name.toLowerCase();
			recipes[i].weight = recipes[i].weight || 1;
			recipes[i].priority = recipes[i].priority || 0;
			recipes[i].img = 'img/' + recipes[i].name.replace(/ /g, '_').toLowerCase() + '.png';
			if (recipes[i].requirements) {
				recipes[i].requires = recipes[i].requirements.join('; ');
			}
			recipes[index++] = recipes[i];
		}
	}
	recipes.length = index;
	recipes.forEach = Array.prototype.forEach;
	recipes.filter = Array.prototype.filter;
	recipes.sort = Array.prototype.sort;
	
	//output.push('{| class="wikitable sortable"\n! width=145px |Name\n! width=40px |Health\n! width=50px |Food\n! width=60px |Perish\n|');

	(function () {
		var navtabs = navbar.getElementsByTagName('li'),
			tabs = {},
			elements = {},
			activeIndex = 0,
			activePage,
			activeTab,
			showTab = function (e) {
				activeTab.className = '';
				activeTab = tabs[e.target.dataset.tab];
				activePage.style.display = 'none';
				activePage = elements[e.target.dataset.tab];
				activeTab.className = 'selected';
				activePage.style.display = 'block';
			},
			navtab;
		for (i = 0; i < navtabs.length; i++) {
			navtab = navtabs[i];
			if (navtab.dataset.tab) {
				tabs[navtab.dataset.tab] = navtab;
				elements[navtab.dataset.tab] = document.getElementById(navtab.dataset.tab);
				elements[navtab.dataset.tab].style.display = 'none';
				navtab.addEventListener('click', showTab, false);
			}
		}
		activeTab = tabs['simulator'];
		activePage = elements['simulator'];
		activeTab.className = 'selected';
		activePage.style.display = 'block';
		/*
		//maybe add using the tab key to go between tabs some day
		document.body.addEventListener('keydown', function (e) {
			var tabKey = 9;
			if (e.keyCode === tabKey) {
				if (e.shiftKey) {

				} else {

				}
			}
		});
		*/
	}());

	var imgSize = '40px',
		cells = function (cellType) {
			var i, td, image, tr = document.createElement('tr'), cell;
			for (i = 1; i < arguments.length; i++) {
				td = document.createElement(cellType);
				cell = arguments[i] && arguments[i].indexOf ? arguments[i] : arguments[i].toString();
				if (cell.indexOf('img/') === 0) {
					image = new Image();
					image.src = cell;
					image.style.width = imgSize;
					image.style.height = imgSize;
					td.appendChild(image);
				} else {
					td.appendChild(document.createTextNode(cell));
				}
				tr.appendChild(td);
			}
			return tr;
		};
	var makeSortableTable = function (headers, dataset, rowGenerator, defaultSort, hasSummary) {
		var table, header, sorting = defaultSort, invertSort = false,
			create = function (e) {
				var tr, th, oldTable, sortBy, summary;
				if (e && e.target.dataset.sort !== '') {
					sortBy = e.target.dataset.sort;
					if (hasSummary) {
						summary = dataset.shift();
					}
					if (sortBy === 'name') {
						dataset.sort(function (a, b) {
							return b[sortBy] < a[sortBy] ? 1 : b[sortBy] > a[sortBy] ? -1 : 0;
						});
					} else {
						dataset.sort(function (a, b) {
							var sa = a[sortBy], sb = b[sortBy];
							return !isNaN(sa) && !isNaN(sb) ? sb - sa : isNaN(sa) && isNaN(sb) ? 0 : isNaN(sa) ? 1 : -1;
						});
					}
					if (sorting === sortBy) {
						invertSort = !invertSort;
					} else {
						sorting = sortBy;
						invertSort = false;
					}
					if (invertSort) {
						dataset.reverse();
					}
					if (hasSummary) {
						dataset.unshift(summary);
					}
				}
				tr = document.createElement('tr');
				for (header in headers) {
					th = document.createElement('th');
					th.appendChild(document.createTextNode(header));
					if (headers[header]) {
						if (headers[header] === sorting) {
							th.style.background = invertSort ? '#555' : '#ccc';
							th.style.color = invertSort ? '#ccc' : '#555';
							th.style.borderRadius = '4px';
						}
						th.style.cursor = 'pointer';
						th.dataset.sort = headers[header];
						th.addEventListener('click', create, false);
					}
					tr.appendChild(th);
				}
				oldTable = table;
				table = document.createElement('table');
				table.appendChild(tr);
				dataset.forEach(rowGenerator, table);
				if (oldTable) {
					oldTable.parentNode.replaceChild(table, oldTable);
				}
			};
		create();
		return table;
	};

	var sign = function (n) { return isNaN(n) ? '' : n > 0 ? '+' + n : n };
	var makeFoodRow = function (item) {
		return cells('td', item.img ? item.img : '', item.name, sign(item.health), sign(item.hunger), isNaN(item.perish) ? 'Never' : item.perish / total_day_time + ' days', item.info || '');
	};
	foodElement.appendChild(makeSortableTable(
		{'': '', 'Name': 'name', 'Health': 'health', 'Hunger': 'hunger', 'Perish': 'perish', 'Info': ''},
		Array.prototype.slice.call(food),
		function (item) {
			this.appendChild(makeFoodRow(item));
		},
		null
	));
	/*fragment = document.createDocumentFragment();
	fragment.appendChild(cells('th', '', 'Name', 'Health', 'Hunger', 'Perish', 'Info'));
	food.forEach(function (item) {
		fragment.appendChild(makeFoodRow(item));
		//output.push('-\n', '| ', item.name, '\n| ', isNaN(item.health) ? '' : item.health < 0 ? "'''" + item.health + "'''" : '+' + item.health, '\n| ', isNaN(item.hunger) ? '' : '+' + item.hunger, '\n| ', isNaN(item.perish) ? 'Never' : item.perish / total_day_time + ' days', '\n|');
	});
	foodElement.appendChild(fragment);*/
	//output.push('}');
	//var a = document.createElement('textarea');
	//a.value = output.join('');
	//document.body.appendChild(a);

	//output = [];
	//output.push('{| class="wikitable sortable"\n! width=145px |Name\n! width=40px |Health\n! width=50px |Food\n! width=60px |Cook time\n! width=60px |Perish\n|');
	var makeRecipeRow = function (item, health, hunger) {
		return cells('td', item.img ? item.img : '', item.name, sign(item.health) + (health && item.health !== health ? ' (' + ((item.health / health * 1000 | 0) / 10) + '%)' : ''), sign(item.hunger) + (hunger && item.hunger !== hunger ? ' (' + ((item.hunger / hunger * 1000 | 0) / 10) + '%)' : ''), (item.cooktime * base_cook_time + 0.5 | 0) + ' secs', isNaN(item.perish) ? 'Never' : item.perish / total_day_time + ' days', item.priority || '0', item.requires || '');
	};
	recipesElement.appendChild(makeSortableTable(
		{'': '', 'Name': 'name', 'Health': 'health', 'Hunger': 'hunger', 'Cook Time': 'cooktime', 'Perish': 'perish', 'Priority': 'priority', 'Requires': ''},
		Array.prototype.slice.call(recipes),
		function (item) {
			this.appendChild(makeRecipeRow(item));
		},
		null
	));
	/*fragment = document.createDocumentFragment();
	fragment.appendChild(cells('th', '', 'Name', 'Health', 'Hunger', 'Cook Time', 'Perish', 'Priority', 'Requires'));
	recipes.forEach(function (item) {
		fragment.appendChild(makeRecipeRow(item));
		//output.push('-\n', '| ', item.name, '\n| ', isNaN(item.health) ? '' : item.health < 0 ? "'''" + item.health + "'''" : '+' + item.health, '\n| ', isNaN(item.hunger) ? '' : '+' + item.hunger, '\n| ', (item.cooktime * base_cook_time + 0.5 | 0) + ' secs', '\n| ', isNaN(item.perish) ? 'Never' : item.perish / total_day_time + ' days', '\n|');
	});
	recipesElement.appendChild(fragment);*/
	//output.push('}');
	//a = document.createElement('textarea');
	//a.value = output.join('');
	//document.body.appendChild(a);
	window.food = food;
	window.recipes = recipes;
	window.matchingNames = matchingNames;
	var slotItemCSS = '\') center center / 64px 64px, ',
		slotBackgroundCSS = 'url(\'img/background.png\') 0px 0px / 100% 100%',
		setSlot = function (slotElement, item) {
			var end = false;
			if (item !== null) {
				slotElement.dataset.id = item.id;
			} else {
				if (slotElement.nextSibling && getSlot(slotElement.nextSibling) !== null) {
					setSlot(slotElement, getSlot(slotElement.nextSibling));
					setSlot(slotElement.nextSibling, null);
					end = true;
				} else {
					slotElement.dataset.id = null;
				}
			}
			if (!end) {
				if (item !== null) {
					slotElement.style.background = 'url(\'' + item.img + slotItemCSS + slotBackgroundCSS;
				} else {
					slotElement.style.background = slotBackgroundCSS;
				}
			}
		},
		getSlot = function (slotElement) {
			return food[slotElement.dataset.id] || recipes[slotElement.dataset.id] || null;
		};
	(function () {
		var pickers = document.getElementsByClassName('ingredientpicker'),
			i = pickers.length;
		while (i--) {
			(function () {
				var dropdown = document.createElement('div'),
					ul = document.createElement('ul'),
					picker = pickers[i],
					index = i,
					state,
					from = picker.dataset.type === 'recipes' ? recipes : food,
					parent = picker.parentNode,
					slots = parent.getElementsByClassName('ingredient'),
					limited,
					updateRecipes,
					results = document.getElementById('results'),
					discover = document.getElementById('discover'),
					displaying = false,
					appendSlot = function (id) {
						var i, item = food[id] || recipes[id] || null;
						if (limited) {
							for (i = 0; i < slots.length; i++) {
								if (getSlot(slots[i]) === null) {
									setSlot(slots[i], item);
									updateRecipes();
									return i;
								}
							}
							return -1;
						} else {
							if (slots.indexOf(id) === -1) {
								slots.push(id);
								i = document.createElement('span');
								i.className = 'ingredient';
								setSlot(i, item);
								i.addEventListener('click', removeSlot, false);
								parent.appendChild(i);
								updateRecipes();
								return 1;
							}
							return 1;
						}
					},
					pickItem = function (e) {
						var names,
							result = appendSlot(e.target.dataset.id);
						if (result !== -1) {
							dropdown.removeChild(ul);
							ul = document.createElement('ul');
							names = matchingNames(from, '');
							names.forEach(liIntoPicker, ul);
							dropdown.appendChild(ul);
							picker.value = '';
							if (result < slots.length - 1 || !limited) {
								picker.focus();
							} else {
								picker.blur();
							}
							e && e.preventDefault && e.preventDefault();
							refreshLocation();
						}
					},
					liIntoPicker = function (item) {
						var img = new Image(),
							li = document.createElement('li');
						img.src = item.img;
						li.appendChild(img);
						li.appendChild(document.createTextNode(item.name));
						li.dataset.id = item.id;
						li.addEventListener('mousedown', pickItem, false);
						this.appendChild(li);
					},
					removeSlot = function (e) {
						if (limited) {
							if (getSlot(e.target) !== null) {
								setSlot(e.target, null);
								updateRecipes();
							} else {
								picker.focus();
							}
						} else {
							slots.splice(slots.indexOf(e.target.dataset.id), 1);
							parent.removeChild(e.target);
							updateRecipes();
						}
					},
					refreshLocation = function () {
						if (mainElement.offsetLeft - dropdown.offsetWidth > 0) {
							dropdown.style.left = -dropdown.offsetWidth + 'px';
							dropdown.style.top = picker.offsetTop + 'px';
						} else {
							dropdown.style.left = picker.offsetLeft + picker.offsetWidth + 'px';
							dropdown.style.top = picker.offsetTop + 'px';
						}
					};
				if (parent.id === 'ingredients') {
					updateRecipes = function () {
						var ingredients,
							recipes,
							health, hunger,
							table;
						ingredients = Array.prototype.map.call(slots, function (slot) {
							return getSlot(slot);
						});
						recipes = getRecipes(ingredients);
						health = recipes[0].health;
						hunger = recipes[0].hunger;
						//table.appendChild(cells('th', '', 'Name', 'Health', 'Hunger', 'Cook Time', 'Perish', 'Priority', 'Requires'));
						//recipes.forEach(function (item) {
						//	table.appendChild(makeRecipeRow(item, health, hunger));
						//});
						table = makeSortableTable(
							{'': '', 'Name': 'name', 'Health': 'health', 'Hunger': 'hunger', 'Cook Time': 'cooktime', 'Perish': 'perish', 'Priority': 'priority', 'Requires': ''},
							recipes,
							function (item) {
								this.appendChild(makeRecipeRow(item, health, hunger));
							},
							'priority',
							true
						);
						if (results.firstChild) {
							results.removeChild(results.firstChild);
						}
						if (results.firstChild) {
							results.removeChild(results.firstChild);
							results.removeChild(results.firstChild);
						}
						results.appendChild(table);
						if (ingredients[0] !== null) {
							recipes = getSuggestions(ingredients, recipes);
							if (recipes.length > 0) {
								results.appendChild(document.createTextNode('Add more ingredients to make:'));
								/*table = document.createElement('table')
								table.appendChild(cells('th', '', 'Name', 'Health', 'Hunger', 'Cook Time', 'Perish', 'Priority', 'Requires'));
								recipes.forEach(function (item) {
									table.appendChild(makeRecipeRow(item, health, hunger));
								});*/
								table = makeSortableTable(
									{'': '', 'Name': 'name', 'Health': 'health', 'Hunger': 'hunger', 'Cook Time': 'cooktime', 'Perish': 'perish', 'Priority': 'priority', 'Requires': ''},
									recipes,
									function (item) {
										this.appendChild(makeRecipeRow(item, health, hunger));
									},
									'priority'
								);
								results.appendChild(table);
							}
						}
					};
				} else if (parent.id === 'inventory') {
					updateRecipes = function () {
						var ingredients,
							recipes,
							table;
						ingredients = Array.prototype.map.call(parent.getElementsByClassName('ingredient'), function (slot) {
							return getSlot(slot);
						});
						if (discover.firstChild) {
							discover.removeChild(discover.firstChild);
						}
						if (ingredients.length > 0) {
							recipes = getSuggestions(ingredients, null, true);
							if (recipes.length > 0) {
								/*table = document.createElement('table');
								table.appendChild(cells('th', '', 'Name', 'Health', 'Hunger', 'Cook Time', 'Perish', 'Priority', 'Requires'));
								recipes.forEach(function (item) {
									table.appendChild(makeRecipeRow(item));
								});*/
								table = makeSortableTable(
									{'': '', 'Name': 'name', 'Health': 'health', 'Hunger': 'hunger', 'Cook Time': 'cooktime', 'Perish': 'perish', 'Priority': 'priority', 'Requires': ''},
									recipes,
									function (item) {
										this.appendChild(makeRecipeRow(item));
									},
									'priority'
								)
								discover.appendChild(table);
							}
						}
					};
				} else {
					console.log('error: no update function implemented for ' + parent.id);
					//alert('error: no update function implemented for ' + parent.id);
				}
				if (slots.length !== 0) {
					limited = true;
					Array.prototype.forEach.call(slots, function (slot) {
						setSlot(slot, null);
						slot.addEventListener('click', removeSlot, false);
					});
				} else {
					slots = [];
					limited = false;
				}
				if (window.localStorage && localStorage.foodGuideState) {
					state = JSON.parse(localStorage.foodGuideState);
					if (state[index]) {
						state[index].forEach(function (id) {
							appendSlot(id);
						});
					}
				}
				dropdown.className = 'ingredientdropdown';
				dropdown.appendChild(ul);
				(function () {
					var li = document.createElement('li'),
						names = matchingNames(from, picker.value);
					dropdown.removeChild(ul);
					ul = document.createElement('ul');
					names.forEach(liIntoPicker, ul);
					dropdown.appendChild(ul);
				}());
				picker.addEventListener('keydown', function (e) {
					var up = 38, down = 40, enter = 13, current, items, i;
					items = ul.getElementsByTagName('li');
					for (i = 0; i < items.length; i++) {
						if (items[i].className === 'selected') {
							current = items[i];
							items[i].className = '';
							if (e.keyCode === up) {
								items[i - 1 < 0 ? items.length - 1 : i - 1].className = 'selected';
							} else if (e.keyCode === down) {
								items[(i + 1) % items.length].className = 'selected';
							} else if (e.keyCode === enter && current) {
								pickItem({target: current});
								refreshLocation();
							}
							break;
						}
					}
					if (!current && items.length > 0) {
						if (e.keyCode === up) {
							items[items.length - 1].className = 'selected';
						} else if (e.keyCode === down) {
							items[0].className = 'selected';
						} else if (e.keyCode === enter) {
							pickItem({target: items[0]});
						}
					}
				}, false);
				picker.addEventListener('keyup', function (e) {
					var movement = [16, 17, 37, 38, 39, 40, 13];
					if (movement.indexOf(e.keyCode) === -1) {
						var li = document.createElement('li'),
							names = matchingNames(from, picker.value);
						dropdown.removeChild(ul);
						ul = document.createElement('ul');
						names.forEach(liIntoPicker, ul);
						dropdown.appendChild(ul);
						refreshLocation();
					}
				}, false);
				picker.addEventListener('focus', function () {
					if (!displaying) {
						displaying = true;
						parent.appendChild(dropdown);
						refreshLocation();
					}
				}, false);
				picker.addEventListener('blur', function () {
					if (displaying) {
						displaying = false;
						parent.removeChild(dropdown);
					}
				}, false);
				updateRecipes();
				window.addEventListener('beforeunload', function () {
					var obj, serialized;
					if (window.localStorage) {
						if (!localStorage.foodGuideState) {
							localStorage.foodGuideState = '[]';
						}
						obj = JSON.parse(localStorage.foodGuideState);
						if (limited) {
							serialized = [];
							serialized = Array.prototype.map.call(slots, function (slot) {
								var item = getSlot(slot);
								return item ? item.id : null;
							});
							obj[index] = serialized;
						} else {
							obj[index] = slots;
						}
						localStorage.foodGuideState = JSON.stringify(obj);
					}
				});
			}());
		}
	}())
}());