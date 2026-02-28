import globals from 'globals';

import {createBaseConfig} from './shared.js';

export default createBaseConfig({...globals.browser, ...globals.es2020});
