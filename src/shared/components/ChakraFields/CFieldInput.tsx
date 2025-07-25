import { Input } from '@chakra-ui/react';
import { FastField } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    placeholder?: string;
    name: string;
    fontSize?: string;
    w?: string;
    h?: string;
    borderRadius?: string;
    borderLeftRadius?: string;
    borderRightRadius?: string;
}

export const CFieldInput = ({ name, fontSize, w, h, borderRadius, borderLeftRadius, borderRightRadius, placeholder }: Props) => {
    return (
        <FastField name={name}>
            {({ field }: FieldMain) => (
                <Input
                    w={w}
                    h={h}
                    fontSize={fontSize}
                    borderRadius={borderRadius}
                    borderLeftRadius={borderLeftRadius}
                    borderRightRadius={borderRightRadius}
                    textAlign="center"
                    placeholder={placeholder}
                    {...field}
                />
            )}
        </FastField>
    );
};
