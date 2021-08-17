import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ klasses, teachers, lessons }) => [
  { field: 'klass_id', title: 'כיתה', ...getPropsForAutoComplete('klass_id', klasses, 'key') },
  { field: 'teacher_id', title: 'מורה', ...getPropsForAutoComplete('teacher_id', teachers, 'tz') },
  { field: 'lesson_id', title: 'שיעור', ...getPropsForAutoComplete('lesson_id', lessons, 'key') },
  { field: 'lesson_count', title: 'מספר שיעורים בשבוע', type: 'numeric' },
];
const getFilters = () => [
  { field: 'klasses.name', label: 'כיתה', type: 'text', operator: 'like' },
  { field: 'teachers.name', label: 'מורה', type: 'text', operator: 'like' },
  { field: 'lessons.name', label: 'שיעור', type: 'text', operator: 'like' },
  { field: 'lesson_count', label: 'מספר שיעורים', type: 'number', operator: 'like' },
];
const getActions = (handlePrintAll, handlePrintOne) => [
  {
    icon: 'print',
    tooltip: 'הדפס הכל',
    isFreeAction: true,
    onClick: handlePrintAll,
  },
  rowData => ({
    disabled: !rowData.klass_id,
    icon: 'print',
    tooltip: 'הדפס יומן',
    onClick: handlePrintOne,
  }),
];

const GroupsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  const [conditions, setConditions] = useState([]);

  const handlePrintAll = useCallback(() => {
    dispatch(crudAction.download(entity, 'POST', 'print-all-diaries', { filters: conditions }));
  }, [entity, conditions]);
  const handlePrintOne = useCallback((e, rowData) => {
    dispatch(crudAction.download(entity, 'POST', 'print-one-diary', rowData));
  }, [entity]);

  const columns = useMemo(() => editData && getColumns(editData), [editData]);
  const filters = useMemo(() => getFilters(), []);
  const actions = useMemo(() => getActions(handlePrintAll, handlePrintOne), [handlePrintAll, handlePrintOne]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  return <Table entity={entity} title={title} columns={columns} filters={filters} additionalActions={actions} disableAdd={true} disableUpdate={true} disableDelete={true} onConditionUpdate={setConditions} />;
};

export default GroupsContainer;
