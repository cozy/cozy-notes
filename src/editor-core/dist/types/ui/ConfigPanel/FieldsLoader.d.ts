import { ExtensionProvider, ExtensionType, ExtensionKey, Parameters } from '@atlaskit/editor-common/extensions';
export declare type PublicProps = {
    extensionProvider: ExtensionProvider;
    extensionType: ExtensionType;
    extensionKey: ExtensionKey;
    nodeKey: string;
    extensionParameters?: Parameters;
    parameters?: Parameters;
    autoSave?: boolean;
    autoSaveTrigger?: unknown;
    closeOnEsc?: boolean;
    showHeader?: boolean;
    onChange: (data: Parameters) => void;
    onCancel: () => void;
};
export default function FieldsLoader({ extensionType, extensionKey, nodeKey, extensionProvider, extensionParameters, parameters, autoSave, autoSaveTrigger, closeOnEsc, showHeader, onChange, onCancel, }: PublicProps): JSX.Element;
