var id_cache = [];



var generateID = function(){
	var id = "";
	for(var i = 0; i < 10; i++){
		id += Math.floor(Math.random() * 10);
	}
	
	for(var i = 0; i < id_cache.length; i++){
		if(id == id_cache[i]){
			id = "";
			for(var j = 0; j < 10; j++){
				id += Math.floor(Math.random() * 10);
			}
			i=0;
		}
	}
	id_cache.push(id);
	return id;
}

Vue.component('stack', {
	props: ['stack'],
	template: `
			<div class="stack_div" style="border: black 1px solid;">
				<div class="drag-el stack_drag_area"
					style="border: black 1px solid;"
					draggable
					@dragstart='startDrag($event, stack, "stack")'>
					Drag
				</div>
				<div v-for="card in stack.cards">
					<img
						v-bind:class='{ tapped: stack.isTapped, "drag-el": true }'
						v-bind:src='getLink(card.name,card.link_i)'
						@mouseover='onCardHover($event, getLink(card.name,card.link_i))'
						draggable
						@dragstart='startDrag($event, card, "card")'
						/>
					<button v-on:click="flipCard(card.id)">Flip</button>
				</div>
						
				<input v-model="stack.notes"/>
				<button v-on:click="tapStack(stack.id)">{{ stack.isTapped ? "Untap" : "Tap" }}</button>
				<div
					@drop='onDrop($event,  stack.player, stack.zone, stack.id, "stack")'
					@dragover.prevent
					@dragenter.prevent
				>
					drop here to add to stack
				</div>
			</div>
			`,
	methods: {
		flipCard: function(id){
			if(this.$parent.$parent == undefined){
				this.$parent.flipCard(id);
			}else{
				this.$parent.$parent.flipCard(id);
			}
		},
		tapStack: function(id){
			if(this.$parent.$parent == undefined){
				this.$parent.tapStack(id);
			}else{
				this.$parent.$parent.tapStack(id);
			}
		},
		startDrag: function(evt, item, type){
			if(this.$parent.$parent == undefined){
				this.$parent.startDrag(evt, item, type);
			}else{
				this.$parent.$parent.startDrag(evt, item, type);
			}
		},
		onDrop: function(evt, player, zone, stackID, dropType){
			if(this.$parent.$parent == undefined){
				this.$parent.onDrop(evt, player, zone, stackID, dropType);
			}else{
				this.$parent.$parent.onDrop(evt, player, zone, stackID, dropType);
			}
		},
		onCardHover: function(evt, link_str){
			if(this.$parent.$parent == undefined){
				this.$parent.onCardHover(evt, link_str);
			}else{
				this.$parent.$parent.onCardHover(evt, link_str);
			}
		},
		getLink: function(cardname, i){
			if(this.$parent.$parent == undefined){
				return this.$parent.scry_cache[cardname][i];
			}else{
				return this.$parent.$parent.scry_cache[cardname][i];
			}
		},
	},	
			
});

Vue.component('opponentstack', {
	props: ['stack'],
	template: `
			<div class="stack_div" style="border: black 1px solid;">
				<div class="drag-el stack_drag_area"
					style="border: black 1px solid;"
					draggable
					@dragstart='startDrag($event, stack, "stack")'>
					Drag
				</div>
				<div v-for="card in stack.cards">
					<img
						v-bind:class='{ tapped: stack.isTapped, "drag-el": true }'
						v-bind:src='getLink(card.name,card.link_i)'
						@mouseover='onCardHover($event, getLink(card.name,card.link_i))'
						draggable
						@dragstart='startDrag($event, card, "card")'
						/>
				</div>
			</div>
			`,
	methods: {
		flipCard: function(id){
			if(this.$parent.$parent == undefined){
				this.$parent.flipCard(id);
			}else{
				this.$parent.$parent.flipCard(id);
			}
		},
		tapStack: function(id){
			if(this.$parent.$parent == undefined){
				this.$parent.tapStack(id);
			}else{
				this.$parent.$parent.tapStack(id);
			}
		},
		startDrag: function(evt, item, type){
			if(this.$parent.$parent == undefined){
				this.$parent.startDrag(evt, item, type);
			}else{
				this.$parent.$parent.startDrag(evt, item, type);
			}
		},
		onDrop: function(evt, player, zone, stackID, dropType){
			if(this.$parent.$parent == undefined){
				this.$parent.onDrop(evt, player, zone, stackID, dropType);
			}else{
				this.$parent.$parent.onDrop(evt, player, zone, stackID, dropType);
			}
		},
		onCardHover: function(evt, link_str){
			if(this.$parent.$parent == undefined){
				this.$parent.onCardHover(evt, link_str);
			}else{
				this.$parent.$parent.onCardHover(evt, link_str);
			}
		},
		getLink: function(cardname, i){
			if(this.$parent.$parent == undefined){
				return this.$parent.scry_cache[cardname][i];
			}else{
				return this.$parent.$parent.scry_cache[cardname][i];
			}
		},
	},	
			
});


Vue.component('playerpanel', {
	props: ['players','scry_cache','stacks','player_i'],
	template: `
		<div class="playerpanel_div">
			<div 
					class='drop-zone zone_div creatures_div'
					@drop='onDrop($event,  player_i, "creatures", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<stack
						v-for="stack in creatures"
						v-bind:stack="stack"
						v-bind:scry_cache="scry_cache"
						v-bind:key="stack.id"
						v-bind:player_i="player_i"
					></stack>
			</div>
			<div
					class='drop-zone zone_div enchantments_div'
					@drop='onDrop($event,  player_i, "enchantments", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<stack
						v-for="stack in enchantments"
						v-bind:stack="stack"
						v-bind:scry_cache="scry_cache"
						v-bind:key="stack.id"
					></stack>
			</div>
			<div
					class='drop-zone zone_div lands_div'
					@drop='onDrop($event,  player_i, "lands", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<stack
						v-for="stack in lands"
						v-bind:stack="stack"
						v-bind:key="stack.id"
						v-bind:scry_cache="scry_cache"
					></stack>
			</div>
			<div
					class='drop-zone zone_div hand_div'
					@drop='onDrop($event,  player_i, "hand", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<stack
						v-for="stack in hand"
						v-bind:stack="stack"
						v-bind:key="stack.id"
						v-bind:scry_cache="scry_cache"
					></stack>
			</div>
			<div class="library_div zone_div">
				<div class="drop-zone bordered"
					@drop='onDrop($event,  player_i, "top", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					top
				</div>
				<div class="drop-zone bordered"
					@drop='onDrop($event,  player_i, "bottom", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					bottom
				</div>
				Library
				Count:{{ library.length }}
				<button v-on:click="drawCard(player_i)">Draw Card</button>
				<button v-on:click="viewLibrary()">View Library</button>
				<button v-on:click="shuffleLibrary()">Shuffle Library</button>
			</div>
			<div class='drop-zone graveyard_div zone_div'
				@drop='onDrop($event,  player_i, "graveyard", null, "zone")'
				@dragover.prevent
				@dragenter.prevent>
				Graveyard
				Count:{{ graveyard.length }}
				<button v-on:click="viewGraveyard()">View Graveyard</button>
			</div>
			<div class='drop-zone exile_div zone_div'
				@drop='onDrop($event,  player_i, "exile", null, "zone")'
				@dragover.prevent
				@dragenter.prevent>
				Exile
				Count:{{ exile.length }}
				<button v-on:click="viewExile()">View Exile</button>
			</div>
			<div class='drop-zone sideboard_div zone_div'
				@drop='onDrop($event,  player_i, "sideboard", null, "zone")'
				@dragover.prevent
				@dragenter.prevent>
				Sideboard
				Count:{{ sideboard.length }}
				<button v-on:click="viewSideboard()">View Sideboard</button>
			</div>
			<div class='drop-zone command_div zone_div'
				@drop='onDrop($event,  player_i, "command", null, "zone")'
				@dragover.prevent
				@dragenter.prevent>
				Command
				Count:{{ sideboard.length }}
				<button v-on:click="viewSideboard()">View Command</button>
			</div>
			<div class='drop-zone trash_div zone_div'
				@drop='onDrop($event,  player_i, "trash", null, "zone")'
				@dragover.prevent
				@dragenter.prevent>
				Trash
			</div>
		</div>`,
	methods: {
		
		onDrop: function(evt, player, zone, stackID, dropType){
			this.$parent.onDrop(evt, player, zone, stackID, dropType);
		},
		viewLibrary: function(){
			this.$parent.viewLibrary();
		},
		shuffleLibrary: function(){
			this.$parent.shuffleLibrary();
		},
		viewGraveyard: function(){
			this.$parent.viewGraveyard();
		},
		viewExile: function(){
			this.$parent.viewExile();
		},
		viewSideboard: function(){
			this.$parent.viewSideboard();
		},
		viewCommand: function(){
			this.$parent.viewCommand();
		},
		drawCard: function(player_i){
			this.$parent.drawCard(player_i);
		},
	},		
	computed: {
		graveyard () {
		  return this.stacks.filter(item => item.zone === "graveyard" && item.player === this.player_i)
		},
		exile () {
		  return this.stacks.filter(item => item.zone === "exile" && item.player === this.player_i)
		},
		library () {
		  return this.stacks.filter(item => item.zone === "library" && item.player === this.player_i)
		},
		command () {
		  return this.stacks.filter(item => item.zone === "command" && item.player === this.player_i)
		},
		sideboard () {
		  return this.stacks.filter(item => item.zone === "sideboard" && item.player === this.player_i)
		},
		hand () {
		  return this.stacks.filter(item => item.zone === "hand" && item.player === this.player_i)
		},
		creatures () {
		  return this.stacks.filter(item => item.zone === "creatures" && item.player === this.player_i)
		},
		enchantments () {
		  return this.stacks.filter(item => item.zone === "enchantments" && item.player === this.player_i)
		},
		lands () {
		  return this.stacks.filter(item => item.zone === "lands" && item.player === this.player_i)
		},
	},		
});

Vue.component('opponentpanel', {
	props: ['players','scry_cache','stacks','player_i'],
	template: `
		<div class="opponentpanel_div">
			<span class="opponent_info_span">{{ 
				"Player:" + (player_i + 1) + 
				"  |  Library:" + library.length +
				"  |  Hand:" + hand.length +
				"  |  Graveyard:" + graveyard.length +
				"  |  Exile:" + exile.length
				
			}}</span>
			<div 
					class='drop-zone zone_div opponent_creatures_div'
					@drop='onDrop($event,  player_i, "creatures", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<opponentstack
						v-for="stack in creatures"
						v-bind:stack="stack"
						v-bind:scry_cache="scry_cache"
						v-bind:key="stack.id"
						v-bind:player_i="player_i"
					></opponentstack>
			</div>
			<div
					class='drop-zone zone_div opponent_enchantments_div'
					@drop='onDrop($event,  player_i, "enchantments", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<opponentstack
						v-for="stack in enchantments"
						v-bind:stack="stack"
						v-bind:scry_cache="scry_cache"
						v-bind:key="stack.id"
					></opponentstack>
			</div>
			<div
					class='drop-zone zone_div opponent_lands_div'
					@drop='onDrop($event,  player_i, "lands", null, "zone")'
					@dragover.prevent
					@dragenter.prevent>
					<opponentstack
						v-for="stack in lands"
						v-bind:stack="stack"
						v-bind:key="stack.id"
						v-bind:scry_cache="scry_cache"
					></opponentstack>
			</div>
		</div>`,
	methods: {
		
		onDrop: function(evt, player, zone, stackID, dropType){
			this.$parent.onDrop(evt, player, zone, stackID, dropType);
		},
		viewLibrary: function(){
			this.$parent.viewLibrary();
		},
		shuffleLibrary: function(){
			this.$parent.shuffleLibrary();
		},
		viewGraveyard: function(){
			this.$parent.viewGraveyard();
		},
		viewExile: function(){
			this.$parent.viewExile();
		},
		viewSideboard: function(){
			this.$parent.viewSideboard();
		},
		viewCommand: function(){
			this.$parent.viewCommand();
		},
		drawCard: function(player_i){
			this.$parent.drawCard(player_i);
		},
	},		
	computed: {
		graveyard () {
		  return this.stacks.filter(item => item.zone === "graveyard" && item.player === this.player_i)
		},
		exile () {
		  return this.stacks.filter(item => item.zone === "exile" && item.player === this.player_i)
		},
		library () {
		  return this.stacks.filter(item => item.zone === "library" && item.player === this.player_i)
		},
		command () {
		  return this.stacks.filter(item => item.zone === "command" && item.player === this.player_i)
		},
		sideboard () {
		  return this.stacks.filter(item => item.zone === "sideboard" && item.player === this.player_i)
		},
		hand () {
		  return this.stacks.filter(item => item.zone === "hand" && item.player === this.player_i)
		},
		creatures () {
		  return this.stacks.filter(item => item.zone === "creatures" && item.player === this.player_i)
		},
		enchantments () {
		  return this.stacks.filter(item => item.zone === "enchantments" && item.player === this.player_i)
		},
		lands () {
		  return this.stacks.filter(item => item.zone === "lands" && item.player === this.player_i)
		},
	},		
});

var app = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to MTGSim',
	scry_cache: {
		"Forest":[
			'https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c59fc48-704b-4187-b9d3-2a2cff6dd54b.jpg?1562202644',
			'https://i.redd.it/qnnotlcehu731.jpg',
		],
	},
	players: [
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library:`3 Black Cat
3 Carrion Feeder
3 Cemetery Recruitment
3 Death Denied
3 Doom Blade
3 Rancid Rats
16 Swamp
3 Tattered Mummy
3 Vengeful Dead`,
			starting_sideboard: "",
			starting_command: "",
			
		},
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library:`3 Fanatical Firebrand
3 Foundry Street Denizen
3 Goblin Instigator
3 Hissing Iguanar
3 Krenko's Command
3 Lightning Bolt
16 Mountain
3 Reckless Abandon
3 Sure Strike`,
			starting_sideboard: "",
			starting_command: "",
			
		},
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library:`3 Cancel
3 Cartouche of Knowledge
3 Containment Membrane
3 Into the Roil
16 Island
3 Jeskai Windscout
3 Jhessian Thief
3 Man-o'-War
3 Wall of Mist`,
			starting_sideboard: "",
			starting_command: "",
			
		},
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library:`3 Caustic Caterpillar
3 Colossal Dreadmaw
16 Forest
3 Mammoth Spider
3 Predator's Strike
3 Prey Upon
3 Sauroform Hybrid
3 Skyshroud Troopers
3 Wirewood Elf`,
			starting_sideboard: "",
			starting_command: "",
			
		},
	],
	player_i: 0,
	
	coin: "Heads",
	die: 6,
	scale: 100,
	popup: "init",
	zoom_link: "",
	stacks: [
		{
			notes: "test2",
			id: 2,
			isTapped: false,
			zone: "enchantments",
			player: 0,
			cards: [
				{
					name: "Forest",
					id: 3,
					link_i: 0,
					links:[
						'https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c59fc48-704b-4187-b9d3-2a2cff6dd54b.jpg?1562202644',
						'https://i.redd.it/qnnotlcehu731.jpg',
					],
				},
			],
			
		},
		{
			notes: "test4",
			id: 4,
			isTapped: false,
			zone: "hand",
			player: 0,
			cards: [
				{
					name: "Forest",
					id: 5,
					link_i: 0,
					links:[
						'https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c59fc48-704b-4187-b9d3-2a2cff6dd54b.jpg?1562202644',
						'https://i.redd.it/qnnotlcehu731.jpg',
					],
				},
			],
			
		},
		
		{
			notes: "test5",
			id: 5,
			isTapped: false,
			zone: "lands",
			player: 0,
			cards: [
				{
					name: "Forest",
					id: 6,
					link_i: 0,
					links:[
						'https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c59fc48-704b-4187-b9d3-2a2cff6dd54b.jpg?1562202644',
						'https://i.redd.it/qnnotlcehu731.jpg',
					],
				},
			],
			
		},
	],
  },
  methods: {
	reorderStacks: function(id){
		for(var i = 0; i < this.stacks.length; i++){
			if(this.stacks[i].id == id){
				this.stacks.push(this.stacks.splice(i, 1)[0]);
				return;
			}
			for(var j = 0; j < this.stacks[i].cards.length; j++){
				if(this.stacks[i].cards[j].id == id){
					this.stacks[i].cards.push(this.stacks[i].cards.splice(j, 1)[0]);
					return;
				}
			}
		}
	},
	resetAll: function(){
		this.scryfall("Forest");
	},
	initSim: function(){
		var stringToDeck = function(str, app, zone, player){
			var arr = str.split("\n");
			for(var i = 0 ; i < arr.length; i ++){
				var arr_t = arr[i].split(" ");
				arr[i] = [arr_t[0]];
				var str_t = arr_t[1];
				for(var j = 2; j < arr_t.length; j++){
					str_t += " " + arr_t[j];
				}
				arr[i].push(str_t);
			}
			
			var arr2 = [];
			for(var i = 0; i < arr.length; i++){
				for(var j = 0; j < arr[i][0]; j++){
					app.scryfall(arr[i][1]);
					arr2.push({
						notes: "",
						id: generateID(),
						isTapped: false,
						zone: zone,
						player: player,
						cards:[{
							name: arr[i][1],
							id: generateID(),
							link_i: 0,
						}],
					});
				}
			}
			
			return arr2;
		}
		this.stacks = [];
		for(var i = 0; i < this.players.length; i++){
			this.stacks = this.stacks.concat(stringToDeck(this.players[i].starting_library, this, "library", i));
			this.stacks = this.stacks.concat(stringToDeck(this.players[i].starting_command, this, "command", i));
			this.stacks = this.stacks.concat(stringToDeck(this.players[i].starting_sideboard, this, "sideboard", i));
		}
		this.shuffleLibrary();
		this.popup = "hidden";
		
	},
	dealAllHands: function(){
		for(var i = 0; i < this.players.length; i++){
			for(var j = 0; j < 7; j++){
				this.drawCard(i);
			}
		}
	},
	tapStack: function(id){
		for(var i = 0; i < this.stacks.length; i++){
			if(this.stacks[i].id == id){
				if(this.stacks[i].isTapped){
					this.stacks[i].isTapped = false;
				}else{
					this.stacks[i].isTapped = true;
				}
				break;
			}
		}
		
	},
	copyStack: function(id){
		for(var i = 0; i < this.stacks.length; i++){
			if(this.stacks[i].id == id){
				if(this.stacks[i].isTapped){
					this.stacks[i].isTapped = false;
				}else{
					this.stacks[i].isTapped = true;
				}
				break;
			}
		}
		
	},
	flipCard: function(id){
		for(var i = 0; i < this.stacks.length; i++){
			for(var j = 0; j < this.stacks[i].cards.length; j++){
				if(this.stacks[i].cards[j].id == id){
					if(this.scry_cache[this.stacks[i].cards[j].name].length <= this.stacks[i].cards[j].link_i + 1){
						this.stacks[i].cards[j].link_i = 0;
						console.log(this.scry_cache);
					}else{
						this.stacks[i].cards[j].link_i += 1;
					}
					break;
				}
			}
		}
		
	},
	flipCoin: function(){
		this.die = Math.floor(Math.random() * 6);
	},
	rollDie: function(){
		this.coin = Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails";
	},
	increaseScale: function(){},
	decreaseScale: function(){},
	increaseHealth: function(){
		this.players[this.player_i].health++;
	},
	increaseComDam1: function(){
		this.players[this.player_i].ComDam1++;
	},
	increaseComDam2: function(){
		this.players[this.player_i].ComDam2++;
	},
	increaseComDam3: function(){
		this.players[this.player_i].ComDam3++;
	},
	increasePoison: function(){
		this.players[this.player_i].poison++;
	},
	increaseComTax: function(){
		this.players[this.player_i].ComTax+=2;
	},
	decreaseHealth: function(){
		this.players[this.player_i].health--;
	},
	decreaseComDam1: function(){
		this.players[this.player_i].ComDam1--;
	},
	decreaseComDam2: function(){
		this.players[this.player_i].ComDam2--;
	},
	decreaseComDam3: function(){
		this.players[this.player_i].ComDam3--;
	},
	decreasePoison: function(){
		this.players[this.player_i].poison--;
	},
	decreaseComTax: function(){
		this.players[this.player_i].ComTax-=2;
	},
	viewLibrary: function(){
		this.popup = "library";
	},
	shuffleLibrary: function(){
		
		var lib = [];
		for(var i = 0; i < this.stacks.length; i++){
			if(this.stacks[i].zone == "library"){
				lib.push(this.stacks.splice(i,1)[0]);
				i--;
			}
		}
		for(var num = 0; num <= 20; num++){
			i = lib.length;
			while (i--) {
				const ri = Math.floor(Math.random() * (i + 1));
				[lib[i], lib[ri]] = [lib[ri], lib[i]];
			}
		}
		
		
		for(var i = 0; i < lib.length; i++){
			this.stacks.push(lib[i]);
		}
	},
	drawCard: function(player_i){
		for(var i = 0; i < this.stacks.length; i++){
			if(this.stacks[i].zone == "library" && this.stacks[i].player == player_i){
				this.stacks[i].zone = "hand";
				break;
			}
		}
	},
	viewGraveyard: function(){
		this.popup = "graveyard";
	},
	viewExile: function(){
		this.popup = "exile";
	},
	viewSideboard: function(){
		this.popup = "sideboard";
	},
	viewCommand: function(){
		this.popup = "command";
	},
	copyStack: function(){},
	nextPlayer: function(){
		if(this.player_i + 1 >= this.players.length){
			this.player_i = 0;
		}else{
			this.player_i += 1;
		}
	},
	previousPlayer: function(){
		if(this.player_i - 1 < 0){
			this.player_i = this.players.length-1;
		}else{
			this.player_i -= 1;
		}
	},
	closePopup: function(){
		this.popup = "hidden";
	},
	startSim: function(){},
	onCardHover: function(evt, link_str){
		this.zoom_link = link_str;
	},
	startDrag: function(evt, item, type) {
	  evt.stopPropagation();
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
	  var found = false;
	  if(type == 'card'){
		  for(var i = 0; i < this.stacks.length; i++){
			  if(found){
				  break;
			  }
				for(var j = 0; j < this.stacks[i].cards.length; j++){
					if(found){
						break;
					}
					if(this.stacks[i].cards[j].id == item.id){
						if(this.stacks[i].cards.length == 1){
							item = this.stacks[i];
							type = "stack";
							found = true;
						}
					}
				}
		  }
	  }
      evt.dataTransfer.setData('itemID', item.id);
	  evt.dataTransfer.setData('itemType', type);
	},
	onDrop: function (evt, player, zone, stackID, dropType) {
		evt.stopPropagation();
		const itemID = evt.dataTransfer.getData('itemID');
		const itemType = evt.dataTransfer.getData('itemType');
		if(dropType == "zone" && itemType == "card"){
			//not checked
			//console.log("you should see this");
			//console.log(itemID);
			//console.log(itemType);
			for(var i = 0; i < this.stacks.length; i++){
				for(var j = 0; j < this.stacks[i].cards.length; j++){
					if(this.stacks[i].cards[j].id == itemID){
						this.stacks.push({
							id: generateID(),
							notes: "",
							isTapped: false,
							zone: zone,
							player: player,
							cards: this.stacks[i].cards.splice(j,1),
						  
						});
						if(this.stacks[i].cards.length == 0){
							this.stacks.splice(i,1);
						}
						break;
					}
				}
			}
		
	  }
	  if(dropType == "stack" && itemType == "card"){
		  //not checked
		for(var i = 0; i < this.stacks.length; i++){
			for(var j = 0; j < this.stacks[i].cards.length; j++){
				if(this.stacks[i].cards[j].id == itemID){
					
					const paste = this.stacks.find(item => item.id == stackID);
					paste.cards.push(this.stacks[i].cards.splice(j,1)[0]);
					if(this.stacks[i].cards.length == 0){
						this.stacks.splice(i,1);
					}
					this.reorderStacks(j);
					break;
				}
			}
		}
	  }
	  if(dropType == "zone" && itemType == "stack"){
		
		const item = this.stacks.find(item => item.id == itemID);
		item.zone = zone;
		item.player = player;
		this.reorderStacks(itemID);
	  }
	  if(dropType == "stack" && itemType == "stack"){
		  //not checked
		const copy = this.stacks.find(item => item.id == itemID);
		
		const paste = this.stacks.find(item => item.id == stackID);
		if(copy.id != paste.id){
			for(var i = 0; i < copy.cards.length; i++){
				paste.cards.push(copy.cards.splice(0,1)[0]);
			}
			for(var i = 0; i < this.stacks.length; i++){
				if(this.stacks[i].id == itemID){
					this.stacks.splice(i,1);
				}
			}
		}
		
	  }
	},
	scryfall: function(cardname){
		if(cardname != "Forest" && this.scry_cache[cardname] != undefined){
			return;
		}
		function httpGetAsync(theUrl, callback, cardname, app){
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function() { 
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
					callback(xmlHttp.responseText, cardname, app);
			}
			xmlHttp.open("GET", theUrl, true); // true for asynchronous 
			xmlHttp.send(null);
			app.scry_cache[cardname] = [""];
		}
		
		function callback(responseText, cardname, app){
			var json_obj = JSON.parse(responseText);
			if(json_obj.card_faces == null){
				app.scry_cache[cardname] = [json_obj.image_uris.png,'https://i.redd.it/qnnotlcehu731.jpg'];
			}else{
				var arr = [];
				for(var i = 0; i < json_obj.card_faces.length; i++){
					arr.push(json_obj.card_faces[i].image_uris.png);
				}
				arr.push('https://i.redd.it/qnnotlcehu731.jpg');
				app.scry_cache[cardname] = arr;
			}
		}


		httpGetAsync("https://api.scryfall.com/cards/named?fuzzy=" + encodeURI(cardname), callback, cardname, this);
	},
  },
	computed: {
		nextIndex () {
			i = this.player_i;
			i++;
			if(i < 4){
				return i;
			}else{
				return 0;
			}
		},
		nextNextIndex () {
			i = this.player_i;
			i++;
			if(i < 4){
				
			}else{
				i = 0;
			}
			i++;
			if(i < 4){
				return i;
			}else{
				return 0;
			}
		},
		nextNextNextIndex () {
			i = this.player_i;
			i++;
			if(i < 4){
				
			}else{
				i = 0;
			}
			i++;
			if(i < 4){
				
			}else{
				i = 0;
			}
			i++;
			if(i < 4){
				return i;
			}else{
				return 0;
			}
		},
		
		graveyard () {
		  return this.stacks.filter(item => item.zone === "graveyard" && item.player === this.player_i)
		},
		exile () {
		  return this.stacks.filter(item => item.zone === "exile" && item.player === this.player_i)
		},
		library () {
		  return this.stacks.filter(item => item.zone === "library" && item.player === this.player_i)
		},
		command () {
		  return this.stacks.filter(item => item.zone === "command" && item.player === this.player_i)
		},
		sideboard () {
		  return this.stacks.filter(item => item.zone === "sideboard" && item.player === this.player_i)
		},
	},
});