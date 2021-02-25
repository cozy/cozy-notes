import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { QuickInsertItem } from '@atlaskit/editor-common/provider-factory';
export interface State {
    isOpen: boolean;
}
export interface Props {
    getItems: (query?: string, category?: string) => QuickInsertItem[];
    onInsertItem: (item: QuickInsertItem) => void;
    isOpen?: boolean;
    onClose: () => void;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
