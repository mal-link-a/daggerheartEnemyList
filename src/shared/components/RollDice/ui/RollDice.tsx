import { Button, Text, Input } from '@chakra-ui/react';
import { VStack, HStack } from '@chakra-ui/react/stack';
import { type ChangeEvent } from 'react';
import { useRollStore } from '../model/useRollStore';

export const RollDice = () => {
    const result = useRollStore(state => state.result);
    const rolled = useRollStore(state => state.rolled);
    const dices = useRollStore(state => state.dices);
    const setDices = useRollStore(state => state.setDices);
    const rollDices = useRollStore(state => state.rollDices);

    const handleChangeDice = (e: ChangeEvent<HTMLInputElement>) => {
        setDices(e.target.value);
    };
    const handleRoll = () => {
        rollDices(dices);
    };

    return (
        <VStack overflow="visible" w="280px" boxShadow={'0px 0px 50px -3px hsla(240, 14%, 50%, 0.57)'} border="1px solid black" p={2}>
            <HStack>
                <Text>Кубики</Text>
                <Button colorScheme="teal" onClick={handleRoll}>
                    Бросить!
                </Button>
            </HStack>
            <Input textAlign={'center'} bg="rgba(216, 255, 203, 1)" value={dices ?? ''} onChange={handleChangeDice}></Input>
            <Text fontSize={32}>{result}</Text>
            <Text fontSize={18}>{rolled.join(' | ')}</Text>
        </VStack>
    );
};
