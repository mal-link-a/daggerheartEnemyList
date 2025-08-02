import { Box, Text, HStack, Input, Select, VStack, Button } from '@chakra-ui/react';
import { EnemyItem } from './EnemyItem';
import { useEnemyStore } from '../model/store';
import { useEffect, useState, type ChangeEvent } from 'react';

import defaultEnemyList from '../../../shared/defaultEnemiesSmall.json';
import fullEnemyList from '../../../shared/defaultEnemies.json';
import type { Enemy } from '../model/types/Enemy';
import { AddIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import { EnemyNavigation } from './EnemyNavigation';
import { RollDice } from '../../../shared/components/RollDice/ui/RollDice';

//Основной лист, реализующий работу с сущностями врагов - просмотр, редактирование, экспорт в txt кастомный сущностей и их импорт
export function EnemyList() {
    const setDefaultEnemies = useEnemyStore(state => state.setDefaultEnemies);
    const enemies = useEnemyStore(state => state.enemies);
    const defaultEnemies = useEnemyStore(state => state.defaultEnemies);
    const addEnemy = useEnemyStore(state => state.addEnemy);
    const importEnemy = useEnemyStore(state => state.importEnemy);
    const toast = useToast();

    const [isFullLoad, setFullLoad] = useState<boolean>(false);
    useEffect(() => {
        setDefaultEnemies(defaultEnemyList);
    }, []);

    //Добавление врага из дефолтного массива
    const handleAddEnemy = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value);
        e.target.selectedIndex = 0;
        addEnemy(value);
    };
    //Импорт листа врага
    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                if (!e.target) return;
                try {
                    const text = JSON.parse(e.target.result as string);
                    const newEnemy: Enemy = text;
                    importEnemy(newEnemy);
                    toast({
                        title: 'Успех',
                        description: 'Лист был импортирован.',
                        status: 'success',
                        duration: 5000,
                        position: 'top-right',
                        isClosable: true,
                    });
                } catch {
                    toast({
                        title: 'Неудача',
                        description: 'Ошибка при попытке добавления файла.',
                        status: 'error',
                        duration: 5000,
                        position: 'top-right',
                        isClosable: true,
                    });
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        }
    };

    //Загрузить json на 100+ сущностей
    const handleLoadFullData = () => {
        setDefaultEnemies(fullEnemyList);
        setFullLoad(true);
    };

    return (
        <Box w="1280px">
            <HStack alignItems="flex-start">
                <label>
                    <HStack borderRadius={8} pl={4} pr={4} border="1px solid black" height={'40px'}>
                        <Text>Импортировать</Text> <AddIcon boxSize={4} />
                    </HStack>
                    <Input id="input-field" display="none" onChange={handleImport} type="file" />
                </label>
                <Button
                    display={isFullLoad ? 'none' : 'block'}
                    fontWeight={'400'}
                    border="1px solid black"
                    variant={'outline'}
                    w={'560px'}
                    onClick={handleLoadFullData}
                >
                    Загрузить полный список на английском
                </Button>
                <Select border="1px solid #000000ff" mb={8} onChange={handleAddEnemy} placeholder="Добавить карточку врага">
                    {defaultEnemies.map((item, index) => (
                        <option
                            key={item.name + item.atk + item.threshold1 + item.threshold2}
                            value={index}
                        >{`${item.tier}: ${item.name} | ${item.tag} / ${item.weapon}`}</option>
                    ))}
                </Select>
            </HStack>
            <HStack alignItems="flex-start">
                <VStack position="sticky" top="0px">
                    <RollDice />
                    <EnemyNavigation />
                </VStack>

                <VStack as="main" w="1000px">
                    {enemies.map((item, id) => (
                        <EnemyItem key={'Enemy' + item.name + id} id={id} />
                    ))}
                </VStack>
            </HStack>
        </Box>
    );
}
