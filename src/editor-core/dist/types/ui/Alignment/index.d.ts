import { PureComponent } from 'react';
import { AlignmentState } from '../../plugins/alignment/pm-plugins/types';
export interface Props {
    selectedAlignment?: string;
    onClick: (value: AlignmentState) => void;
    className?: string;
}
export default class Alignment extends PureComponent<Props, any> {
    render(): JSX.Element;
}
