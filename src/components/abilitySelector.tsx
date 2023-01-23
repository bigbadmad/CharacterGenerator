import { FC } from 'react';
import { IDropdownProps } from '../interfaces/interfaces';
import Dropdown from './dropdown';


const abilities: IDropdownProps = {
    options: [{value: "", text: ""}, {value: "str", text: "strength"}, {value: "dex", text: "dexterity"}, {value: "con", text: "constitution"}, {value: "wis", text: "wisdom"}, {value: "int", text: "intelligence"}, {value: "chr", text: "charisma"}],
    onSelect: (selected: string) => console.log(selected)
}

interface IAbilitySelectorProps {
    roll?: number,
    label: string
}

const AbilitySelector: FC<IAbilitySelectorProps> = ({roll, label}) => {

    return (
        <div>
            <input type="number" id="one" readOnly value={roll} />
            <Dropdown {...abilities} />
            <label htmlFor="str">{ label }</label>
            <input type="number" id="str" readOnly />
            <label id="percent"></label>
        </div>
    );
};

export default AbilitySelector;