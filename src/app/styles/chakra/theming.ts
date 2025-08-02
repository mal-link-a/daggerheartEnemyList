import { defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';
import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);
// Глобальный стиль для компонента Input
const Input = defineStyleConfig({
    baseStyle: {
        field: {
            color: 'black',
            background: 'pink.100',
            padding: '0',
            _disabled: {
                bg: 'white',
            },
        },
    },
    variants: {
        filled: {
            field: {
                border: '1px solid black',
                borderColor: 'black.500',
                bg: 'blue.100',
                _disabled: {
                    fontWeight: 600,
                    opacity: 1,
                },
            },
        },
    },
    defaultProps: {
        variant: 'filled',
    },
});

const customVariant = defineStyle({
    border: '1px solid #000000ff',
    color: 'blue.700',
    bg: 'gray.200',
    _focus: {
        borderColor: 'blue.500',
        color: 'blue.500',
        bg: 'white',
    },
    _disabled: {
        color: 'gray.600',
        bg: 'white',
        fontWeight: '700',
        opacity: 1,
    },
});

const textareaTheme = defineStyleConfig({
    variants: {
        customVariant,
    },
});

const baseStyle = definePartsStyle({
    // define the part you're going to style
    field: {
        background: 'gray.100',
        _disabled: {
            opacity: 1,
            background: 'white',
            fontWeight: 600,
        },
    },
    icon: {
        color: 'blue.400',
    },
});
export const selectTheme = defineMultiStyleConfig({ baseStyle });

// Экспорт глобальной темы
export const theme = extendTheme({
    styles: {
        global: {},
    },
    components: {
        Input,
        Textarea: textareaTheme,
        Select: selectTheme,
    },
});
