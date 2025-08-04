import { useEnemyStore } from '../../model/store';
import type { Enemy } from '../../model/types/Enemy';

export const useImportEnemies = () => {
    const importFunc = useEnemyStore(state => state.importEnemy);

    const addFiles = (files: FileList) => {
        const addOne = async (file: Blob) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    if (!e.target) return false;
                    try {
                        const newEnemy: Enemy = JSON.parse(e.target.result as string);

                        if (newEnemy.name) {
                            importFunc(newEnemy);
                        } else {
                            throw new Error('Невалидный текстовый файл');
                        }
                    } catch (e) {
                        console.error(e);
                    }
                };
                reader.readAsText(file);
            }
        };
        for (let i = 0; i < files.length; i++) {
            addOne(files[i]);
        }
    };
    return addFiles;
};
