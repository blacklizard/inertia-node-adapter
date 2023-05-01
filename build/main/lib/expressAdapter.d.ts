import { RequestHandler, Response } from 'express';
type props = Record<string | number | symbol, unknown>;
export type Options = {
    readonly enableReload?: boolean;
    readonly version: string;
    readonly html: (page: Page, viewData: props) => string;
    readonly flashMessages?: (req: unknown) => props;
};
export type Page = {
    readonly component: string;
    props: props;
    readonly url?: string;
    readonly version?: string;
};
export type Inertia = {
    readonly setViewData: (viewData: props) => Inertia;
    readonly shareProps: (sharedProps: props) => Inertia;
    readonly setStatusCode: (statusCode: number) => Inertia;
    readonly setHeaders: (headers: Record<string, string>) => Inertia;
    readonly render: (Page: Page) => Promise<Response>;
    readonly redirect: (url: string) => Response;
};
export declare const headers: {
    xInertia: string;
    xInertiaVersion: string;
    xInertiaLocation: string;
    xInertiaPartialData: string;
    xInertiaPartialComponent: string;
    xInertiaCurrentComponent: string;
};
declare const inertiaExpressAdapter: (options: Options) => RequestHandler;
export default inertiaExpressAdapter;
//# sourceMappingURL=expressAdapter.d.ts.map