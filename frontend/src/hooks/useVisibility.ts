import { useState, useCallback } from 'react';

export function useVisibility(initialState = false) {
    const [isVisible, setIsVisible] = useState(initialState);

    const show = useCallback(() => {
        setIsVisible(true);
    }, []);

    const hide = useCallback(() => {
        setIsVisible(false);
    }, []);

    const toggle = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    return {
        isVisible,
        show,
        hide,
        toggle,
    };
} 