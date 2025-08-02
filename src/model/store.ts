import { create } from 'zustand';
import { createRollSlice, type RollSlice } from '../shared/components/RollDice/model/createRollSlice';

//interface RootState extends RollSlice {}

export const useBoundStore = create<RollSlice>()((...a) => ({
    ...createRollSlice(...a), //ts ругается, но по докам так и надо
}));

//Возможно, есть смысл не пробовать играть со сторами, а просто сделать его так же, как и в enemyList
