import { EditorView } from 'prosemirror-view';
declare type Props = {
    view?: EditorView;
    currentColor?: string;
    title?: string;
    onChange?: (color: string) => void;
};
export declare const ColorPickerButton: (props: Props) => JSX.Element;
export {};
