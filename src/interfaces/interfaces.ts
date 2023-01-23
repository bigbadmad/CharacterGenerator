import { classes } from "../enums/enums";

export interface IRaceClassLimits { 
    human: classes[];
    dwarf: classes[];
    elf: classes[];
    halfElf: classes[];
    gnome: classes[];
    halfling: classes[];
}

export interface Ithac0s {
    fighter: number[];
    rogue: number[];
    cleric: number[];
    mage: number[];
}

export interface ISavingThrows {
    fighter: IClassSavingThrows;
    cleric: IClassSavingThrows;
    rogue: IClassSavingThrows;
    mage: IClassSavingThrows;
}
  
export interface IClassSavingThrows {
    para: number[];
    rod: number[];
    poly: number[];
    breath: number[];
    spell: number[];
}

export interface IDropdownProps {
    options: Array<{value:string, text:string}>;
    onSelect: (selected: string) => void;
}