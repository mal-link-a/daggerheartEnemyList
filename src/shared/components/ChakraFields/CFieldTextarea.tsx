import { FastField } from 'formik';
import type { FieldMain } from './types/types';
import { TextareaAutoSize } from '../TextareaAutoSize/TextareaAutoSize';

interface Props {
    name: string;
    fontSize?: string;
    border?: string;
}

export const CFieldTextarea = ({ name, fontSize, border }: Props) => {
    return (
        <FastField name={name}>
            {({ field }: FieldMain) => <TextareaAutoSize id={name} border={border} fontSize={fontSize} {...field} />}
        </FastField>
    );
};
// This component uses FastField from Formik to create a textarea field that automatically resizes based on its content.
// The `name` prop is used to identify the field in the Formik form state,
