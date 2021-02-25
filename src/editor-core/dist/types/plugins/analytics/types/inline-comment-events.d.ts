import { TrackAEP } from './utils';
import { ACTION, ACTION_SUBJECT_ID, ACTION_SUBJECT, INPUT_METHOD } from './enums';
export declare type AnnotationActionType = ACTION.INSERTED | ACTION.CLOSED | ACTION.EDITED | ACTION.DELETED | ACTION.OPENED | ACTION.RESOLVED | ACTION.VIEWED;
export declare type AnnotationAEP = TrackAEP<AnnotationActionType, ACTION_SUBJECT.ANNOTATION, ACTION_SUBJECT_ID.INLINE_COMMENT, AnnotationAEPAttributes, undefined>;
export declare type AnnotationAEPAttributes = AnnotationDraftAEPAttributes | AnnotationResolvedAEPAttributes;
export declare type AnnotationDraftAEPAttributes = {
    inputMethod?: INPUT_METHOD.TOOLBAR | INPUT_METHOD.SHORTCUT;
    overlap?: number;
};
export declare type AnnotationResolvedAEPAttributes = {
    method?: RESOLVE_METHOD;
};
export declare enum RESOLVE_METHOD {
    COMPONENT = "component",
    CONSUMER = "consumer",
    ORPHANED = "orphaned"
}
