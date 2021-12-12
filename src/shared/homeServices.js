import {parse} from 'date-fns'

export const differenceInDays = (dateFrom, dateTo) => {
        const difference = dateTo.getTime() - dateFrom.getTime();
        const inDays = Math.ceil(difference / (1000 * 3600 * 24));
        
        return inDays > -1 ? inDays : 'not valid'
    }


export const getDataByParam = (array, paramName) => {
        const counterObj = {}
        array.forEach(value => {
          if (counterObj[value[paramName]]) {
            counterObj[value[paramName]].push(value)
          } else {
            counterObj[value[paramName]] = [value]
          }
        })
       return counterObj;
    }    

 const convertToDate = (dateString, formatDate = 'yyyy-MM-dd') => {
       return dateString && (dateString+'').toLowerCase() !== 'null' ? parse(dateString, formatDate, new Date()) :  new Date()
   }
 
export const getDays = (startAStr, startBStr, endAStr, endBStr, dateFormat) => {
    const startA = convertToDate(startAStr, dateFormat)
    const startB = convertToDate(startBStr, dateFormat)
    const endA = convertToDate(endAStr, dateFormat)
    const endB = convertToDate(endBStr, dateFormat)
    
   
    if (isNaN(startA.getTime()) || isNaN(startB.getTime()) || isNaN(endA.getTime()) || isNaN(endB.getTime())) { 
        return null
    }
    if ((startA<=endB) && (endA>=startB))
    { 
        const startDate = new Date(Math.max(startA,startB))
        const endDate = new Date(Math.min(endA,endB))
        return differenceInDays(startDate, endDate)
    }
    return 0
}

export const getMaxValueIndex = (array, value) => {
    let maxValue = 0
    let buffer = {}
    array.forEach(item => {
        if (maxValue < item[value]) {
            maxValue = item[value]
            buffer = item
        }
    })

    return buffer
}
