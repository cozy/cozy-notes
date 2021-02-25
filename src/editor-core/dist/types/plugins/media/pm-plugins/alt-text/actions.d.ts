export declare type CloseMediaAltTextMenu = {
    type: 'closeMediaAltTextMenu';
};
export declare type OpenMediaAltTextMenu = {
    type: 'openMediaAltTextMenu';
};
export declare type UpdateAltText = {
    type: 'updateAltText';
};
export declare type MediaAltTextAction = OpenMediaAltTextMenu | CloseMediaAltTextMenu | UpdateAltText;
