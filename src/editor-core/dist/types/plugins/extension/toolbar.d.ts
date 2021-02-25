import { FloatingToolbarHandler } from '../floating-toolbar/types';
export declare const messages: {
    edit: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export declare const getToolbarConfig: (breakoutEnabled?: boolean) => FloatingToolbarHandler;
