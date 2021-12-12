import React, {useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Holder = styled.div`
    margin:20px;
    div {
        font-size:16px;
        font-weight:bold;
        color:#3B3B3B;
    }
`
const InfoLink = styled.a`
    display:block;
    font-size:10px;
`

const Select = styled.select`
    padding: 5px;
    margin: 15px 0;
`


const DropDown = ({selectDateFormat}) => {

    const options = useMemo(()=>[
        {value:'yyyy-MM-dd', label:'yyyy-MM-dd (ex: 2013-06-23)'},
        {value:'MM/dd/yyyy', label:'MM/dd/yyyy (ex: 06-23-2013)'},
        {value:'dd/MM/yyyy', label:'dd/MM/yyyy (ex: 23/06/2013)'},
        {value:'yyyy-M-d', label:'yyyy-M-d (ex: 2013-6-23)'},
        {value:'M/d/yyyy', label:'M/d/yyyy (ex: 6/23/2013)'},
        {value:'d/M/yyyy', label:'d/M/yyyy (ex: 23/6/2013)'},
        {value:'dd.MM.yyyy', label:'dd.MM.yyyy (ex: 23.06.2013)'},
        {value:'yyyy/M/d', label:'yyyy/M/d (ex: 23/6/2013)'},
    ],[])



    return (
     <Holder>
        <div>Select used date format to be able to calculate values different from YYYY-MM-DD:</div>
        <InfoLink href="https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table">Click here to take a look at the formats description</InfoLink>
        <Select onChange={e => selectDateFormat(e.target.value)}>
            {options.map(option => 
                <option  key={option.value} value={option.value}>{option.label}</option>)
            }
        </Select>
     </Holder>
    );
  }

  DropDown.propTypes  = {
    selectDateFormat:PropTypes.func
  }

  export default DropDown