import React, { useState, useContext, useEffect } from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import {Table} from 'reactstrap'

// Given an array of json objects from a database table, output the table.

const SimpleTable = (props) => {

    const getKeys = (data) => {
        try {
            return Object.keys(data[0])
        } catch {
            console.log("Data error in Table.getKeys!!")
            return []
        }
    }

    const getHeader = () => {
        if (props.data === null) return null;
        let keys = getKeys(props.data)
        return keys.map((key,index) => {
            return <th key={key}>{key}</th>
        })
    }

    const RenderRow = (props) => {
        return props.keys.map((key, index) => {
            return <td key={props.data[key]}>{props.data[key]}</td>
        })
    }
    const getRowData = () => {
        if (props.data === null) return null;
        const data = props.data;
        const keys = getKeys(data)
        return data.map((row,index) => {
            return <tr key={index}><th>{index+1}</th><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    return (
            <Table dark>
                <thead>
                <tr><th>#</th>{getHeader()}</tr>
                </thead>
                <tbody>
                    {getRowData()}
                </tbody>
            </Table>
    )
}
SimpleTable.propTypes = {
    data: PropTypes.array,
};
export default SimpleTable
