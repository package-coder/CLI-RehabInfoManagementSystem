import React from 'react'
import Form from 'react-bootstrap/Form'
import FilterListIcon from '@mui/icons-material/FilterList';


function SearchComponent() {
  return (
    <>
        <Form.Control type="text" placeholder="Search..." />
        <div className="icon-wrapper">
              <FilterListIcon />
          </div>
        
    </>
  )
}

export default SearchComponent