import globals from 'globals';

import {createBaseConfig} from './shared.js';

export default createBaseConfig({...globals.node, ...globals.es2020});
