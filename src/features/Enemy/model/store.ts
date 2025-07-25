import { create } from 'zustand';
import type { Enemies, Enemy } from './types/Enemy';

type State = {
    enemies: Enemies;
    defaultEnemies: Enemies;
};

type Actions = {
    setEnemies: (enemies: Enemies) => void;
    setDefaultEnemies: (enemies: Enemies) => void;
    deleteEnemy: (index: number) => void;
    addEnemy: (index: number) => void;
    importEnemy: (enemy: Enemy) => void;
};

export const useEnemyStore = create<State & Actions>()(set => ({
    enemies: [],
    defaultEnemies: [],
    setEnemies: enemies => set(() => ({ enemies: enemies })),
    setDefaultEnemies: enemies => set(() => ({ defaultEnemies: enemies })),
    deleteEnemy: index =>
        set(prev => {
            if (index === 0) return { enemies: [...prev.enemies.slice(1)] };
            return { enemies: [...prev.enemies.slice(0, index), ...prev.enemies.slice(index + 1, prev.enemies.length)] };
        }),
    addEnemy: index =>
        set(prev => {
            const currentList = [...prev.enemies];
            const defaultList = [...prev.defaultEnemies];
            currentList.push(defaultList[index]);
            return { enemies: currentList };
        }),
    importEnemy: enemy =>
        set(prev => {
            const currentList = [...prev.enemies];
            currentList.push(enemy);
            return { enemies: currentList };
        }),
}));
