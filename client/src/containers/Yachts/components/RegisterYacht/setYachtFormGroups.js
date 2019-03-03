export const setNameInfo = stateValues => {
  const name = stateValues.name ? stateValues.name : '';
  let err;
  if (!stateValues.errors || !stateValues.errors.name) {
    err = '';
  } else {
    err = stateValues.errors.name;
  }

  return [
    {
      keyname: 'yacht-required-info',
      label: 'name',
      id: 'yachtName',
      name: 'name',
      type: 'text',
      value: name,
      required: true,
      error: err,
    },
  ];
};

export const setRequiredInfo = stateValues => {
  const email = stateValues.email ? stateValues.email : '';
  const phone = stateValues.phone ? stateValues.phone : '';
  let err;
  if (!stateValues.errors || !stateValues.errors.email) {
    err = '';
  } else {
    err = stateValues.errors.email;
  }

  return [
    {
      keyname: 'yacht-required-info',
      label: 'email',
      id: 'yachtEmail',
      name: 'email',
      type: 'email',
      value: email,
      required: true,
      error: err,
    },
    {
      keyname: 'yacht-required-info',
      label: 'phone',
      id: 'yachtPhone',
      name: 'phone',
      type: 'text',
      value: phone,
      required: true,
      error: '',
    },
  ];
};

export const setYachtMetrics = stateValues => {
  const loa = stateValues.loa ? stateValues.loa : '';
  const draft = stateValues.draft ? stateValues.draft : '';
  const beam = stateValues.beam ? stateValues.beam : '';
  const grosstonnage = stateValues.grosstonnage ? stateValues.grosstonnage : '';

  return [
    {
      keyname: 'yachtMetrics',
      label: 'loa',
      id: 'yachtLOA',
      name: 'loa',
      type: 'number',
      min: '1',
      max: '200',
      step: '1',
      value: loa,
      error: '',
      adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics',
      label: 'draft',
      id: 'yachtDraft',
      name: 'draft',
      type: 'number',
      min: '1',
      max: '20',
      value: draft,
      error: '',
      adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics',
      label: 'beam',
      id: 'yachtBeam',
      name: 'beam',
      type: 'number',
      min: 1,
      max: 30,
      value: beam,
      error: '',
      adornment: 'meters',
    },
    {
      keyname: 'yachtMetrics',
      label: 'gross tons',
      id: 'yachtGrosstonnage',
      name: 'grosstonnage',
      type: 'number',
      min: 1,
      max: 800,
      value: grosstonnage,
      error: '',
      adornment: 'gt',
    },
  ];
};

export const setTaxInfo = stateValues => {
  const cruisinglicense = stateValues.cruisinglicense
    ? stateValues.cruisinglicense
    : '';
  const taxid = stateValues.taxid ? stateValues.taxid : '';

  return [
    {
      keyname: 'taxInfo',
      label: 'cruising license',
      id: 'yachtCruisingLicense',
      name: 'cruisinglicense',
      type: 'text',
      value: cruisinglicense,
      error: '',
    },
    {
      keyname: 'taxInfo',
      label: 'tax ID',
      name: 'taxid',
      type: 'text',
      value: taxid,
      error: '',
    },
  ];
};

export const setBuildInfo = stateValues => {
  const buildcompany = stateValues.buildcompany ? stateValues.buildcompany : '';
  const buildyear = stateValues.buildyear ? stateValues.buildyear : '';
  const refityear = stateValues.refityear ? stateValues.refityear : '';

  return [
    {
      keyname: 'buildInfo',
      label: 'build company',
      id: 'yachtBuildcompany',
      name: 'buildcompany',
      type: 'text',
      value: buildcompany,
      error: '',
    },
    {
      keyname: 'buildInfo',
      label: 'build year',
      id: 'yachtBuildyear',
      name: 'buildyear',
      type: 'number',
      value: buildyear,
      error: '',
    },
    {
      keyname: 'buildInfo',
      label: 'refit year',
      id: 'yachtRefityear',
      name: 'refityear',
      type: 'number',
      value: refityear,
      error: '',
    },
  ];
};

export const setDataGroups = (yachtMetrics, taxInfo, buildInfo) => {
  return [
    { array: yachtMetrics, label: 'Yacht Metrics', key: 'yachtMetrics' },
    { array: taxInfo, label: 'Tax Info', key: 'taxInfo' },
    { array: buildInfo, label: 'Build Info', key: 'buildInfo' },
  ];
};

export const setCompanyGroups = (
  billingCompanyInfo,
  owningCompanyInfo,
  managementCompanyInfo,
) => {
  return [
    {
      array: billingCompanyInfo,
      label: 'Billing Company Info',
      key: 'billingcompany',
    },
    {
      array: owningCompanyInfo,
      label: 'Owning Company Info',
      key: 'owningcompany',
    },
    {
      array: managementCompanyInfo,
      label: 'Management Company Info',
      key: 'managementcompany',
    },
  ];
};
