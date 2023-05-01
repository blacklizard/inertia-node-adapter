import { SinonSandbox } from 'sinon';
import { serverType } from '../koa.folio';
export interface ServerOptions {
    sandbox: SinonSandbox;
}
export default function getServer(type: serverType, options: ServerOptions): {
    app: import("express-serve-static-core").Express;
    metadata: {
        fakes: {
            numbers: import("sinon").SinonSpy<any[], any>;
            bigNumbers: import("sinon").SinonSpy<any[], any>;
        };
        pages: {
            index: {
                component: string;
                props: {
                    name: string;
                };
                url: string;
                version: string;
            };
            home: {
                component: string;
                props: {
                    name: number;
                };
                url: string;
                version: string;
            };
            partial: {
                component: string;
                version: string;
                url: string;
                props: {
                    numbers: import("sinon").SinonSpy<any[], any>;
                    bigNumbers: import("sinon").SinonSpy<any[], any>;
                };
            };
        };
    };
    sandbox: SinonSandbox;
} | {
    app: import("koa")<import("koa").DefaultState, import("koa").DefaultContext>;
    metadata: {
        fakes: {
            numbers: import("sinon").SinonSpy<any[], any>;
            bigNumbers: import("sinon").SinonSpy<any[], any>;
        };
        pages: {
            index: {
                component: string;
                props: {
                    name: string;
                };
                url: string;
                version: string;
            };
            home: {
                component: string;
                props: {
                    name: number;
                };
                url: string;
                version: string;
            };
            partial: {
                component: string;
                version: string;
                url: string;
                props: {
                    numbers: import("sinon").SinonSpy<any[], any>;
                    bigNumbers: import("sinon").SinonSpy<any[], any>;
                };
            };
        };
    };
    sandbox: SinonSandbox;
};
//# sourceMappingURL=index.d.ts.map