import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import {
  getColumnsForPivot,
  getPropsForAutoComplete,
} from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ students }, data) => [
  {
    field: 'tz',
    title: 'תלמידה',
    columnOrder: 'students.name',
    ...getPropsForAutoComplete('tz', students, 'tz'),
  },
  ...getColumnsForPivot(data),
  { field: 'total', title: 'סה"כ', sorting: false },
];
const getFilters = ({ students, teachers, klasses, lessons }) => [];

const PivotReportsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    data,
    GET: { '../get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  const columns = useMemo(() => getColumns(editData || {}, data || []), [editData, data]);
  const filters = useMemo(() => getFilters(editData || {}), [editData]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', '../get-edit-data'));
  }, []);

  const getExportColumns = useCallback((data) => getColumns(editData || {}, data || []), [
    editData,
  ]);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      disableAdd={true}
      disableUpdate={true}
      disableDelete={true}
      getExportColumns={getExportColumns}
    />
  );
};

export default PivotReportsContainer;
