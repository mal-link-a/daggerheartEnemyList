import { Input } from '@chakra-ui/react';
import { Field } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    disabled: boolean;
    name: string;
    label: string;
    children?: React.ReactNode;
}

export const CFieldInputLabel = ({ name, label, disabled }: Props) => {
    return (
        <Field name={name}>
            {({ field }: FieldMain) => (
                <label>
                    <Input disabled={disabled} w="100px" textAlign="center" {...field} />
                    {label}
                </label>
            )}
        </Field>
    );
};
