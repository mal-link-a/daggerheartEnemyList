import { Box, Text, HStack, Input, Select, VStack, Button } from '@chakra-ui/react';
import { EnemyItem } from './EnemyItem';
import { useEnemyStore } from '../model/store';
import { useEffect, useState, type ChangeEvent } from 'react';
import defaultEnemyList from '../../../shared/defaultEnemiesSmall.json';
import fullEnemyList from '../../../shared/defaultEnemies.json';
import { AddIcon } from '@chakra-ui/icons';
import { EnemyNavigation } from './EnemyNavigation';
import { RollDice } from '../../../shared/components/RollDice/ui/RollDice';
import { useImportEnemies } from '../lib/hooks/useImportEnemies';

//Основной лист, реализующий работу с сущностями врагов - просмотр, редактирование, экспорт в txt кастомный сущностей и их импорт
export function EnemyList() {
    const importEnemies = useImportEnemies();
    const setDefaultEnemies = useEnemyStore(state => state.setDefaultEnemies);
    const enemies = useEnemyStore(state => state.enemies);
    const defaultEnemies = useEnemyStore(state => state.defaultEnemies);
    const addEnemy = useEnemyStore(state => state.addEnemy);

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
    //Импорт листа врага / вынести в lib
    const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        importEnemies(e.target.files);
        e.target.value = '';
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
                    <Input id="input-field" display="none" onChange={handleImport} type="file" multiple />
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
                <VStack overflowY="auto" overflowX="hidden" position="sticky" top="40px" minW="286px" maxHeight="calc(100vh - 120px)">
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
