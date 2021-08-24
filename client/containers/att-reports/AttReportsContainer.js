import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ students, teachers, lessons, attTypes }) => [
  { field: 'student_tz', title: 'תלמידה', columnOrder: 'students.name', ...getPropsForAutoComplete('student_tz', students, 'tz') },
  { field: 'teacher_id', title: 'מורה', columnOrder: 'teachers.name', ...getPropsForAutoComplete('teacher_id', teachers, 'tz') },
  { field: 'lesson_id', title: 'שיעור', columnOrder: 'lessons.name', ...getPropsForAutoComplete('lesson_id', lessons, 'key') },
  { field: 'att_type_id', title: 'סוג דיווח', columnOrder: 'att_types.name', ...getPropsForAutoComplete('att_type_id', attTypes, 'key') },
  { field: 'enter_time', title: 'שעת כניסה' },
];
const getFilters = ({ students, teachers, lessons, attTypes }) => [
  { field: 'students.name', label: 'תלמידה', type: 'list', operator: 'like', list: students, idField: 'tz' },
  { field: 'teachers.name', label: 'מורה', type: 'list', operator: 'like', list: teachers, idField: 'tz' },
  { field: 'lessons.name', label: 'שיעור', type: 'list', operator: 'like', list: lessons, idField: 'key' },
  { field: 'att_types.name', label: 'סוג דיווח', type: 'list', operator: 'like', list: attTypes, idField: 'key' },
  { field: 'enter_time', label: 'שעת כניסה', type: 'text', operator: 'like' },
];

const AttReportsContainer = ({ entity, title }) => {
  const dispatch = useDispatch();
  const {
    GET: { 'get-edit-data': editData },
  } = useSelector((state) => state[entity]);

  const columns = useMemo(() => getColumns(editData || {}), [editData]);
  const filters = useMemo(() => getFilters(editData || {}), [editData]);

  useEffect(() => {
    dispatch(crudAction.customHttpRequest(entity, 'GET', 'get-edit-data'));
  }, []);

  return <Table entity={entity} title={title} columns={columns} filters={filters} />;
};

export default AttReportsContainer;
