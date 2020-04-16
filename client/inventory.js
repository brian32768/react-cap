import React, { useState, useEffect } from 'react'  // eslint-disable-line no-unused-vars
import SimpleTable from './simpletable'
import axios from 'axios'
import {APIHOST} from './config'

import "d3"
import { generate } from "c3"
import 'c3/c3.css'

const lut_header = {
    "ID": "ID",
    "facility": "Facility",
    "updated": "Data entered",
    "covid_time": "HOSCAP updated",
    "covid_admits": "COVID patients admitted",
    "covid_icu_beds": "COVID patients in ICU",
    "covid_vents": "COVID patients on ventilator",
    "ppe_n95": "N95 masks",
    "ppe_surgical_mask": "Surgical masks",
    "ppe_reusable_mask": "Reusable masks",
    "ppe_respirators_all": "Total, all masks",
    "ppe_gowns": "Gowns",
    "ppe_gloves": "Gloves",
    "ppe_eye_protect": "Face shields",
    "beds_total": "Total beds",
    "beds_icu": "ICU beds",
    "vents_total": "Total ventilators",
    "vents_surge": "Other available ventilators",
    "vents_in_use": "Ventilators in use",
    "staff_needed": "Staff need",
}

const sample_data = [
    { ID: 1, name: "Brian", count: 123 },
    { ID: 2, name: "Julie", count: 456 },
]
const chart_data = [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
    ]


const inventory_url = `${APIHOST}/inventory`

const InventoryForm = () => {
    const [inventory, setInventory] = useState(null);
    //const [barchart, setBarchart] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get(inventory_url)
            setInventory(resp.data);
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        console.log("submission", event)
    };

    const barchart = () => { generate({
            bindto: '#chart',
            data: {
                columns: chart_data,
                types: {
                    data1: 'bar',
                    data2: 'bar'
                }
            }
        })
    };
    return (
        <>
            <h4>Meaningless barchart 4-15-2020 8:00PM</h4>
        <div id="chart">
            { barchart() }
        </div>
        <br />
        <SimpleTable data={inventory} headers={lut_header}/>
        </>
    )
}
export default InventoryForm;
