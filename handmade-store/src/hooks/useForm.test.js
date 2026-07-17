import { renderHook, act } from '@testing-library/react';
import { useForm } from './useForm';

function makeChangeEvent(name, value) {
    return { target: { name, value } };
}

describe('useForm', () => {
    describe('initial state', () => {
        it('initializes formValues from initialValues', () => {
            const { result } = renderHook(() => useForm(vi.fn(), { username: 'bob' }));
            expect(result.current.formValues).toEqual({ username: 'bob' });
        });

        it('initializes formErrors as an empty object', () => {
            const { result } = renderHook(() => useForm(vi.fn(), {}));
            expect(result.current.formErrors).toEqual({});
        });
    });

    describe('changeHandler', () => {
        it('updates the field with the new value', () => {
            const { result } = renderHook(() => useForm(vi.fn(), { username: '' }));

            act(() => result.current.changeHandler(makeChangeEvent('username', 'alice')));

            expect(result.current.formValues.username).toBe('alice');
        });

        it('fully trims values for email/password/confirmPassword fields', () => {
            const { result } = renderHook(() =>
                useForm(vi.fn(), { email: '', password: '', confirmPassword: '' })
            );

            act(() => result.current.changeHandler(makeChangeEvent('email', '  test@test.com  ')));
            act(() => result.current.changeHandler(makeChangeEvent('password', '  secret  ')));
            act(() => result.current.changeHandler(makeChangeEvent('confirmPassword', '  secret  ')));

            expect(result.current.formValues.email).toBe('test@test.com');
            expect(result.current.formValues.password).toBe('secret');
            expect(result.current.formValues.confirmPassword).toBe('secret');
        });

        it('only trims leading whitespace (trimStart) for other fields', () => {
            const { result } = renderHook(() => useForm(vi.fn(), { name: '' }));

            act(() => result.current.changeHandler(makeChangeEvent('name', '  John Doe  ')));

            expect(result.current.formValues.name).toBe('John Doe  ');
        });

        it('clears an existing error for the field being changed', () => {
            const validateFn = vi.fn(() => ({ username: 'Required' }));
            const { result } = renderHook(() => useForm(vi.fn(), { username: '' }, validateFn));

            act(() => result.current.formAction());
            expect(result.current.formErrors).toEqual({ username: 'Required' });

            act(() => result.current.changeHandler(makeChangeEvent('username', 'alice')));

            expect(result.current.formErrors).toEqual({});
        });

        it('leaves other field errors untouched when a different field changes', () => {
            const validateFn = vi.fn(() => ({ username: 'Required', email: 'Required' }));
            const { result } = renderHook(() =>
                useForm(vi.fn(), { username: '', email: '' }, validateFn)
            );

            act(() => result.current.formAction());
            act(() => result.current.changeHandler(makeChangeEvent('username', 'alice')));

            expect(result.current.formErrors).toEqual({ email: 'Required' });
        });
    });

    describe('formAction', () => {
        it('calls preventDefault when given an event', () => {
            const preventDefault = vi.fn();
            const { result } = renderHook(() => useForm(vi.fn(), {}));

            act(() => result.current.formAction({ preventDefault }));

            expect(preventDefault).toHaveBeenCalled();
        });

        it('does not throw when called without an event', () => {
            const { result } = renderHook(() => useForm(vi.fn(), {}));
            expect(() => act(() => result.current.formAction())).not.toThrow();
        });

        it('calls the callback with formValues when there is no validateFn', () => {
            const callback = vi.fn();
            const { result } = renderHook(() => useForm(callback, { username: 'alice' }));

            act(() => result.current.formAction());

            expect(callback).toHaveBeenCalledWith({ username: 'alice' });
        });

        it('does not call the callback when validation fails', () => {
            const callback = vi.fn();
            const validateFn = vi.fn(() => ({ username: 'Required' }));
            const { result } = renderHook(() => useForm(callback, { username: '' }, validateFn));

            act(() => result.current.formAction());

            expect(callback).not.toHaveBeenCalled();
            expect(result.current.formErrors).toEqual({ username: 'Required' });
        });

        it('calls the callback and clears errors when validation passes', () => {
            const callback = vi.fn();
            const validateFn = vi.fn(() => ({}));
            const { result } = renderHook(() => useForm(callback, { username: 'alice' }, validateFn));

            act(() => result.current.formAction());

            expect(callback).toHaveBeenCalledWith({ username: 'alice' });
            expect(result.current.formErrors).toEqual({});
        });
    });

    describe('inputPropertiesRegister', () => {
        it('returns name, onChange and the current value for a field', () => {
            const { result } = renderHook(() => useForm(vi.fn(), { username: 'alice' }));

            const props = result.current.inputPropertiesRegister('username');

            expect(props.name).toBe('username');
            expect(props.value).toBe('alice');
            expect(typeof props.onChange).toBe('function');
        });

        it('falls back to an empty string when the field is not set', () => {
            const { result } = renderHook(() => useForm(vi.fn(), {}));

            const props = result.current.inputPropertiesRegister('missingField');

            expect(props.value).toBe('');
        });
    });
});
