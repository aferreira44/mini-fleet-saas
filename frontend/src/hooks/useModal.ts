import { useCallback } from 'react';
import { useVisibility } from './useVisibility';

export interface UseModalOptions {
    onClose?: () => void;
    onOpen?: () => void;
}

export function useModal(options: UseModalOptions = {}) {
    const { isVisible, show, hide, toggle } = useVisibility();

    const handleClose = useCallback(() => {
        hide();
        options.onClose?.();
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
    };
} 