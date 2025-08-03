import { VStack, Text, Box, Input, HStack, InputGroup, InputLeftAddon, Button, Grid, Select } from '@chakra-ui/react';
import { useEnemyStore } from '../model/store';
import { useRef, useState, type ChangeEvent } from 'react';
import { StatVisual } from '../../../shared/components/StatVisual';
import { MinusIcon, AddIcon, CloseIcon, ArrowRightIcon, DeleteIcon, UnlockIcon, LockIcon } from '@chakra-ui/icons';

import { Form, Formik } from 'formik';
import type { Enemy, Features } from '../model/types/Enemy';
import { CFieldInputLabel } from '../../../shared/components/ChakraFields/CFieldInputLabel';
import { CFieldInput } from '../../../shared/components/ChakraFields/CFieldInput';
import { CFieldSelect } from '../../../shared/components/ChakraFields/CFieldSelect';
import { CFieldInputLAddon } from '../../../shared/components/ChakraFields/CFieldInputLAddon';
import { TextareaAutoSize } from '../../../shared/components/TextareaAutoSize/TextareaAutoSize';
import { saveAs } from 'file-saver';
import { FeatureDescription } from './FeatureDescription';
import { useRollStore } from '../../../shared/components/RollDice/model/useRollStore';

interface Props {
    id: number;
}

export const EnemyItem = ({ id }: Props) => {
    const roll = useRollStore(state => state.rollDices);
    const mainRef = useRef<HTMLDivElement>(null);
    const deleteThis = useEnemyStore(state => state.deleteEnemy);
    const enemy = useEnemyStore(state => state.enemies[id]);
    const [locked, setLock] = useState<boolean>(false);

    const [stress, hp] = [enemy.stress, enemy.hp];
    const initialValues: Enemy = {
        name: enemy.name,
        description: enemy.description,
        motives_tactics: enemy.motives_tactics,
        stress: enemy.stress,
        tag: enemy.tag,
        tier: enemy.tier,
        threshold1: enemy.threshold1,
        threshold2: enemy.threshold2,
        hp: enemy.hp,
        weapon: enemy.weapon,
        dmg_type: enemy.dmg_type,
        atk: enemy.atk,
        atk_roll: enemy.atk_roll,
        difficulty: enemy.difficulty,
        distance: enemy.distance,
        experience: enemy.experience,
        features: enemy.features,
    };
    //ОПИСАНИЕ
    const [currentDescription, setDescription] = useState<string>(enemy.description);
    const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    //АТАКА И УРОН ДЛЯ БРОСКОВ КУБИКОВ
    const [currentAtk, setCurrentAtk] = useState<number | string>(enemy.atk);
    const [currentAtkRoll, setCurrentAtkRoll] = useState<string>(enemy.atk_roll);
    const handleChangeAtk = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentAtk(e.target.value);
    };
    //Бросить кубик атаки
    const handleRollAtk = () => {
        //Точность положительная
        const num = Number(currentAtk);

        if (!isNaN(num) && num >= 0) roll('d20+' + currentAtk);
        //Точность отрицательная
        else if (!isNaN(num)) roll('d20' + currentAtk);
        //Точность строка (1 сущность противника по всей corebook)
        else roll('d20+' + String(currentAtk).replaceAll(' ', ''));
    };

    const handleChangeAtkRoll = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentAtkRoll(e.target.value);
    };
    //Бросить кубик на урон
    const handleRollDmg = () => {
        roll(currentAtkRoll.replaceAll(' ', ''));
    };

    //ЗДОРОВЬЕ МАКСИМАЛЬНОЕ И ТЕКУЩЕЕ
    const [currentHP, setCurrentHP] = useState<number>(hp);
    const [maxHP, setMaxHP] = useState<number>(hp);
    //Изменяем текущее хп (инпут)
    const handleChangeHP = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num >= 0 && num <= maxHP) setCurrentHP(num);
        else if (num > maxHP) setCurrentHP(maxHP);
        e.target.select();
    };
    //+1 текущее хп (Кнопка)
    const handleIncHP = () => {
        const num = currentHP + 1;
        if (num > 0 && num <= maxHP) setCurrentHP(num);
        else if (num > maxHP) setCurrentHP(maxHP);
    };
    //-1 текущее хп (кнопка)
    const handleDecHP = () => {
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 1;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
        else if (num > maxHP) setCurrentHP(maxHP);
    };
    //-2 текущее хп (кнопка)
    const handleDec2HP = () => {
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 2;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
        else if (num > maxHP) setCurrentHP(maxHP);
        else setCurrentHP(0);
    };
    //-3 текущее хп (кнопка)
    const handleDec3HP = () => {
        //Странные проверки, нужны ли сейчас?
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 3;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
        else if (num > maxHP) setCurrentHP(maxHP);
        else setCurrentHP(0);
    };
    //Меняем макс хп (инпут)
    const handleChangeMaxHP = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num < 38 && num > 0) setMaxHP(num);
        else if (num <= 0) setMaxHP(1);
    };

    //СТРЕСС МАКСИМАЛЬНЫЙ И ТЕКУЩИЙ
    const [currentStress, setCurrentStress] = useState<number>(stress);
    const [maxStress, setMaxStress] = useState<number>(stress);
    //Изменяем текущий стресс (инпут)
    const handleChangeStress = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num > 0 && num <= maxStress) setCurrentStress(num);
        else if (num > maxStress) setCurrentStress(maxStress);
    };
    //+1 к текущему стрессу (кнопка)
    const handleIncStress = () => {
        const num = currentStress + 1;
        if (num > 0 && num <= maxStress) setCurrentStress(num);
        if (num > maxStress) setCurrentStress(maxStress);
    };
    //-1 к текущему стрессу (кнопка)
    const handleDecStress = () => {
        const num = currentStress - 1;
        if (num >= 0 && num < maxStress) setCurrentStress(num);
        if (num > maxStress) setCurrentStress(maxStress);
    };
    //Изменяем максимальный стресс (инпут)
    const handleChangeMaxStress = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num < 30 && num > 0) setMaxStress(num);
    };

    //ОСОБЕННОСТИ (FEATURES) СУЩНОСТИ
    const [currentFeatures, setFeatures] = useState<Features[]>(initialValues.features);
    //Добавление
    const handleAddFeature = () => {
        setFeatures(prev => [...prev, { name: '', tag: '', description: '' }]);
    };
    //Редактирование имени особенности
    const handleEditFeaturesName = (e: ChangeEvent<HTMLInputElement>) => {
        setFeatures(prev => {
            const newData = [...prev];
            const index = e.target.dataset.index;
            newData[Number(index)].name = e.target.value;
            return newData;
        });
    };
    //Редактирование типа особенности
    const handleEditFeaturesTag = (e: ChangeEvent<HTMLSelectElement>) => {
        setFeatures(prev => {
            const newData = [...prev];
            const index = e.target.dataset.index;
            newData[Number(index)].tag = e.target.value;
            return newData;
        });
    };
    //Редактирование описания особенности
    const handleEditFeaturesDescription = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFeatures(prev => {
            const newData = [...prev];
            const index = e.target.dataset.index;
            newData[Number(index)].description = e.target.value;
            return newData;
        });
    };
    //Удаление особенности
    function handleDeleteFeature(event: React.MouseEvent<HTMLButtonElement>) {
        const index = Number(event.currentTarget.dataset.index);
        const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    }

    //ОСТАЛЬНОЕ
    //Удаление этого компонента
    function handleDeleteItem() {
        deleteThis(id);
    }
    //Выбрать содержимое инпута при фокусе
    const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('handleFocus');
        if (!e.target.ariaSelected) e.target.select();
    };
    //Экспорт в json
    const handleExport = (values: Enemy, actions: { setSubmitting: (arg0: boolean) => void }) => {
        values.hp = maxHP;
        values.stress = maxStress;
        values.description = currentDescription;
        values.features = currentFeatures;
        values.atk = currentAtk;
        values.atk_roll = currentAtkRoll;
        actions.setSubmitting(false);
        const blob = new Blob([JSON.stringify(values)], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, values.name);
    };
    //Блокировка редактирования
    const handleLockList = () => {
        setLock(prev => !prev);
    };

    //В идеале с ростом приложения не забыть вывести id-ссылки на листы в некий файл роутинга.
    return (
        <Box
            boxShadow={'0px 0px 50px -3px hsla(240, 14%, 50%, 0.57)'}
            id={'enemyItem-' + id}
            p={4}
            ref={mainRef}
            w="1000px"
            border={'1px solid #000000ff;'}
        >
            <Formik initialValues={initialValues} onSubmit={handleExport}>
                {props => (
                    <Form>
                        <Grid
                            p="4px"
                            templateAreas={`"stats1 header"
                         "description description"
                          "stats2 stats3"
                          "features features"`}
                            gridTemplateColumns={'220px 1fr'}
                            gap="4"
                            color="blackAlpha.700"
                            fontWeight="bold"
                        >
                            <HStack gridArea="stats1" w="100%">
                                <CFieldInputLabel disabled={locked} name={'difficulty'} label={'Сложность'} />
                                <CFieldInputLabel disabled={locked} name={'tier'} label={'Тир'} />
                            </HStack>
                            <Box gridArea="header">
                                <CFieldInput disabled={locked} placeholder="Имя" name="name" fontSize="24px" w="100%" h="100%" />
                            </Box>

                            <VStack gridArea="stats2">
                                <CFieldSelect disabled={locked} name="tag" placeholder={'Выбери тег'}>
                                    <option value="Обычный">Обычный</option>
                                    <option value="Скрытный">Скрытный</option>
                                    <option value="Тяжеловес">Тяжеловес</option>
                                    <option value="Поддержка">Поддержка</option>
                                    <option value="Дальний бой">Дальний бой</option>
                                    <option value="Соло">Соло</option>
                                    <option value="Лидер">Лидер</option>
                                    <option value="Приспешник">Приспешник</option>
                                    <option value="Социальный">Социальный</option>
                                    <option value="Орда">Орда</option>
                                </CFieldSelect>
                                <CFieldInput disabled={locked} w="100%" h="100%" name="weapon" />
                                <CFieldSelect disabled={locked} name="distance" placeholder={'Выбери дистанцию'}>
                                    <option value="Вплотную">Вплотную</option>
                                    <option value="Очень близко">Очень близко</option>
                                    <option value="Близко">Близко</option>
                                    <option value="Далеко">Далеко</option>
                                    <option value="Очень далеко">Очень далеко</option>
                                </CFieldSelect>
                                <CFieldSelect disabled={locked} name="dmg_type" placeholder="Выбери тип урона">
                                    <option value="Физический">Физический</option>
                                    <option value="Магический">Магический</option>
                                </CFieldSelect>
                                {locked ? (
                                    <Button colorScheme="blue" onClick={handleRollAtk} w="100%" h="100%">
                                        Бросить кубики атаки
                                    </Button>
                                ) : (
                                    <InputGroup>
                                        <InputLeftAddon bg={'gray.200'} w={'120px'}>
                                            Атака
                                        </InputLeftAddon>
                                        <Input textAlign="center" value={currentAtk} onInput={handleChangeAtk} />
                                    </InputGroup>
                                    // <CFieldInputLAddon disabled={locked} name="atk" addonWidth="110px" addonLabel="Точность" />
                                )}
                                {locked ? (
                                    <Button colorScheme="blue" onClick={handleRollDmg} w="100%" h="100%">
                                        Бросить кубики урона
                                    </Button>
                                ) : (
                                    <InputGroup>
                                        <InputLeftAddon bg={'gray.200'} w={'120px'}>
                                            {'Ролл урона'}
                                        </InputLeftAddon>
                                        <Input textAlign="center" value={currentAtkRoll} onInput={handleChangeAtkRoll} />
                                    </InputGroup>
                                )}
                            </VStack>
                            <Box w="100%" gridArea={'description'}>
                                <label>
                                    {locked ? (
                                        <Box textAlign={'right'} fontWeight={600}>
                                            {currentDescription}
                                        </Box>
                                    ) : (
                                        <>
                                            Описание
                                            <TextareaAutoSize
                                                value={currentDescription}
                                                border={'1px solid #000000ff'}
                                                onChange={handleChangeDescription}
                                            />
                                        </>
                                    )}
                                </label>
                            </Box>
                            <VStack alignItems="flex-start" gridArea="stats3">
                                <CFieldInputLAddon
                                    disabled={locked}
                                    name={'motives_tactics'}
                                    addonWidth={'auto'}
                                    addonLabel={'Мотивы и тактика'}
                                />
                                <CFieldInputLAddon disabled={locked} name={'experience'} addonWidth={'100px'} addonLabel={'Опыт'} />

                                <HStack>
                                    <InputGroup w="auto">
                                        <InputLeftAddon bg={'gray.200'} w="100px">
                                            Здоровье
                                        </InputLeftAddon>
                                        <Input
                                            type="number"
                                            w="50px"
                                            borderRightRadius={'0'}
                                            onFocus={handleFocus}
                                            onChange={handleChangeHP}
                                            value={currentHP}
                                            textAlign={'center'}
                                        />
                                        <Input
                                            disabled={locked}
                                            _disabled={{ bg: 'gray.300' }}
                                            name="hp"
                                            onFocus={handleFocus}
                                            onChange={handleChangeMaxHP}
                                            value={maxHP}
                                            type="number"
                                            bgColor={'white'}
                                            width="50px"
                                            textAlign={'center'}
                                        />
                                    </InputGroup>
                                    <Button onClick={handleIncHP} colorScheme="green" w="40px">
                                        <AddIcon boxSize={6} />
                                    </Button>
                                    <Button onClick={handleDecHP} colorScheme="red" w="40px">
                                        <MinusIcon boxSize={6} />
                                    </Button>
                                    <Button variant="outline" colorScheme="blue" onClick={handleDecHP} w="90px">
                                        Лёгкий
                                    </Button>
                                    <CFieldInput disabled={locked} onFocus={handleFocus} name={'threshold1'} w="50px" borderRadius="24%" />
                                    <Button variant="outline" colorScheme="blue" onClick={handleDec2HP} w="90px">
                                        Средний
                                    </Button>
                                    <CFieldInput disabled={locked} onFocus={handleFocus} name={'threshold2'} w="50px" borderRadius="24%" />
                                    <Button variant="outline" colorScheme="blue" onClick={handleDec3HP} w="90px">
                                        Cложный
                                    </Button>
                                </HStack>
                                <StatVisual current={currentHP} max={maxHP} />
                                <HStack>
                                    <InputGroup>
                                        <InputLeftAddon bg={'gray.200'} w="100px">
                                            Стресс
                                        </InputLeftAddon>
                                        <Input
                                            type="number"
                                            w="50px"
                                            textAlign="center"
                                            value={currentStress}
                                            onFocus={handleFocus}
                                            onChange={handleChangeStress}
                                            borderRightRadius={'0'}
                                        />
                                        <Input
                                            disabled={locked}
                                            _disabled={{ bg: 'gray.300' }}
                                            textAlign={'center'}
                                            name="hp"
                                            onFocus={handleFocus}
                                            onChange={handleChangeMaxStress}
                                            value={maxStress}
                                            type="number"
                                            bgColor={'white'}
                                            width="50px"
                                        />
                                    </InputGroup>
                                    <Button onClick={handleIncStress} colorScheme="green" w="40px">
                                        <AddIcon boxSize={6} />
                                    </Button>
                                    <Button onClick={handleDecStress} colorScheme="red" w="40px">
                                        <MinusIcon boxSize={6} />
                                    </Button>
                                </HStack>
                                <StatVisual current={currentStress} max={maxStress} />
                            </VStack>
                            <Box gridArea="features">
                                <Text>Особенности</Text>
                                {currentFeatures?.map((item, index) => (
                                    <Box
                                        mb={2}
                                        borderRadius={'0px'}
                                        border={'1px solid #cacacaff'}
                                        borderLeft={'4px solid #1c4268ff'}
                                        borderRight={'4px solid #1c4268ff'}
                                        key={item.name + index}
                                    >
                                        <HStack gap={0}>
                                            <Select
                                                disabled={locked}
                                                onChange={handleEditFeaturesTag}
                                                data-index={index}
                                                borderRadius={0}
                                                border="1px solid black"
                                                w={'180px'}
                                                defaultValue={item.tag}
                                            >
                                                <option value="Действие">Действие</option>
                                                <option value="Реакция">Реакция</option>
                                                <option value="Пассивно">Пассивно</option>
                                            </Select>
                                            <Input
                                                disabled={locked}
                                                defaultValue={item.name}
                                                onBlur={handleEditFeaturesName}
                                                data-index={index}
                                                pl={4}
                                                placeholder="Название"
                                                borderRadius={'0px'}
                                                color="#396c96ff"
                                            />
                                            <Button
                                                display={locked ? 'none' : 'block'}
                                                data-index={index}
                                                onClick={handleDeleteFeature}
                                                borderRadius={'0px'}
                                                border={'1px solid #000000ff'}
                                                w={'40px'}
                                                variant="outline"
                                                colorScheme="red"
                                            >
                                                <CloseIcon />
                                            </Button>
                                        </HStack>
                                        {locked ? (
                                            <FeatureDescription text={item.description} />
                                        ) : (
                                            <TextareaAutoSize
                                                onBlur={handleEditFeaturesDescription}
                                                index={index}
                                                placeholder="Описание"
                                                borderRadius={'0px'}
                                                border="1px solid #000000ff"
                                                defaultValue={item.description}
                                            />
                                        )}
                                    </Box>
                                ))}
                                <Button
                                    display={locked ? 'none' : 'block'}
                                    borderRadius={'0px'}
                                    boxSizing="border-box"
                                    onClick={handleAddFeature}
                                    variant="outline"
                                    colorScheme="blue"
                                    w="100%"
                                    h="25px"
                                    type="button"
                                >
                                    <AddIcon boxSize={4} />
                                </Button>
                            </Box>
                        </Grid>
                        <Button gap={4} mr={20} mt={4} colorScheme="teal" onClick={handleLockList}>
                            {locked ? <LockIcon /> : <UnlockIcon />}
                        </Button>
                        <Button gap={4} mr={20} mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                            Экспорт <ArrowRightIcon />
                        </Button>
                        <Button gap={4} onClick={handleDeleteItem} mt={4} colorScheme="red" type="button">
                            Удалить <DeleteIcon />
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};
