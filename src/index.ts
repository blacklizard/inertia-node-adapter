import inertiaExpressAdapter, { headers } from './lib/expressAdapter';
import expressFlash from './lib/expressFlash';
import inertiaKoaAdapter from './lib/koaAdapter';
import koaFlash from './lib/koaFlash';

// start. build 
export {
  inertiaKoaAdapter,
  koaFlash,
  inertiaExpressAdapter,
  expressFlash,
  headers as inertiaHeaders,
};
