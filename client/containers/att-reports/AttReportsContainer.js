import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '../../../common-modules/client/components/table/Table';
import * as crudAction from '../../../common-modules/client/actions/crudAction';
import { getPropsForAutoComplete } from '../../../common-modules/client/utils/formUtil';

const getColumns = ({ students, teachers, lessons }) => [
  {
    field: 'student_tz',
    title: 'תלמידה',
    columnOrder: 'students.name',
    ...getPropsForAutoComplete('student_tz', students, 'tz'),
  },
  {
    field: 'teacher_id',
    title: 'מורה',
    columnOrder: 'teachers.name',
    ...getPropsForAutoComplete('teacher_id', teachers, 'tz'),
  },
  {
    field: 'lesson_id',
    title: 'שיעור',
    columnOrder: 'lessons.name',
    ...getPropsForAutoComplete('lesson_id', lessons, 'key'),
  },
  { field: 'abs_count', title: 'חיסורים', type: 'numeric' },
  { field: 'approved_abs_count', title: 'חיסורים מאושרים', type: 'numeric' },
  { field: 'comments', title: 'הערות' },
];
const getFilters = ({ students, teachers, lessons }) => [
  {
    field: 'students.name',
    label: 'תלמידה',
    type: 'list',
    operator: 'like',
    list: students,
    idField: 'tz',
  },
  {
    field: 'teachers.name',
    label: 'מורה',
    type: 'list',
    operator: 'like',
    list: teachers,
    idField: 'tz',
  },
  {
    field: 'lessons.name',
    label: 'שיעור',
    type: 'list',
    operator: 'like',
    list: lessons,
    idField: 'key',
  },
  { field: 'abs_count', label: 'חיסורים', type: 'text', operator: 'like' },
  { field: 'approved_abs_count', label: 'חיסורים מאושרים', type: 'text', operator: 'like' },
  { field: 'comments', label: 'הערות', type: 'text', operator: 'like' },
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
