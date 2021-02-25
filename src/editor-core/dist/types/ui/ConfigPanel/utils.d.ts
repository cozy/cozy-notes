import { Option, FieldDefinition, Parameters } from '@atlaskit/editor-common/extensions';
import { ValidationError, Entry } from './types';
export declare const validate: <T>(field: Partial<FieldDefinition>, value: T) => ValidationError | undefined;
export declare const fromEntries: <T>(iterable: Entry<T>[]) => Parameters;
declare type ValidationProps = {
    isRequired?: boolean;
    isMultiple?: boolean;
};
export declare const validateRequired: <T>({ isRequired, isMultiple }: ValidationProps, value: T) => ValidationError | undefined;
export declare const getOptionFromValue: (options: Option[], value: string | string[] | undefined) => Option | Option[] | undefined;
export declare const getSafeParentedName: (name: string, parentName?: string | undefined) => string;
export {};
