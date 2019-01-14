export const setNameInfo = (stateValues) => {
  let err;
  if (!stateValues.errors || !stateValues.errors.name) {
    err = '';
  } else {
    err = stateValues.errors.name;
  }

  return ([
    {
      keyname: 'yacht-required-info', label: 'name', id: 'yachtName', name: 'name',
      type: 'text', value: stateValues.name, error: err,
    },
  ])
};

export const setRequiredInfo = (stateValues) => {
  let err;
  if (!stateValues.errors || !stateValues.errors.email) {
    err = '';
  } else {
    err = stateValues.errors.email;
  }

  return ([
    {
      keyname: 'yacht-required-info', label: 'email', id: 'yachtEmail', name: 'email',
      type: 'email', value: stateValues.email, error: err,
    },
    {
      keyname: 'yacht-required-info', label: 'phone', id: 'yachtPhone', name: 'phone',
      type: 'text', value: stateValues.phone, error: '',
    },
  ])
};

export const setYachtMetrics = (stateValues) => {
  return ([
    {
      keyname: 'yachtMetrics', label: 'loa', id: 'yachtLOA', name: 'loa',
      type: 'number', value: stateValues.loa, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'draft', id: 'yachtDraft', name: 'draft',
      type: 'number', value: stateValues.draft, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'beam', id: 'yachtBeam', name: 'beam',
      type: 'number', value: stateValues.beam, error: '', adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics', label: 'gross tons', id: 'yachtGrosstonnage', name: 'grosstonnage',
      type: 'number', value: stateValues.grosstonnage, error: '', adornment: 'gt',
    },
  ])
};

export const setTaxInfo = (stateValues) => {
  return ([
    {
      keyname: 'taxInfo', label: 'cruising license', id: 'yachtCruisingLicense', name: 'cruisinglicense',
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
      keyname: 'buildInfo', label: 'build company', id: 'yachtBuildcompany', name: 'buildcompany',
      type: 'text', value: stateValues.buildcompany, error: '',
    },
    {
      keyname: 'buildInfo', label: 'build year', id: 'yachtBuildyear', name: 'buildyear',
      type: 'number', value: stateValues.buildyear, error: '',
    },
    {
      keyname: 'buildInfo', label: 'refit year', id: 'yachtRefityear', name: 'refityear',
      type: 'number', value: stateValues.refityear, error: '',
    },
  ])
};

export const setDataGroups = (yachtMetrics, taxInfo, buildInfo) => {
  return ([
    { array: yachtMetrics, label: 'Yacht Metrics', key: 'yachtMetrics'},
    { array: taxInfo, label: 'Tax Info', key: 'taxInfo' },
    { array: buildInfo, label: 'Build Info', key: 'buildInfo'},
  ])
}

export const setCompanyGroups = (billingCompanyInfo, owningCompanyInfo, managementCompanyInfo) => {
  return ([
    { array: billingCompanyInfo, label: 'Billing Company Info', key: 'billingcompany'},
    { array: owningCompanyInfo, label: 'Owning Company Info', key: 'owningcompany'},
    { array: managementCompanyInfo, label: 'Management Company Info', key: 'managementcompany'},
  ])
}
