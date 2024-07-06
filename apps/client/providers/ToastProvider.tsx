'use client';

import { Toast, ToastClose, ToastDescription, Toaster, ToastTitle, ToastViewport } from 'components/core/Toast';
import { useToast } from 'hooks/useToast';

export function ToastProvider() {
    const { toasts } = useToast();

    return (
        <Toaster>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1">
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                        <ToastClose />
                    </Toast>
                );
            })}
            <ToastViewport />
        </Toaster>
    );
}
