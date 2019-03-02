const setCompanyFormInputs = (companyType, companyValues) => {
  const name = companyValues.name ? companyValues.name : '';
  const email = companyValues.email ? companyValues.email : '';
  const phone = companyValues.phone ? companyValues.phone : '';
  const mobile = companyValues.mobile ? companyValues.mobile : '';
  const addressline1 = companyValues.address.addressline1
    ? companyValues.address.addressline1
    : '';
  const addressline2 = companyValues.address.addressline2
    ? companyValues.address.addressline2
    : '';
  const city = companyValues.address.city ? companyValues.address.city : '';
  const postalcode = companyValues.address.postalcode
    ? companyValues.address.postalcode
    : '';
  const country = companyValues.address.country
    ? companyValues.address.country
    : '';

  return [
    {
      keyname: `${companyType}Company`,
      label: `company name`,
      id: `${companyType}CompanyName`,
      name: 'name',
      type: `text`,
      value: name,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `email`,
      id: `${companyType}CompanyEmail`,
      name: 'email',
      type: `email`,
      value: email,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `phone`,
      id: `${companyType}CompanyPhone`,
      name: 'phone',
      type: `number`,
      value: phone,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `mobile`,
      id: `${companyType}CompanyMobile`,
      name: 'mobile',
      type: `number`,
      value: mobile,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `address line1`,
      name: 'addressline1',
      type: `text`,
      value: addressline1,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `address line2`,
      id: `${companyType}CompanyAddress2`,
      name: 'addressline2',
      type: `text`,
      value: addressline2,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `city`,
      id: `${companyType}CompanyCity`,
      name: 'city',
      type: `text`,
      value: city,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `postal code`,
      id: `${companyType}CompanyPost`,
      name: 'postalcode',
      type: `text`,
      value: postalcode,
      error: ``,
    },
    {
      keyname: `${companyType}Company`,
      label: `country`,
      id: `${companyType}CompanyCountry`,
      name: 'country',
      type: `text`,
      value: country,
      error: ``,
    },
  ];
};

export default setCompanyFormInputs;
