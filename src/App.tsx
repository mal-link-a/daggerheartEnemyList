import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import { EnemyList } from './features/Enemy/UI/EnemyList';
import { theme } from './app/styles/chakra/theming';

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <EnemyList />
            </ChakraProvider>
        </>
    );
}

export default App;
