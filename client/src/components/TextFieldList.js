import React from 'react';
import TextField from './TextField';

const TextFieldList = ({ list, onChange, className }) => {
  
  return (
    <React.Fragment>
      {
        list.map((item, index) => {
          return (
            <TextField
              key={`${item.keyname}--${index}`}
              {...{item, onChange, className, index}}
            />
          )
        })
      }
    </React.Fragment>
  )
}

export default TextFieldList;
