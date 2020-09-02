var scry_cache = [];
var id_cache = [];

var scryfall = function(cardname){
	
};

var reorderStacks = function(){
	
}

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
						v-bind:src="card.links[card.link_i]"
						@mouseover='onCardHover($event, card.links[card.link_i])'
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
			this.$parent.flipCard(id);
		},
		tapStack: function(id){
			this.$parent.tapStack(id);
		},
		startDrag: function(evt, item, type){
			this.$parent.startDrag(evt, item, type);
		},
		onDrop: function(evt, player, zone, stackID, dropType){
			this.$parent.onDrop(evt, player, zone, stackID, dropType);
		},
		onCardHover: function(evt, link_str){
			this.$parent.onCardHover(evt, link_str);
		},
	},		
			
});


var app = new Vue({
  el: '#app',
  data: {
    message: 'Welcome to MTGSim',
	players: [
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library: [],
			starting_sideboard: [],
			starting_command: [],
			
		},
		{
			health: 40,
			poison: 0,
			ComDam1: 0,
			ComDam2: 0,
			ComDam3: 0,
			ComTax: 0,
			starting_library: [],
			starting_sideboard: [],
			starting_command: [],
			
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
			notes: "test",
			id: 0,
			isTapped: false,
			zone: "creatures",
			player: 0,
			cards: [
				{
					name: "Forest",
					id: 1,
					link_i: 0,
					links:[
						'https://c1.scryfall.com/file/scryfall-cards/large/front/1/c/1c59fc48-704b-4187-b9d3-2a2cff6dd54b.jpg?1562202644',
						'https://i.redd.it/qnnotlcehu731.jpg',
					],
				},
			],
			
		},
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
					if(this.stacks[i].cards[j].links.length <= this.stacks[i].cards[j].link_i + 1){
						this.stacks[i].cards[j].link_i = 0;
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
	resetAll: function(){
		//clear all zones
		//dump starting decks into the library, sideboard, command, etc
		//reset all health, damage, poison, variables
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
	shuffleLibrary: function(){},
	drawCard: function(){},
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
					console.log("you should see this once");
					console.log(item.id);
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
		
		console.log("here");
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
	  console.log(this);
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
		trash () {
		  return this.stacks.filter(item => item.zone === "trash" && item.player === this.player_i)
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