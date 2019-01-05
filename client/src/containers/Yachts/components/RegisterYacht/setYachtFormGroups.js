export const setNameInfo = (stateValues) => {
  return ([
    {
      keyname: 'yacht-required-info', label: 'name', name: 'name',
      type: 'text', value: stateValues.name, error: stateValues.errors.name,
    },
  ])
};

export const setRequiredInfo = (stateValues) => {
  return ([
    {
      keyname: 'yacht-required-info', label: 'email', name: 'email',
      type: 'email', value: stateValues.email, error: stateValues.errors.email,
    },
    {
      keyname: 'yacht-required-info', label: 'phone', name: 'phone',
      type: 'number', value: stateValues.phone, error: '',
    },
  ])
};

export const setYachtMetrics = (stateValues) => {
  return ([
    {
      keyname: 'yachtMetrics', label: 'loa', name: 'loa',
      type: 'number', value: stateValues.loa, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'draft', name: 'draft',
      type: 'number', value: stateValues.draft, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'beam', name: 'beam',
      type: 'number', value: stateValues.beam, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'gross tons', name: 'grosstonnage',
      type: 'number', value: stateValues.grosstonnage, error: '', adornment: 'gt',
    },
  ])
};

export const setTaxInfo = (stateValues) => {
  return ([
    {
      keyname: 'taxInfo', label: 'cruising license', name: 'cruisinglicense',
      type: 'text', value: stateValues.cruisinglicense, error: '',
    },
    {
      keyname: 'taxInfo', label: 'tax ID', name: 'taxid',
      type: 'text', value: stateValues.taxid, error: '',
    },
  ])
};

export const setBuildInfo = (stateValues) => {
  return ([
    {
      keyname: 'buildInfo', label: 'build company', name: 'buildcompany',
      type: 'text', value: stateValues.buildcompany, error: '',
    },
    {
      keyname: 'buildInfo', label: 'build year', name: 'buildyear',
      type: 'number', value: stateValues.buildyear, error: '',
    },
    {
      keyname: 'buildInfo', label: 'refit year', name: 'refityear',
      type: 'number', value: stateValues.refityear, error: '',
    },
  ])
};
