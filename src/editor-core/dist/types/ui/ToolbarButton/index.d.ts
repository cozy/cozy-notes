import React from 'react';
import { PositionType } from '@atlaskit/tooltip';
import { ButtonProps } from '@atlaskit/button/types';
import { MenuItem } from '../DropdownMenu/types';
export declare type Props = {
    className?: string;
    disabled?: boolean;
    hideTooltip?: boolean;
    href?: string;
    iconAfter?: React.ReactElement<any>;
    iconBefore?: React.ReactElement<any>;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onItemClick?: (item: MenuItem) => void;
    selected?: boolean;
    spacing?: 'default' | 'compact' | 'none';
    target?: string;
    title?: React.ReactNode;
    titlePosition?: PositionType;
    item?: MenuItem;
    testId?: string;
} & Pick<ButtonProps, 'aria-label'>;
export default class ToolbarButton extends React.PureComponent<Props, {}> {
    static defaultProps: {
        className: string;
        titlePosition: PositionType;
    };
    private handleClick;
    render(): JSX.Element;
}
