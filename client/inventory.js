import React, { useState, useEffect } from 'react'  // eslint-disable-line no-unused-vars
import SimpleTable from './simpletable'
import axios from 'axios'

const sample_data = [
    { ID: 1, name: "Brian", count: 123 },
    { ID: 2, name: "Julie", count: 456 },
]

const capurl = "http://localhost:3000/list";

const InventoryForm = () => {
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get(capurl)
            setInventory(resp.data);
        }
        fetchData();
    }, []);
      
    const handleSubmit = (event) => {
        console.log("submit! obey!")
    };
    return (
        <>
            <SimpleTable data={sample_data} />
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form> 
        </>
    )
}
export default InventoryForm;