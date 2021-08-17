import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ students, klasses }) => [
  { field: 'student_tz', title: 'תלמידה', ...getPropsForAutoComplete('student_tz', students, 'tz') },
  { field: 'klass_id', title: 'כיתה', ...getPropsForAutoComplete('klass_id', klasses, 'key') },
];
const getFilters = () => [
  { field: 'students.name', label: 'תלמידה', type: 'text', operator: 'like' },
  { field: 'klasses.name', label: 'כיתה', type: 'text', operator: 'like' },
];

const StudentKlassesContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  const columns = useMemo(() => editData && getColumns(editData), [editData]);
  const filters = useMemo(() => getFilters(), []);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  return <Table entity={entity} title={title} columns={columns} filters={filters} />;
};

export default StudentKlassesContainer;
