import React from 'react';

const SearchBox = ({ onChange, value }) => {
  return ( 
    <input 
      className="form-contrl m-2" 
      type="text" 
      name="query"
      style={{ width: "inherit", display: "block"}} 
      placeholder="Search..."
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
   );

}
 
export default SearchBox;