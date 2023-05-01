// @ts-ignore
import debug from 'debug';
const log = debug('inertia-node-adapter:koa');
export const headers = {
    xInertia: 'x-inertia',
    xInertiaVersion: 'x-inertia-version',
    xInertiaLocation: 'x-inertia-location',
    xInertiaPartialData: 'x-inertia-partial-data',
    xInertiaPartialComponent: 'x-inertia-partial-component',
};
const inertia = function ({ version, html, flashMessages }) {
    return (ctx, next) => {
        if (ctx.method === 'GET' &&
            ctx.headers[headers.xInertia] &&
            ctx.headers[headers.xInertiaVersion] !== version) {
            ctx.status = 409;
            ctx.append(headers.xInertiaLocation, ctx.url);
            return;
        }
        let _viewData = {};
        let _sharedProps = {};
        let _statusCode = 200;
        let _headers = {};
        const Inertia = {
            setViewData(viewData) {
                _viewData = viewData;
                return this;
            },
            shareProps(sharedProps) {
                _sharedProps = { ..._sharedProps, ...sharedProps };
                return this;
            },
            setStatusCode(statusCode) {
                _statusCode = statusCode;
                return this;
            },
            setHeaders(headers) {
                _headers = { ..._headers, ...headers };
                return this;
            },
            async render({ props, ...pageRest }) {
                const _page = {
                    ...pageRest,
                    url: ctx.originalUrl || ctx.url,
                    version,
                    props,
                };
                log('rendering', _page);
                if (flashMessages) {
                    this.shareProps(flashMessages(ctx));
                }
                const allProps = { ..._sharedProps, ...props };
                let dataKeys;
                if (ctx.headers[headers.xInertiaPartialData] &&
                    ctx.headers[headers.xInertiaPartialComponent] === _page.component) {
                    // @ts-ignore
                    dataKeys = ctx.headers[headers.xInertiaPartialData].split(',');
                }
                else {
                    log('partial requests without the name of the component return a full request', _page.component);
                    log('header component', ctx.headers[headers.xInertiaPartialComponent]);
                    dataKeys = Object.keys(allProps);
                }
                // we need to clear the props object on each call
                const propsRecord = {};
                for await (const key of dataKeys) {
                    log('parsing props keys', dataKeys);
                    let value;
                    if (typeof allProps[key] === 'function') {
                        value = await allProps[key]();
                        log('prop promise resolved', key);
                    }
                    else {
                        value = allProps[key];
                    }
                    propsRecord[key] = value;
                }
                _page.props = propsRecord;
                log('Page props built', _page.props);
                if (ctx.headers[headers.xInertia]) {
                    ctx.status = _statusCode;
                    ctx.set({
                        ..._headers,
                        'Content-Type': 'application/json',
                        [headers.xInertia]: 'true',
                        Vary: 'Accept',
                    });
                    ctx.body = JSON.stringify(_page);
                }
                else {
                    ctx.status = _statusCode;
                    ctx.set({
                        ..._headers,
                        'Content-Type': 'text/html',
                    });
                    ctx.body = html(_page, _viewData);
                }
                return this;
            },
            redirect(url) {
                const statusCode = ['PUT', 'PATCH', 'DELETE'].includes(ctx.method)
                    ? 303
                    : 302;
                ctx.status = statusCode;
                ctx.set({ ..._headers, Location: url });
                return ctx;
            },
        };
        ctx.Inertia = Inertia;
        return next();
    };
};
export default inertia;
//# sourceMappingURL=koaAdapter.js.map