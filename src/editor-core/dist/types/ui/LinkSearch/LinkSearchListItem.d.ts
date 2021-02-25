import React from 'react';
import { HTMLAttributes, ComponentClass } from 'react';
import { LinkSearchListItemData } from './types';
import { InjectedIntlProps } from 'react-intl';
interface ContainerProps {
    selected: boolean;
}
export declare const Container: import("styled-components").StyledComponentClass<React.ClassAttributes<HTMLLIElement> & React.LiHTMLAttributes<HTMLLIElement> & ContainerProps, any, React.ClassAttributes<HTMLLIElement> & React.LiHTMLAttributes<HTMLLIElement> & ContainerProps>;
export declare const Name: ComponentClass<HTMLAttributes<{}>>;
export declare const ContainerName: ComponentClass<React.HTMLAttributes<{}>>;
export interface Props {
    item: LinkSearchListItemData;
    selected: boolean;
    onSelect: (href: string, text: string) => void;
    onMouseMove: (objectId: string) => void;
}
declare const _default: React.ComponentClass<Props, any> & {
    WrappedComponent: ReactIntl.ComponentConstructor<Props & InjectedIntlProps>;
};
export default _default;
