import Roll from 'roll';
import { create } from 'zustand';

export interface RollState {
    dices: string;
    result: number;
    rolled: number[];
    rollDices: (value: string) => void;
    setDices: (value: string) => void;
}

const roll = new Roll();
//В итоге дропнул идею создать слайсы с zustand, надо усиленно почитать доки
export const useRollStore = create<RollState>()(set => ({
    result: 0,
    rolled: [],
    dices: '1d20',
    rollDices: (value: string) =>
        set(() => {
            if (roll.validate(value)) {
                const newData = roll.roll(value);
                return { result: newData.result, rolled: newData.rolled, dices: value };
            } else return {};
        }),
    setDices: (value: string) =>
        set(() => {
            return { dices: value.replaceAll(' ', '') };
        }),
}));
