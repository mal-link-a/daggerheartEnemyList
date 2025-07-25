import { VStack, Text, Box, Input, HStack, InputGroup, InputLeftAddon, Button, Grid } from '@chakra-ui/react';
import { useEnemyStore } from './model/store';
import { useRef, useState, type ChangeEvent } from 'react';
import { StatVisual } from '../../shared/components/StatVisual';
import { MinusIcon, AddIcon, CloseIcon, ArrowRightIcon, DeleteIcon } from '@chakra-ui/icons';

import { Form, Formik } from 'formik';
import type { Enemy, Features } from './model/types/Enemy';
import { CFieldInputLabel } from '../../shared/components/ChakraFields/CFieldInputLabel';
import { CFieldInput } from '../../shared/components/ChakraFields/CFieldInput';
import { CFieldSelect } from '../../shared/components/ChakraFields/CFieldSelect';
import { CFieldInputLAddon } from '../../shared/components/ChakraFields/CFieldInputLAddon';
import { CFieldTextarea } from '../../shared/components/ChakraFields/CFieldTextarea';
import { TextareaAutoSize } from '../../shared/components/TextareaAutoSize/TextareaAutoSize';
import { saveAs } from 'file-saver';

interface Props {
    id: number;
}

export const EnemyItem = ({ id }: Props) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const deleteThis = useEnemyStore(state => state.deleteEnemy);

    const enemy = useEnemyStore(state => state.enemies[id]);
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

    const [currentHP, setCurrentHP] = useState<number>(hp);
    const [maxHP, setMaxHP] = useState<number>(hp);
    const [currentStress, setCurrentStress] = useState<number>(stress);
    const [maxStress, setMaxStress] = useState<number>(stress);
    const [currentFeatures, setFeatures] = useState<Features[]>(initialValues.features);

    const handleChangeHP = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num >= 0 && maxHP == null) setCurrentHP(num);
        else if (num >= 0 && maxHP != null && num < maxHP) setCurrentHP(num);
        else if (maxHP != null && num > maxHP) setCurrentHP(maxHP);
        e.target.select();
    };
    const handleFocus = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.select();
    };
    const handleIncHP = () => {
        const num = currentHP + 1;
        if (num > 0 && num <= maxHP) setCurrentHP(num);
    };
    const handleDecHP = () => {
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 1;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
    };
    const handleDec2HP = () => {
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 2;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
        else setCurrentHP(0);
    };
    const handleDec3HP = () => {
        if (currentHP == null || maxHP == null) {
            return;
        }
        const num = currentHP - 3;
        if (num >= 0 && num < maxHP) setCurrentHP(num);
        else setCurrentHP(0);
    };
    const handleChangeMaxHP = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num < 38 && num > 0) setMaxHP(num);
        else if (num <= 0) setMaxHP(1);
    };

    const handleChangeStress = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num < 30 && num > 0 && num < maxStress) setCurrentStress(num);
        else if (num > maxStress) setCurrentStress(maxStress);
    };

    const handleIncStress = () => {
        const num = currentStress + 1;
        if (num < 30 && num > 0 && num <= maxStress) setCurrentStress(num);
    };
    const handleDecStress = () => {
        const num = currentStress - 1;
        if (num < 30 && num >= 0 && num < maxStress) setCurrentStress(num);
    };

    const handleChangeMaxStress = (e: ChangeEvent<HTMLInputElement>) => {
        const num = Number(e.target.value);
        if (num < 30 && num > 0) setMaxStress(num);
    };

    const handleExport = (values: Enemy, actions: { setSubmitting: (arg0: boolean) => void }) => {
        values.hp = maxHP;
        values.stress = maxStress;
        values.features = currentFeatures;
        actions.setSubmitting(false);
        const blob = new Blob([JSON.stringify(values)], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, values.name);
    };

    const handleAddFeature = () => {
        setFeatures([...currentFeatures, { name: '', description: '' }]);
    };

    function handleDeleteFeature(event: React.MouseEvent<HTMLButtonElement>) {
        const index = Number(event.currentTarget.dataset.index);
        const updatedFeatures = currentFeatures.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    }

    function handleDeleteItem() {
        deleteThis(id);
    }

    return (
        <Box p={4} ref={mainRef} w="100%" border={'1px solid #7D46A4;'}>
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
                                <CFieldInputLabel name={'difficulty'} label={'Сложность'} />
                                <CFieldInputLabel name={'tier'} label={'Тир'} />
                            </HStack>
                            <Box gridArea="header">
                                <CFieldInput placeholder="Имя" name="name" fontSize="24px" w="100%" h="100%" />
                            </Box>

                            <VStack gridArea="stats2">
                                <CFieldSelect name="tag" placeholder={'Выбери тег'}>
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
                                <CFieldInput w="100%" h="100%" name="weapon" />
                                <CFieldSelect name="distance" placeholder={'Выбери дистанцию'}>
                                    <option value="Вплотную">Сверхблизко</option>
                                    <option value="Близко">Близко</option>
                                    <option value="Средне">Близко</option>
                                    <option value="Далеко">Далеко</option>
                                    <option value="Очень далеко">Очень далеко</option>
                                </CFieldSelect>
                                <CFieldSelect name="dmg_type" placeholder="Выбери тип урона">
                                    <option value="Физический">Физический</option>
                                    <option value="Магический">Магический</option>
                                </CFieldSelect>
                                <CFieldInputLAddon name="atk" addonWidth="110px" addonLabel="Точность" />
                                <CFieldInputLAddon name="atk_roll" addonWidth="110px" addonLabel="Ролл атаки" />
                            </VStack>
                            <Box w="100%" gridArea={'description'}>
                                <label>
                                    Описание
                                    <CFieldTextarea border={'1px solid #000000ff'} name="description" />
                                </label>
                            </Box>
                            <VStack alignItems="flex-start" gridArea="stats3">
                                <CFieldInputLAddon name={'motives_tactics'} addonWidth={'auto'} addonLabel={'Мотивы и тактика'} />
                                <CFieldInputLAddon name={'experience'} addonWidth={'100px'} addonLabel={'Навыки'} />

                                <HStack>
                                    <InputGroup w="auto">
                                        <InputLeftAddon w="100px">Здоровье</InputLeftAddon>
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
                                            name="hp"
                                            onFocus={handleFocus}
                                            onChange={handleChangeMaxHP}
                                            value={maxHP}
                                            type="number"
                                            bgColor={'#DCDCDC'}
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
                                    <CFieldInput name={'threshold1'} w="50px" borderRadius="24%" />
                                    <Button variant="outline" colorScheme="blue" onClick={handleDec2HP} w="90px">
                                        Средний{' '}
                                    </Button>
                                    <CFieldInput name={'threshold2'} w="50px" borderRadius="24%" />
                                    <Button variant="outline" colorScheme="blue" onClick={handleDec3HP} w="90px">
                                        Cложный
                                    </Button>
                                </HStack>
                                <StatVisual current={currentHP} max={maxHP} />
                                <HStack>
                                    <InputGroup>
                                        <InputLeftAddon w="100px">Стресс</InputLeftAddon>
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
                                            textAlign={'center'}
                                            name="hp"
                                            onFocus={handleFocus}
                                            onChange={handleChangeMaxStress}
                                            value={maxStress}
                                            type="number"
                                            bgColor={'#DCDCDC'}
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
                                            <Input
                                                pl={4}
                                                placeholder="Название"
                                                borderRadius={'0px'}
                                                defaultValue={item.name}
                                                color="#396c96ff"
                                            />
                                            <Button
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
                                        <TextareaAutoSize
                                            placeholder="Описание"
                                            borderRadius={'0px'}
                                            border="1px solid #000000ff"
                                            defaultValue={item.description}
                                        />
                                    </Box>
                                ))}
                                <Button
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
                        <Button gap={4} mr={20} mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
                            Экспорт <ArrowRightIcon />
                        </Button>
                        <Button gap={4} onClick={handleDeleteItem} mt={4} colorScheme="red" isLoading={props.isSubmitting} type="button">
                            Удалить <DeleteIcon />
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};
