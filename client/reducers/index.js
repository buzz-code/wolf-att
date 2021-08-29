import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

// Import custom components
import authReducer from '../../common-modules/client/reducers/authReducer';
import crudReducer from '../../common-modules/client/reducers/crudReducer';
import {
  TEACHERS,
  STUDENTS,
  LESSONS,
  KLASSS,
  STUDENT_KLASSES,
  GROUPS,
  KLASS_TYPES,
  ATT_REPORTS,
  STUDENT_KLASSES_KLASS_TYPE,
  REPORT_EDIT,
  // STUDENT_REPORTS,
  // TEACHER_REPORTS,
  // ORGANIATION_REPORTS,
  DASHBOARD,
} from '../constants/entity';

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer, // ← redux-form
    auth: authReducer,
    [TEACHERS]: crudReducer(TEACHERS),
    [STUDENTS]: crudReducer(STUDENTS),
    [LESSONS]: crudReducer(LESSONS),
    [KLASSS]: crudReducer(KLASSS),
    [STUDENT_KLASSES]: crudReducer(STUDENT_KLASSES),
    [GROUPS]: crudReducer(GROUPS),
    [KLASS_TYPES]: crudReducer(KLASS_TYPES),
    [ATT_REPORTS]: crudReducer(ATT_REPORTS),
    [STUDENT_KLASSES_KLASS_TYPE]: crudReducer(STUDENT_KLASSES_KLASS_TYPE),
    [REPORT_EDIT]: crudReducer(REPORT_EDIT),
    // [STUDENT_REPORTS]: crudReducer(STUDENT_REPORTS),
    // [TEACHER_REPORTS]: crudReducer(TEACHER_REPORTS),
    // [ORGANIATION_REPORTS]: crudReducer(ORGANIATION_REPORTS),
    [DASHBOARD]: crudReducer(DASHBOARD),
  });

const rootReducer = (state, action) => {
  if (action === 'LOG_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
