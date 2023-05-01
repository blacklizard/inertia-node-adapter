import { DefaultContext, Middleware, ParameterizedContext } from 'koa';
export interface Flash<FlashMessageType extends string = string> {
    setFlashMessage: (type: FlashMessageType, message: string) => number;
    setFlashMessages: (type: FlashMessageType, message: string[]) => number;
    flash: (type: FlashMessageType) => string[];
    flashAll: () => Record<FlashMessageType, string[]>;
}
export type FlashMiddleware = <FlashMessageType extends string>() => Middleware<ParameterizedContext<{
    flash: Flash<FlashMessageType>;
}, DefaultContext>>;
/**
 * Registers a middleware responsible for managing flash messages.
 * You can add a generic to the call to define the types of flash messages in your app
 * @example app.use(flash<"error" | "info" | "success">())
 *
 * @note It needs a session middleware in order to work. Has been tested with koa-session
 */
declare const flash: FlashMiddleware;
export default flash;
//# sourceMappingURL=koaFlash.d.ts.map