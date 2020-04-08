import React, { useState, useEffect } from 'react'  // eslint-disable-line no-unused-vars
import SimpleTable from './simpletable'
import axios from 'axios'

const sample_data = [
    { ID: 1, name: "Brian", count: 123 },
    { ID: 2, name: "Julie", count: 456 },
]

const tests_url = "http://localhost:3000/tests";

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
            <SimpleTable data={tests} />
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form> 
        </>
    )
}
export default TestsForm;