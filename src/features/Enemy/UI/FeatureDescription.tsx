import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Roll from 'roll';
import { useRollStore } from '../../../shared/components/RollDice/model/useRollStore';

interface Props {
    text: string;
}

export const FeatureDescription = ({ text }: Props) => {
    const [description, setDescription] = useState<React.ReactNode[]>([]);
    const rollDices = useRollStore(state => state.rollDices);
    const roll = new Roll(); //Только для валидации

    const handleRoll = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        const dice = e.currentTarget.dataset.roll;
        if (dice) rollDices(dice);
    };

    const generateInfoBlock = () => {
        const regular = new RegExp('[ ,.?!]');
        const value = text;
        let parsed = '';
        const data = [];
        if (value == null) return;
        for (let i = 0; i < value.length; i++) {
            if (value[i].search(regular) == 0 && roll.validate(parsed)) {
                data.push(
                    <Button data-roll={parsed} key={'unique key prop' + i} onClick={handleRoll} display={'contents'} color="blue">
                        {`${parsed}`}
                    </Button>,
                );
                data.push(`${value[i]} `);
                parsed = '';
            } else if (value[i].search(regular) == 0) {
                data.push(`${parsed}`);
                data.push(`${value[i]} `);
                parsed = '';
            } else {
                parsed = parsed + value[i];
            }
        }
        if (roll.validate(parsed)) {
            data.push(
                <Button data-roll={parsed} key={'unique key prop last'} onClick={handleRoll} display={'contents'} color="blue">
                    {parsed}
                </Button>,
            );
        } else {
            data.push(`${parsed}`);
        }
        setDescription(data);
    };

    useEffect(() => {
        generateInfoBlock();
    }, []);

    return (
        <Box p={1} bg="gray.200" zIndex={100} textAlign={'left'} pt={2} pl={4} borderRadius="0px" border="1px solid black">
            {description[0] ? description : 'Пустое описание'}
        </Box>
    );
};
