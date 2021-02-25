import React from 'react';
interface Props {
    title: string;
    icon: JSX.Element;
    keymapDescription: string;
    onClick: (ref: React.RefObject<HTMLElement>) => void;
    disabled?: boolean;
    isPressed?: boolean;
}
export declare class FindReplaceTooltipButton extends React.PureComponent<Props> {
    private buttonRef;
    static defaultProps: {
        keymapDescription: string;
    };
    handleClick: () => void;
    render(): JSX.Element;
}
export {};
