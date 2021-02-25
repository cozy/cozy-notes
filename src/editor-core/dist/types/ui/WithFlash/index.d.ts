import React from 'react';
export interface Props {
    animate: boolean;
    children?: any;
}
export default class WithFlash extends React.Component<Props> {
    private toggle;
    render(): JSX.Element;
}
