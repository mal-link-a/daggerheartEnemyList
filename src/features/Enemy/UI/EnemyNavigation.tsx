import { Box } from '@chakra-ui/react';
import { useEnemyStore } from '../model/store';

//Навигация по листам врагов.
//В идеале с ростом приложения не забыть вывести id-ссылки на листы в некий файл роутинга.
export const EnemyNavigation = () => {
    const enemies = useEnemyStore(state => state.enemies);

    return (
        <Box listStylePos={'inside'} w="280px" as="nav" top="20px" minH={'500px'}>
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
