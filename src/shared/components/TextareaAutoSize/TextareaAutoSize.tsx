import { Textarea } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

interface Props {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    defaultValue?: string;
    fontSize?: string;
    id?: string;
    borderRadius?: string;
    border?: string;
    placeholder?: string;
    index?: number;
    disabled?: boolean;
}

//Попытки сделать простой textarea с авторазмером
export const TextareaAutoSize = ({
    value,
    onBlur,
    onChange,
    defaultValue,
    fontSize,
    id,
    borderRadius,
    border,
    placeholder,
    index,
    disabled,
}: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    function textAreaAdjust(this: HTMLTextAreaElement) {
        if (!this) return;
        this.style.height = 'auto';
        this.style.height = 5 + this.scrollHeight + 'px';
    }

    //Вешаем слушатели
    useEffect(() => {
        const area = ref.current;
        if (!area) return;
        area.addEventListener('input', textAreaAdjust);
        area.addEventListener('cut', textAreaAdjust);
        area.addEventListener('paste', textAreaAdjust);
        textAreaAdjust.call(area);
        return () => {
            area.removeEventListener('input', textAreaAdjust);
            area.removeEventListener('cut', textAreaAdjust);
            area.removeEventListener('paste', textAreaAdjust);
        };
    }, []);

    return (
        <Textarea
            disabled={disabled}
            variant={'customVariant'}
            data-index={index}
            placeholder={placeholder}
            border={border}
            borderRadius={borderRadius}
            id={id}
            defaultValue={defaultValue}
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            fontSize={fontSize}
            textAlign="center"
            ref={ref}
        />
    );
};
