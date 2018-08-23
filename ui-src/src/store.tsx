import { List, Map } from 'immutable';
import * as redux from 'redux';

import reducer from './reducer';

export default redux.createStore(reducer);
