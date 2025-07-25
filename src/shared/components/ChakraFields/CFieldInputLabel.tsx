import { Input } from '@chakra-ui/react';
import { FastField } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    name: string;
    label: string;
    children?: React.ReactNode;
}

export const CFieldInputLabel = ({ name, label }: Props) => {
    return (
        <FastField name={name}>
            {({ field }: FieldMain) => (
                <label>
                    <Input w="100px" textAlign="center" {...field} />
                    {label}
                </label>
            )}
        </FastField>
    );
};
