import React from 'react';
import { AnnotationTypes } from '@atlaskit/adf-schema';
import { AnnotationUpdateEmitter } from './update-provider';
export declare type AnnotationInfo = {
    id: string;
    type: AnnotationTypes.INLINE_COMMENT;
};
declare type AnnotationComponentProps = {
    /**
     * Selected text (can be used when creating a comment)
     */
    textSelection?: string;
    /**
     * DOM element around selected text (for positioning)
     */
    dom?: HTMLElement;
    /**
     * Indicates that a draft comment was discarded/cancelled
     */
    onClose?: () => void;
};
export declare type InlineCommentCreateComponentProps = AnnotationComponentProps & {
    /**
     * Creates an annotation mark in the document with the given id.
     */
    onCreate: (id: string) => void;
};
export declare type InlineCommentViewComponentProps = AnnotationComponentProps & {
    /**
     * Existing annotations where the cursor is placed.
     * These are provided in order, inner-most first.
     */
    annotations: Array<AnnotationInfo>;
    /**
     * Resolves an annotation with the given ID around the selection.
     */
    onResolve: (id: string) => void;
    /**
     * Removes the annotation from the document
     */
    onDelete?: (id: string) => void;
};
export interface AnnotationState<Type, State> {
    annotationType: Type;
    id: string;
    state: State;
}
export interface AnnotationTypeProvider<Type, State> {
    getState: (annotationIds: string[]) => Promise<AnnotationState<Type, State>[]>;
    updateSubscriber?: AnnotationUpdateEmitter;
    disallowOnWhitespace?: boolean;
}
export declare type InlineCommentState = {
    resolved: boolean;
};
export declare type InlineCommentAnnotationProvider = AnnotationTypeProvider<AnnotationTypes.INLINE_COMMENT, InlineCommentState> & {
    createComponent?: React.ComponentType<InlineCommentCreateComponentProps>;
    viewComponent?: React.ComponentType<InlineCommentViewComponentProps>;
    isToolbarAbove?: boolean;
};
export interface AnnotationProviders {
    inlineComment: InlineCommentAnnotationProvider;
}
export declare enum AnnotationSelectionType {
    INVALID = "invalid",
    DISABLED = "disabled",
    VALID = "valid"
}
export declare const AnnotationTestIds: {
    prefix: string;
    floatingComponent: string;
    floatingToolbarCreateButton: string;
    componentSave: string;
    componentClose: string;
};
export {};
