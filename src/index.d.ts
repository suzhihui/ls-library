declare module 'vite' {
    interface PluginContext {
        /**
         * 输出警告信息
         * @param msg 警告内容
         */
        warn(msg: string): void;
    }
}
import type { PluginOption } from "vite";
type HookBindPluginOptions = {
    prefix?: string;
    bindKey?: string;
    eventKey?: string;
    inheritAttrs?: boolean;
};
export default function hookBind(options?: HookBindPluginOptions): PluginOption;
export {};
