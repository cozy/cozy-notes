export declare const getOffsetParent: (editorViewDom: HTMLElement, popupsMountPoint?: HTMLElement | undefined) => HTMLElement;
export declare const getNearestNonTextNode: (node: Node) => HTMLElement;
export declare const handlePositionCalculatedWith: (offsetParent: HTMLElement, node: Node, getCurrentFixedCoordinates: () => any) => (position: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}) => {
    top?: number | undefined;
    left?: number | undefined;
    bottom?: number | undefined;
    right?: number | undefined;
};
