export declare type FormResult = {
    [key: string]: string | number | string[] | number[] | undefined;
};
export declare enum ValidationError {
    Required = "required",
    Invalid = "invalid"
}
export declare enum FieldTypeError {
    isMultipleAndRadio = "isMultipleAndRadio"
}
export declare type Entry<T> = [string, T];
export declare type OnBlur = (name: string) => void;
