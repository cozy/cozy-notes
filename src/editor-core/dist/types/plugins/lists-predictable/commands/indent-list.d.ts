import { Command } from '../../../types';
import { INPUT_METHOD } from '../../analytics';
declare type InputMethod = INPUT_METHOD.KEYBOARD | INPUT_METHOD.TOOLBAR;
export declare function indentList(inputMethod?: InputMethod): Command;
export {};
