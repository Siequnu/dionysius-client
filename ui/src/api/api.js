import Axios from 'axios';

import { setupCache } from 'axios-cache-interceptor/dev';

export const axios = setupCache(Axios, { debug: console.log });
