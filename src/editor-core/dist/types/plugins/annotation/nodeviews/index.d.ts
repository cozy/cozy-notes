import { ReactNodeView, ForwardRef } from '../../../nodeviews';
export declare class AnnotationNodeView extends ReactNodeView {
    createDomRef(): HTMLSpanElement;
    getContentDOM(): {
        dom: HTMLSpanElement;
    };
    render(_props: {}, forwardRef: ForwardRef): JSX.Element;
}
export declare const getAnnotationViewClassname: (isUnresolved: boolean, hasFocus: boolean) => string | undefined;
