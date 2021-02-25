import React from 'react';
export declare type AnnotationViewWrapperProps = {
    children: React.ReactNode;
    onViewed?: () => void;
    annotationText?: string;
};
export declare class AnnotationViewWrapper extends React.PureComponent<AnnotationViewWrapperProps> {
    componentDidMount(): void;
    render(): React.ReactNode;
}
