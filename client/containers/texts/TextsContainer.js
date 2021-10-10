import React, { useCallback, useMemo } from 'react';

import Table from '../../../common-modules/client/components/table/Table';

const getColumns = () => [
  { field: 'name', title: 'שם', editable: 'onAdd' },
  { field: 'description', title: 'תיאור', editable: 'onAdd' },
  { field: 'value', title: 'ערך' },
];
const getFilters = () => [
  { field: 'name', label: 'שם', type: 'text', operator: 'like' },
  { field: 'description', label: 'תיאור', type: 'text', operator: 'like' },
  { field: 'value', label: 'ערך', type: 'text', operator: 'like' },
];

const TextsContainer = ({ entity, title }) => {
  const columns = useMemo(() => getColumns(), []);
  const filters = useMemo(() => getFilters(), []);
  const validateRow = useCallback((rowData) => {
    if (!rowData.name) {
      return 'חובה להזין שם';
    }
    if (!rowData.description) {
      return 'חובה להזין תיאור';
    }
    if (!rowData.value) {
      return 'חובה להזין ערך';
    }
    return null;
  }, []);

  return (
    <Table
      entity={entity}
      title={title}
      columns={columns}
      filters={filters}
      disableAdd={true}
      disableDelete={true}
      validateRow={validateRow}
    />
  );
};

export default TextsContainer;
