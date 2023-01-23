import React, { ChangeEvent, FC, useState } from 'react';
import { IDropdownProps } from '../interfaces/interfaces';
import Dropdown from './dropdown';


const abilities: IDropdownProps = {
    options: [{value: "", text: ""}, {value: "str", text: "strength"}, {value: "dex", text: "dexterity"}, {value: "con", text: "constitution"}, {value: "wis", text: "wisdom"}, {value: "int", text: "intelligence"}, {value: "chr", text: "charisma"}],
    onSelect: (selected: string) => console.log(selected)
}

interface IAbilitySelectorProps {
    dropdownValues: IDropdownProps;

}

const AbilitySelector: FC<IAbilitySelectorProps> = ({ dropdownValues }) => {

    return (
        <div>
            <input type="number" id="one" readOnly />
            <Dropdown {...abilities} />
            <label htmlFor="str">Strength</label>
            <input type="number" id="str" readOnly />
            <label id="percent"></label>
        </div>
    );
};

export default AbilitySelector;