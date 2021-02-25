import React from 'react';
import { InjectedIntlProps } from 'react-intl';
interface Props {
    contentRef: any;
    showPlaceholder?: boolean;
}
export declare class Decision extends React.Component<Props & InjectedIntlProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
