import { defineStyleConfig, extendTheme } from '@chakra-ui/react';

// Глобальный стиль для компонента Input
const Input = defineStyleConfig({
    baseStyle: {
        field: {
            color: 'black',
            background: 'pink.100',
            padding: '0',
            // _placeholder: {
            //     color: '#5F9EA0',
            // },
            // _focus: {
            //     boxShadow: '0 0 0 1px pink.500',
            // },
        },
    },
    variants: {
        filled: {
            field: {
                border: '1px solid black',
                borderColor: 'black.500',
                bg: 'gray.200',
            },
        },
    },
    defaultProps: {
        variant: 'filled',
    },
});

// Экспорт глобальной темы
export const theme = extendTheme({
    styles: {
        global: {},
    },
    components: {
        Input,
    },
});
