import React, {useMemo} from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTable } from 'react-table'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid #3B3B3B;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #3B3B3B;
      border-right: 1px solid #3B3B3B;
      font-weight: bold;
      color:#3B3B3B;

      :last-child {
        border-right: 0;
      }
    }

    th {
        border-color: #001833;
        background-color: #001833;
        color:white;
    }
  }
`
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
  

const DataGrid = ({ values }) => {

    const columns = useMemo(
        () => [
          {
            Header: 'Employees',
            columns: [
              {
                Header: 'Employee ID #1',
                accessor: 'firstEmpId',
              },
              {
                Header: 'Employee ID #2',
                accessor: 'secondEmpId',
              },
            ],
          },
          {
            Header: 'Project Info',
            columns: [
              {
                Header: 'Project ID',
                accessor: 'projectId',
              },
              {
                Header: 'Days worked',
                accessor: 'daysOnProject',
              },
            ],
          },
        ],
        []
      )


    return (
    <Styles>
        <Table columns={columns} data={values} />
      </Styles>
    );
  }

  DataGrid.propTypes  = {
    values: PropTypes.array
  }
  export default DataGrid