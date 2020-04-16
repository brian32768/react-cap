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
    const [barchart, setBarchart] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const resp = await axios.get(inventory_url)
            setInventory(resp.data);
            //console.log(resp.data);

            setBarchart(chart_data)
            c3Barchart()
        }
        fetchData();
    }, []);

    const c3Barchart = () => { 
        if (barchart === null) {
            return null;
        }

        let cmh_masks  = ['CMH masks']
        let cmh_gloves = ['CMH gloves']
        let cmh_gowns  = ['CMH gowns']
        let cmh_face   = ['CMH face shields']

        let psh_masks  = ['PSH masks']
        let psh_gloves = ['PSH gloves']
        let psh_gowns  = ['PSH gowns']
        let psh_face   = ['CMH face shields']

        let row;
        for (let id = 0; id < inventory.length; id++) {
            row = inventory[id]
            if (row.facility === 'CMH') {
                cmh_masks.push(row.ppe_respirators_all)
                cmh_gloves.push(row.ppe_gloves)
                cmh_gowns.push(row.ppe_gowns)
                cmh_face.push(row.ppe_eye_protect)
            }
            if (row.facility === 'PSH') {
                psh_masks.push(row.ppe_respirators_all)
                psh_gloves.push(row.ppe_gloves)
                psh_gowns.push(row.ppe_gowns)
                psh_face.push(row.ppe_eye_protect)
            }
        }
        console.log(row);

        generate({
            bindto: '#chart',
            data: {
                columns: [
                    cmh_masks,cmh_gloves, cmh_gowns, 
                    psh_masks, psh_gloves, psh_gowns
                ],
                types: {
                    'CMH masks': 'bar',
                    'CMH gloves': 'bar',
                    'CMH gowns': 'bar',
                    'CMH face shields': 'bar',

                    'PSH masks': 'bar',
                    'PSH gloves': 'bar',
                    'PSH gowns': 'bar',
                    'PSH face shields': 'bar',
                }
            }
        })
    };
    return (
        <>
            <div id="chart">
                {c3Barchart()}
            </div>
        <p>
        <SimpleTable data={inventory} headers={lut_header}/>
        </p>
        </>
    )
}
export default InventoryForm;
