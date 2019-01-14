import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const TextFieldList = ({ list, classname, onChange, }) => {
  
  return (
    <React.Fragment>
      {
        list.map((item, index) => {
          return (
            <TextField
              key={`${item.keyname}-${index}`}
              id={item.id}
              name={item.name}
              label={item.label}
              className={classname}
              type={item.type}
              autoComplete={`current-${item.label}`}
              margin="normal"
              value={item.value}
              onChange={onChange}
              error={item.error ? true : false}
              helperText={item.error}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  {item.adornment ? item.adornment : ''}
                </InputAdornment>,
              }}
            />
          )
        })
      }
    </React.Fragment>
  )
}

export default TextFieldList;