import React from 'react';
import { Ithac0s, IClassSavingThrows, ISavingThrows, IRaceClassLimits, IDropdownProps } from './interfaces/interfaces';
import { classes, races } from './enums/enums';

import './App.css';
import Dropdown from './components/dropdown';
import AbilitySelector from './components/abilitySelector';

const abilities: IDropdownProps = {
    options: [{value: "", text: ""}, {value: "str", text: "strength"}, {value: "dex", text: "dexterity"}, {value: "con", text: "constitution"}, {value: "wis", text: "wisdom"}, {value: "int", text: "intelligence"}, {value: "chr", text: "charisma"}],
    onSelect: (selected: string) => console.log(selected)
}

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
		<AbilitySelector dropdownValues={abilities} />
		<AbilitySelector dropdownValues={abilities} />
		<AbilitySelector dropdownValues={abilities} />
		<AbilitySelector dropdownValues={abilities} />
		<AbilitySelector dropdownValues={abilities} />
		<AbilitySelector dropdownValues={abilities} />
		<div>
			<input type="button" id="roll" value="Roll dem bones" />
		</div>
	</div>
	<div className="roller">
		<select id="race">
			<option></option>
			<option>human</option>
			<option>dwarf</option>
			<option>elf</option>
			<option>gnome</option>
			<option>halfling</option>
			<option>half elf</option>
		</select>
		<select id="className">
			<option></option>
			<option value="fighter" disabled>fighter</option>
			<option value="thief" disabled>thief</option>
			<option value="cleric" disabled>cleric</option>
			<option value="mage" disabled>mage</option>
			<option value="bard" disabled>bard</option>
			<option value="paladin" disabled>paladin</option>
			<option value="ranger" disabled>ranger</option>
			<option value="druid" disabled>druid</option>
			<option value="illusionist" disabled>illusionist</option>
		</select>		
		<select id="lvl">
			<option></option>
			<option>1</option>
			<option>2</option>
			<option>3</option>
			<option>4</option>
			<option>5</option>
			<option>6</option>
			<option>7</option>
			<option>8</option>
			<option>9</option>
			<option>10</option>
			<option>11</option>
			<option>12</option>
			<option>13</option>
			<option>14</option>
			<option>15</option>
			<option>16</option>
			<option>17</option>
			<option>18</option>
			<option>19</option>
			<option>20</option>
		</select>
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
