import {LogicInterface} from "./LogicInterface";

export interface DBModelInterface {
    toLogic(): LogicInterface;
}