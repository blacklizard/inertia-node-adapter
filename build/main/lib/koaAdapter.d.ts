import type { Context, DefaultContext, DefaultState, Middleware, ParameterizedContext } from 'koa';
type props = Record<string | number | symbol, unknown>;
export type Options = {
    readonly version: string;
    readonly html: (page: Page, viewData: props) => string;
    readonly flashMessages?: (context: DefaultContext & Record<string, unknown>) => props;
};
export type Page = {
    readonly component: string;
    props: props;
    readonly url: string;
    readonly version: string;
};
export type Inertia = {
    readonly setViewData: (viewData: props) => Inertia;
    readonly shareProps: (sharedProps: props) => Inertia;
    readonly setStatusCode: (statusCode: number) => Inertia;
    readonly setHeaders: (headers: Record<string, string>) => Inertia;
    readonly render: (Page: Page) => Promise<Inertia>;
    readonly redirect: (url: string) => Context;
};
export declare const headers: {
    xInertia: string;
    xInertiaVersion: string;
    xInertiaLocation: string;
    xInertiaPartialData: string;
    xInertiaPartialComponent: string;
};
declare const inertia: (options: Options) => Middleware<ParameterizedContext<DefaultState, DefaultContext>>;
export default inertia;
//# sourceMappingURL=koaAdapter.d.ts.map