import { Select } from '@chakra-ui/react';
import { Field } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    name: string;
    placeholder: string;
    disabled?: boolean;
    children: React.ReactNode;
}

export const CFieldSelect = ({ name, placeholder, children, disabled }: Props) => {
    return (
        <Field name={name}>
            {({ field }: FieldMain) => (
                <Select disabled={disabled} variant={'customVariant'} border="1px solid #000000ff" {...field} placeholder={placeholder}>
                    {children}
                </Select>
            )}
        </Field>
    );
};
