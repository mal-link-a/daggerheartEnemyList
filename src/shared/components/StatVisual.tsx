import { HStack } from '@chakra-ui/react';
import { RhombusFillIcon } from '../icons/RhombusFillIcon';
import { RhombusIcon } from '../icons/RhombusIcon';

interface Props {
    current: number | null;
    max: number | null;
}

export const StatVisual = ({ current, max }: Props) => {
    const data = () => {
        const arr = [];
        if (current != null && max != null) {
            for (let i = 0; i < max - current; i++) {
                arr.push(<RhombusFillIcon key={i + 'RhombusIcon'} />);
            }
            for (let i = 0; i < current; i++) {
                arr.push(<RhombusIcon key={i + 'RhombusFillIcon'} />);
            }
            return arr;
        }
        return;
    };
    if (current == null || max == null || max === 0) {
        return <p>............</p>;
    }

    return (
        <HStack h="40px" ml="10px" gap="0.2rem">
            {data()}
        </HStack>
    );
};
