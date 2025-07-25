export interface FieldMain {
    field: FieldType;
}
type FieldType = {
    name: string;
    onBlur: never;
    onChange: never;
    value: string;
};
