import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react';
import { FastField } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    name: string;
    addonWidth: string;
    addonLabel: string;
}

export const CFieldInputLAddon = ({ name, addonLabel, addonWidth }: Props) => {
    return (
        <FastField name={name}>
            {({ field }: FieldMain) => (
                <InputGroup>
                    <InputLeftAddon w={addonWidth}>{addonLabel}</InputLeftAddon>
                    <Input textAlign="center" {...field} />
                </InputGroup>
            )}
        </FastField>
    );
};
