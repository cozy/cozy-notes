import { EditorPlugin } from '../../types';
import { AnnotationProviders, InlineCommentAnnotationProvider, AnnotationInfo, AnnotationState, InlineCommentState, InlineCommentCreateComponentProps, InlineCommentViewComponentProps, AnnotationTypeProvider } from './types';
import { UpdateEvent, AnnotationUpdateEmitter } from './update-provider';
declare const annotationPlugin: (annotationProviders?: AnnotationProviders | undefined) => EditorPlugin;
export default annotationPlugin;
export { AnnotationUpdateEmitter };
export type { AnnotationProviders, InlineCommentAnnotationProvider, InlineCommentCreateComponentProps, InlineCommentViewComponentProps, AnnotationTypeProvider, AnnotationInfo, AnnotationState, InlineCommentState, UpdateEvent, };
