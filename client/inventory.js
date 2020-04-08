import React, { useState, useEffect } from 'react'  // eslint-disable-line no-unused-vars
import SimpleTable from './simpletable'
import axios from 'axios'

const sample_data = [
    { ID: 1, name: "Brian", count: 123 },
    { ID: 2, name: "Julie", count: 456 },
]

const inventory_url = "http://localhost:3000/inventory";

const InventoryForm = () => {
    const [inventory, setInventory] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get(inventory_url)
            setInventory(resp.data);
        }
        fetchData();
    }, []);
      
    const handleSubmit = (event) => {
        console.log("submit! obey!")
    };
    return (
        <>
            <SimpleTable data={inventory} />
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form> 
        </>
    )
}
export default InventoryForm;