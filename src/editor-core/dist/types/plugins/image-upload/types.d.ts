export type { InsertedImageProperties, ImageUploadProvider as ImageUploadHandler, } from '@atlaskit/editor-common/provider-factory';
export declare type ImageUploadPluginAction = {
    name: 'START_UPLOAD';
    event?: Event;
};
export declare type ImageUploadPluginState = {
    active: boolean;
    enabled: boolean;
    hidden: boolean;
    activeUpload?: {
        event?: Event;
    };
};
