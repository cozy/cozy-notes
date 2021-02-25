import React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Icon } from '@atlaskit/editor-common/extensions';
declare type Props = {
    title: string;
    description?: string;
    summary?: string;
    documentationUrl?: string;
    icon: Icon;
    onClose: () => void;
} & InjectedIntlProps;
declare const _default: React.ComponentClass<{
    title: string;
    description?: string | undefined;
    summary?: string | undefined;
    documentationUrl?: string | undefined;
    icon: Icon;
    onClose: () => void;
}, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props>;
};
export default _default;
