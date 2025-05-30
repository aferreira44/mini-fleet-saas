import { useCallback } from 'react';
import { useVisibility } from './useVisibility';

export interface UseDrawerOptions {
    onClose?: () => void;
    onOpen?: () => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
}

export function useDrawer(options: UseDrawerOptions = {}) {
    const { isVisible, show, hide, toggle } = useVisibility();

    const handleClose = useCallback((_: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
            hide();
            options.onClose?.();
        }
    }, [hide, options.onClose]);

    const handleOpen = useCallback(() => {
        show();
        options.onOpen?.();
    }, [show, options.onOpen]);

    return {
        isOpen: isVisible,
        open: handleOpen,
        close: handleClose,
        toggle,
        anchor: options.anchor || 'left',
    };
} 