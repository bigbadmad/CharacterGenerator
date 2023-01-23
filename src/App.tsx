import React from 'react';
import { IDropdownProps } from './interfaces/interfaces';
import './App.css';
import Dropdown from './components/dropdown';
import AbilitySelector from './components/abilitySelector';

const stats = { 
	strength: undefined,
	dexterity: undefined,
	constitution: undefined,
	intelligence: undefined,
	wisdom: undefined, 
	charisma: undefined
};

const races: IDropdownProps = {
    options: [
		{value: "", text: ""},
		{value: "human", text: "Human"},
		{value: "dwarf", text: "Dwarf"},
		{value: "elf", text: "Elf"},
		{value: "gnome",text: "Gnome"},
		{value: "halfling", text: "Halfling"},
		{value: "halfelf", text: "Half Elf"}
	],
    onSelect: (selected: string) => console.log(selected)
};

const classes: IDropdownProps = {
	options: [
		{value: "", text: ""},
		{value: "fighter", text: "Fighter"},
		{value: "thief", text: "Thief"},
		{value: "cleric", text: "Cleric"},
		{value: "mage", text: "Mage"},
		{value: "bard", text: "Bard"},
		{value: "paladin", text: "Paladin"},
		{value: "ranger", text: "Ranger"},
		{value: "druid", text: "Druid"},
		{value: "illusionist", text: "Illusionist"}
	],
    onSelect: (selected: string) => console.log(selected)
}

const levels: IDropdownProps = {
    options: [
		{value: "", text: ""},
		{value: "1", text: "1"},
		{value: "2", text: "2"},
		{value: "3", text: "3"},
		{value: "4", text: "4"},
		{value: "5", text: "5"},
		{value: "6", text: "6"},
		{value: "7", text: "7"},
		{value: "8", text: "8"},
		{value: "9", text: "9"},
		{value: "10", text: "10"},
		{value: "11", text: "11"},
		{value: "12", text: "12"},
		{value: "13", text: "13"},
		{value: "14", text: "14"},
		{value: "15", text: "15"},
		{value: "16", text: "16"},
		{value: "17", text: "17"},
		{value: "18", text: "18"},
		{value: "19", text: "19"},
		{value: "20", text: "20"}
	],
    onSelect: (selected: string) => console.log(selected)
};

function App() {
  return (
    <div>
    <div className="title">
		<h1>AD&D 2nd Edition Character Generator</h1>
	</div>
	<div className="m1">
		<input type="radio" id="fourd6" name="rolltype" value="4*D6" checked />
		<label htmlFor="fourd6">Four D6 drop the lowest</label>
		<br />
		<input type="radio" id="threed6" name="rolltype" value="3*D6" />
		<label htmlFor="threed6">Three D6</label>
		<br />
		<input type="radio" id="none" name="rolltype" value="none" />
		<label htmlFor="none">DM Mode</label>	
	</div>
	<div className="roller">
		<AbilitySelector label='Strength' roll={stats.strength} />
		<AbilitySelector label='Dexterity' roll={stats.dexterity} />
		<AbilitySelector label='Constitution' roll={stats.constitution} />
		<AbilitySelector label='Intelligence' roll={stats.intelligence} />
		<AbilitySelector label='Wisdom' roll={stats.wisdom} />
		<AbilitySelector label='Charisma' roll={stats.charisma} />
		<div>
			<input type="button" id="roll" value="Roll dem bones" />
		</div>
	</div>
	<div className="roller">
		<Dropdown {...races} />
		<Dropdown {...classes} />		
		<Dropdown {...levels} />
		<p>HP <label id="hp"></label></p>
		<p>THACO <label id="thaco"></label></p>
	</div>
	<div id="spinner">
		<div className="loadingspinner"></div>
	</div>
	<div className="roller">
		<p>Weight Allowance: <label id="wghtAllow"></label></p>
		<p>Max Press: <label id="MxPres"></label></p>
		<p>Open Doors: <label id="opDrs"></label></p>
		<p>Bend Bars: <label id="bndBrs"></label>%</p>
	</div>
	<div className="roller">
		<p>Reaction Adj: <label id="rctAdj"></label></p>
		<p>Missile Attack Adj: <label id="mislAdj"></label></p>
		<p>Defensive Adj: <label id="defAdj"></label></p>
	</div>
	<div className="roller">
		<p>HP Adj: <label id="hpAdj"></label></p>
		<p>System Shock: <label id="sysShk"></label></p>
		<p>Res Survival: <label id="resSurv"></label></p>
		<p>Poison Save: <label id="posSv"></label></p>
		<p>Regeneration: <label id="regen"></label></p>
	</div>
	<div className="roller">
		<p>No. Lang: <label id="noOfLang"></label></p>
		<p>Spell Level: <label id="spellLvl"></label></p>
		<p>Chance to learn: <label id="chnLearn"></label></p>
		<p>Max spells/level: <label id="maxSplPerLvl"></label></p>
		<p>Spell Immune: <label id="splImun"></label></p>
	</div>
	<div className="roller">
		<p>Magic Def Bonus: <label id="magDefAdj"></label></p>
		<p>Bonus Spells: <label id="BonusSp"></label></p>
		<p>Chance Spell Fail: <label id="chnFail"></label></p>
		<p>Spell Immune: <label id="splImmune"></label></p>
	</div>
	<div className="roller">
		<p>Max Henchmen: <label id="mxHench"></label></p>
		<p>Loyalty Base: <label id="loyaltyBs"></label></p>
		<p>Reaction Adj: <label id="ReactAdj"></label></p>
	</div>
	<div className="roller">
		<p>Poison/Paralysis: <label id="para"></label></p>
		<p>Rod/wand/staff: <label id="rod"></label></p>
		<p>Polymorph: <label id="poly"></label></p>
		<p>Breath weapon: <label id="breath"></label></p>
		<p>Spell: <label id="spell"></label></p>
	</div>
  </div>
  );
}

export default App;
