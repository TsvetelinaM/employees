import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'

import FlexTable from './../components/tables/FlexTable'
import DataGrid from './../components/tables/DataGrid'
import DropDown from './../components/elements/DropDown'
import {getDataByParam, getDays, getMaxValueIndex} from './../shared/homeServices'

const ChangeView = styled.button`
    text-align:center;
    display:block;
    margin:20px;
    padding: 10px;
`
const FileInput = styled.input`
    margin:20px;
    display:block;
`

const Home = () => {
  const [values, setValues] = useState([])
  const [dataByProject, setDataByProject] = useState([])
  const [showFlex, setShowFlex] = useState(true)
  const [dateFormat, setDateFormat] = useState('yyyy-MM-dd')

  const showFile = async (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onloadend = async (e) => { 
        const content = (e ? e.target.result : '')
        console.log('Read data from file: ', content)

        const stringArray = content.split(/\r\n|\n|\r/)
        const mappedValues = stringArray.map((item,index) => {
            const allValuesPerLine = item.split(',')
            return {
                id:index+1,
                empId:allValuesPerLine[0].trim(),
                projectId:allValuesPerLine[1].trim(),
                dateFrom:allValuesPerLine[2].trim(),
                dateTo:allValuesPerLine[3].trim()
            }
        })
        console.log('Transformed data to acceptable object: ', mappedValues)
        setValues(mappedValues)
        }
        reader.readAsText(e.target.files[0])
    }

    const calculateTimeSlots =  useCallback(() => {
        const dataByProject = getDataByParam(values, 'projectId')
        console.log('Transformed data by project: ', dataByProject)

        const couplesByProject = {}
        const accumulateByCouples = []


        for (const project in dataByProject) {
            let tempDays = 0
            couplesByProject[project] = []
            dataByProject[project].forEach((userA, indexA, array) => {
                array.forEach((userB, indexB) => {
                    if (indexA < indexB) { 
                        tempDays =  getDays(userA.dateFrom, userB.dateFrom, userA.dateTo, userB.dateTo, dateFormat) 
                        
                        couplesByProject[project].push({
                            projectId:project,
                            firstEmpId:userA.empId,
                            secondEmpId:userB.empId,
                            daysOnProject:tempDays,
                        })          

                        let coupleIndex = accumulateByCouples.findIndex(item => item.firstEmpId === userA.empId && item.secondEmpId === userB.empId )

                        if (coupleIndex > -1) {
                            accumulateByCouples[coupleIndex].daysOnAllProjects += tempDays
                        } else {
                            accumulateByCouples.push({
                                firstEmpId:userA.empId,
                                secondEmpId:userB.empId,
                                daysOnAllProjects:tempDays,
                            })
                        }

                    }
                })
            })
        }
        console.log('Created pairs by project with days worked on: ', couplesByProject)
        
        const foundCouple = getMaxValueIndex(accumulateByCouples, 'daysOnAllProjects')
        console.log('Found couple with max working days by projects together: ', foundCouple)

        const valuesToShow = filterProjectsByCouple(couplesByProject, foundCouple)
        console.log('Values to present as final result in the table: ', valuesToShow)

        setDataByProject(valuesToShow)
    }, [values, dateFormat])

    const filterProjectsByCouple = (valuesInObject, coupleToFind) => {
      const coupleData = []
       
      for (const project in valuesInObject) {
        const foundInProject = valuesInObject[project].find(item => item.firstEmpId === coupleToFind.firstEmpId && item.secondEmpId === coupleToFind.secondEmpId)
        if(foundInProject)
        coupleData.push(foundInProject)
      }

      return coupleData
    }

    useEffect(() => {
        calculateTimeSlots()
    }, [calculateTimeSlots])
    
    const selectDateFormat = (formatToTransform) => {
        return setDateFormat(formatToTransform)
    }

    return (
     <>  
        <DropDown selectDateFormat = {selectDateFormat}/>
        <FileInput type='file' onChange={(e) => showFile(e)} />
        {(dataByProject && dataByProject.length>0) &&  <div>
        <ChangeView showFlex onClick={() => setShowFlex(!showFlex)}>{showFlex ? 'Show DataGrid' : 'Show Simple Flex'}</ChangeView>
        {showFlex &&  <FlexTable values ={dataByProject}/>}
        {!showFlex &&  <DataGrid values ={dataByProject}/>}
        </div>}
     </>
    )
  }

  export default Home