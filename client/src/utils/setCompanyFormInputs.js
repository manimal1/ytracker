const setCompanyFormInputs = (companyType, companyValues) => {

  return [
    {
      keyname: `${companyType}Company`, label: `company name`, id: `${companyType}CompanyName`,
      name: 'companyname', type: `text`, value: companyValues.companyname, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `email`, id: `${companyType}CompanyEmail`,
      name: 'email', type: `email`, value: companyValues.email, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `phone`, id: `${companyType}CompanyPhone`,
      name: 'phone', type: `number`, value: companyValues.phone, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `mobile`, id: `${companyType}CompanyMobile`,
      name: 'mobile', type: `number`, value: companyValues.mobile, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `address line1`, id: `${companyType}CompanyAddress1`,
      name: 'addressline1', type: `text`, value: companyValues.address.addressline1, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `address line2`, id: `${companyType}CompanyAddress2`,
      name: 'addressline2', type: `text`, value: companyValues.address.addressline2, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `city`, id: `${companyType}CompanyCity`,
      name: 'city', type: `text`, value: companyValues.address.city, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `postal code`, id: `${companyType}CompanyPost`,
      name: 'postalcode', type: `text`, value: companyValues.address.postalcode, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `country`, id: `${companyType}CompanyCountry`,
      name: 'country', type: `text`, value: companyValues.address.country, error: ``,
    },
  ];
}

export default setCompanyFormInputs;
