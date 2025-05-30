import { useState, useCallback } from 'react';

interface FormState<T> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
}

interface UseFormProps<T> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: UseFormProps<T>) {
    const [formState, setFormState] = useState<FormState<T>>({
        values: initialValues,
        errors: {},
        touched: {},
    });

    const handleChange = useCallback((field: keyof T) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormState((prev) => ({
            ...prev,
            values: {
                ...prev.values,
                [field]: value,
            },
            touched: {
                ...prev.touched,
                [field]: true,
            },
        }));
    }, []);

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();

        if (validate) {
            const errors = validate(formState.values);
            setFormState((prev) => ({
                ...prev,
                errors,
            }));

            if (Object.keys(errors).length > 0) {
                return;
            }
        }

        await onSubmit(formState.values);
    }, [formState.values, validate, onSubmit]);

    return {
        values: formState.values,
        errors: formState.errors,
        touched: formState.touched,
        handleChange,
        handleSubmit,
    };
} 