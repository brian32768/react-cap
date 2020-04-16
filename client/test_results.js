import React, { useState, useEffect } from 'react'  // eslint-disable-line no-unused-vars
import SimpleTable from './simpletable'
import axios from 'axios'
import {APIHOST} from './config'

const sample_data = [
    { ID: 1, name: "Brian", count: 123 },
    { ID: 2, name: "Julie", count: 456 },
]

const lut_headers = {
    "ID" : "ID",
    "positive": "Positive",
    "negative": "Negative",
    "deaths": "Deaths",
};

const tests_url = `${APIHOST}/tests`

const TestsForm = () => {
    const [tests, setTests] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get(tests_url)
            setTests(resp.data);
        }
        fetchData();
    }, []);
      
    const handleSubmit = (event) => {
        console.log("submit! obey!")
    };
    return (
        <>
            <SimpleTable data={tests} headers={lut_headers} />
        </>
    )
}
export default TestsForm;
