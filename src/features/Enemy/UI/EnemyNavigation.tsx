import { Box } from '@chakra-ui/react';
import { useEnemyStore } from '../model/store';

export const EnemyNavigation = () => {
    const enemies = useEnemyStore(state => state.enemies);

    return (
        <Box w="280px" as="nav" position="sticky" top="20px">
            <ol>
                {enemies.map((item, index) => (
                    <li key={item.name + index}>
                        <a href={`#enemyItem-${index}`}>{item.name}</a>{' '}
                    </li>
                ))}
            </ol>
        </Box>
    );
};
