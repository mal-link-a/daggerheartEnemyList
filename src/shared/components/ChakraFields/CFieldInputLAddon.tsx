import { InputGroup, InputLeftAddon, Input } from '@chakra-ui/react';
import { Field } from 'formik';
import type { FieldMain } from './types/types';

interface Props {
    disabled?: boolean;
    name: string;
    addonWidth: string;
    addonLabel: string;
}

export const CFieldInputLAddon = ({ name, addonLabel, addonWidth, disabled }: Props) => {
    return (
        <Field name={name}>
            {({ field }: FieldMain) => (
                <InputGroup>
                    <InputLeftAddon bg={'gray.200'} w={addonWidth}>
                        {addonLabel}
                    </InputLeftAddon>
                    <Input disabled={disabled} textAlign="center" {...field} />
                </InputGroup>
            )}
        </Field>
    );
};
