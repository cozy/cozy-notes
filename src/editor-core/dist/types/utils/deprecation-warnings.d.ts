export interface DeprecationWarning {
    property: string;
    description?: string;
    type?: string;
    condition?: (props: any) => boolean;
}
declare const deprecationWarnings: (className: string, props: any, deprecations: Array<DeprecationWarning>) => void;
export default deprecationWarnings;
