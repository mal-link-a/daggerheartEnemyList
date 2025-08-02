import { Input } from '@chakra-ui/react';
import { Field } from 'formik';
import type { FieldMain } from './types/types';
import type { ChangeEvent } from 'react';

interface Props {
    disabled?: boolean;
    placeholder?: string;
    name: string;
    fontSize?: string;
    w?: string;
    h?: string;
    borderRadius?: string;
    borderLeftRadius?: string;
    borderRightRadius?: string;
    onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CFieldInput = ({
    name,
    fontSize,
    w,
    h,
    borderRadius,
    borderLeftRadius,
    borderRightRadius,
    placeholder,
    onFocus,
    disabled,
}: Props) => {
    return (
        <Field name={name}>
            {({ field }: FieldMain) => (
                <Input
                    textAlign={'center'}
                    disabled={disabled}
                    w={w}
                    h={h}
                    fontSize={fontSize}
                    borderRadius={borderRadius}
                    borderLeftRadius={borderLeftRadius}
                    borderRightRadius={borderRightRadius}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    {...field}
                />
            )}
        </Field>
    );
};
