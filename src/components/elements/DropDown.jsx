import React, {useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Holder = styled.div`
    margin:20px;
`
const InfoLink = styled.a`
    display:block;
    margin:10px 0px;
    font-size:10px;
`

const DropDown = ({selectDateFormat}) => {

    const options = useMemo(()=>[
        {value:'yyyy-MM-dd', label:'yyyy-MM-dd'},
        {value:'MM/dd/yyyy', label:'MM/dd/yyyy'},
        {value:'dd/MM/yyyy', label:'dd/MM/yyyy'},
        {value:'yyyy-M-d', label:'yyyy-M-d'},
        {value:'M/d/yyyy', label:'M/d/yyyy'},
        {value:'d/M/yyyy', label:'d/M/yyyy'},
        {value:'dd.MM.yyyy', label:'dd.MM.yyyy'},
        {value:'yyyy/M/d', label:'yyyy/M/d'},
    ],[])

    return (
     <Holder>
        <div>Select used date format to be able to calculate values different from YYYY-MM-DD:</div>
        <InfoLink href="https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table">Click here to take a look at the used formats</InfoLink>
        <select onChange={e => selectDateFormat(e.target.value)}>
            {options.map(option => 
                <option  key={option.value} value={option.value}>{option.label}</option>)
            }
        </select>
     </Holder>
    );
  }

  DropDown.propTypes  = {
    selectDateFormat:PropTypes.func
  }

  export default DropDown