import { useState } from 'react';

export function useForm(callback, initialValues, validateFn) {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        const fieldToTrim = ['email', 'password', 'confirmPassword', 'name'];

        let trimmedValue = value.trimStart();
        if (fieldToTrim.includes(name)) {
            trimmedValue = value.trim();
        }

        if (formErrors[name]) {
            setFormErrors((state) => {
                const newState = { ...state };
                delete newState[name];
                return newState;
            });
        }

        setFormValues((state) => ({
            ...state,
            [name]: trimmedValue,
        }));
    };

    const formAction = (e) => {
        if (e && typeof e.preventDefault === 'function') {
            e.preventDefault();
        }

        if (validateFn) {
            const validationErrors = validateFn(formValues);
            if (Object.keys(validationErrors).length > 0) {
                setFormErrors(validationErrors);
                return;
            }
        }

        setFormErrors({});
        callback(formValues);
    };

    const inputPropertiesRegister = (inputName) => {
        return {
            name: inputName,
            onChange: changeHandler,
            value: formValues[inputName] || '',
        };
    };

    return {
        formValues,
        changeHandler,
        formAction,
        formErrors,
        setFormErrors,
        setFormValues,
        inputPropertiesRegister,
    };
}
