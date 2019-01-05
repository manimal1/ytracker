const setCompanyFormInputs = (companyType, values) => {

  return [
    {
      keyname: `${companyType}Company`, label: `company name`, name: `${companyType}companyname`,
      type: `text`, value: values.name, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `email`, name: `${companyType}companyemail`,
      type: `email`, value: values.email, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `phone`, name: `${companyType}companyphone`,
      type: `number`, value: values.phone, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `mobile`, name: `${companyType}companymobile`,
      type: `number`, value: values.mobile, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `address line1`, name: `${companyType}companyaddressline1`,
      type: `text`, value: values.address1, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `address line2`, name: `${companyType}companyaddressline2`,
      type: `text`, value: values.address2, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `city`, name: `${companyType}companycity`,
      type: `text`, value: values.city, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `postal code`, name: `${companyType}companypostalcode`,
      type: `text`, value: values.postalcode, error: ``,
    },
    {
      keyname: `${companyType}Company`, label: `country`, name: `${companyType}companycountry`,
      type: `text`, value: values.country, error: ``,
    },
  ];
}

export default setCompanyFormInputs;
