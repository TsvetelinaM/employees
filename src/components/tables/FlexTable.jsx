import React from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

const TableHolder = styled.div`
    display:flex;
    width:80%;
    margin:20px;
    padding-top:1rem;
    box-sizing:border-box;
    flex-direction:column;
    color:#3B3B3B;
`
const TableCell = styled.div`
    width:25%;
    text-align:center;
    border:1px solid #3B3B3B;
    padding: 10px 0;
    font-weight:bold;
    ${props => props.header && css`
        font-size:16px;
        border-color: #001833;
        background-color: #001833;
        color:white;
    `}
    :first-child {
        ${props => props.header && css`
        border-top-left-radius: 5px;
    `}
    }
    :last-child {
        ${props => props.header && css`
        border-top-right-radius: 5px;
    `}
    }
`
const TableRow = styled.div`
    display:flex;
`

const FlexTable = ({ values }) => {
    const columnHeaders = ['Employee ID #1', 'Employee ID #2', 'Project ID', 'Days worked']
    return (
     <TableHolder>
        <TableRow>
            {
            columnHeaders.map(title =>
                 <TableCell key={title} header>{title}</TableCell>
                )
            }
        </TableRow>
        {values.map(item => 
            <TableRow key={item.projectId}>
                 <TableCell>{item.firstEmpId}</TableCell>
                 <TableCell>{item.secondEmpId}</TableCell>
                 <TableCell>{item.projectId}</TableCell>
                 <TableCell>{item.daysOnProject}</TableCell>
            </TableRow>)
        }
     </TableHolder>
    );
  }

  FlexTable.propTypes  = {
    values: PropTypes.array
  }

  export default FlexTable