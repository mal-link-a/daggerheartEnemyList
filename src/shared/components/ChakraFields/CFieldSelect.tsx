import { Select } from '@chakra-ui/react';
import { FastField } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    name: string;
    placeholder: string;
    children: React.ReactNode;
}

export const CFieldSelect = ({ name, placeholder, children }: Props) => {
    return (
        <FastField name={name}>
            {({ field }: FieldMain) => (
                <Select border="1px solid #000000ff" {...field} placeholder={placeholder}>
                    {children}
                </Select>
            )}
        </FastField>
    );
};
