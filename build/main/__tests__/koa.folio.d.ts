/// <reference types="node" />
import { Server } from 'http';
import { DefaultState } from 'koa';
import { SinonSandbox, SinonSpy } from 'sinon';
import { Page } from '../lib/koaAdapter';
type koaWorkerFixtures = {
    port: number;
    koa: {
        server: Server;
        metadata: {
            fakes: {
                [key: string]: SinonSpy;
            };
            pages: {
                [key: string]: Page;
            };
        };
        sandbox: SinonSandbox;
    };
};
export type serverType = 'koa' | 'express';
declare const it: {
    (name: string, inner: (fixtures: {
        type: serverType;
    } & {
        testWorkerIndex: number;
    } & koaWorkerFixtures & {
        testInfo: import("folio").TestInfo;
        testParametersPathSegment: string;
    } & DefaultState) => void | Promise<void>): void;
    (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
        type: serverType;
    }) => any, inner: (fixtures: {
        type: serverType;
    } & {
        testWorkerIndex: number;
    } & koaWorkerFixtures & {
        testInfo: import("folio").TestInfo;
        testParametersPathSegment: string;
    } & DefaultState) => void | Promise<void>): void;
} & {
    only: {
        (name: string, inner: (fixtures: {
            type: serverType;
        } & {
            testWorkerIndex: number;
        } & koaWorkerFixtures & {
            testInfo: import("folio").TestInfo;
            testParametersPathSegment: string;
        } & DefaultState) => void | Promise<void>): void;
        (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
            type: serverType;
        }) => any, inner: (fixtures: {
            type: serverType;
        } & {
            testWorkerIndex: number;
        } & koaWorkerFixtures & {
            testInfo: import("folio").TestInfo;
            testParametersPathSegment: string;
        } & DefaultState) => void | Promise<void>): void;
    };
    skip: {
        (name: string, inner: (fixtures: {
            type: serverType;
        } & {
            testWorkerIndex: number;
        } & koaWorkerFixtures & {
            testInfo: import("folio").TestInfo;
            testParametersPathSegment: string;
        } & DefaultState) => void | Promise<void>): void;
        (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
            type: serverType;
        }) => any, inner: (fixtures: {
            type: serverType;
        } & {
            testWorkerIndex: number;
        } & koaWorkerFixtures & {
            testInfo: import("folio").TestInfo;
            testParametersPathSegment: string;
        } & DefaultState) => void | Promise<void>): void;
    };
}, describe: {
    (name: string, inner: () => void): void;
    (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
        type: serverType;
    }) => any, inner: () => void): void;
} & {
    only: {
        (name: string, inner: () => void): void;
        (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
            type: serverType;
        }) => any, inner: () => void): void;
    };
    skip: {
        (name: string, inner: () => void): void;
        (name: string, modifierFn: (modifier: import("folio/out/testModifier").TestModifier, parameters: {
            type: serverType;
        }) => any, inner: () => void): void;
    };
}, expect: import("folio/out/expectType").Expect, beforeEach: (inner: (fixtures: {
    type: serverType;
} & {
    testWorkerIndex: number;
} & koaWorkerFixtures & {
    testInfo: import("folio").TestInfo;
    testParametersPathSegment: string;
} & DefaultState) => Promise<void>) => void, afterEach: (inner: (fixtures: {
    type: serverType;
} & {
    testWorkerIndex: number;
} & koaWorkerFixtures & {
    testInfo: import("folio").TestInfo;
    testParametersPathSegment: string;
} & DefaultState) => Promise<void>) => void;
export { it, describe, expect, beforeEach, afterEach };
//# sourceMappingURL=koa.folio.d.ts.map