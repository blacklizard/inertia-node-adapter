import { Page } from '../../lib/expressAdapter';
import { ServerOptions } from '.';
export declare function getHtml(page: Page): string;
export declare function expressServer({ sandbox }: ServerOptions): {
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
    sandbox: import("sinon").SinonSandbox;
};
//# sourceMappingURL=express.d.ts.map