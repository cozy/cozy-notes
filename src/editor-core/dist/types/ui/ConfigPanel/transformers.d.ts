import { FieldDefinition, Parameters, ExtensionManifest } from '@atlaskit/editor-common/extensions';
export declare const serialize: (manifest: ExtensionManifest, data: Parameters, fields: FieldDefinition[], depth?: number) => Promise<Parameters>;
export declare const deserialize: (manifest: ExtensionManifest, data: Parameters, fields: FieldDefinition[], depth?: number) => Promise<Parameters>;
