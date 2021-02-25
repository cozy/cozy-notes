import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Coordinates } from '../../../../ui/FloatingToolbar';
export declare const messages: {
    placeholderTextPlaceholder: {
        id: string;
        defaultMessage: string;
        description: string;
    };
};
export interface Props {
    getNodeFromPos: (pos: number) => Node;
    getFixedCoordinatesFromPos: (pos: number) => Coordinates;
    insertPlaceholder: (value: string) => void;
    hidePlaceholderFloatingToolbar: () => void;
    setFocusInEditor: () => void;
    showInsertPanelAt: number;
    editorViewDOM: HTMLElement;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
