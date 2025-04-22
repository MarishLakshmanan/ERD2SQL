const mock ={
    nodes:[
        {
            "id": "233f3d48-9198-41ce-9f42-4deb818043d3",
            "data": {
                "label": "department",
                "weak":true
            },
            "type": "entity",
            "position": {
                "x": 389.97828486958934,
                "y": 247.4318702193848
            },
            "measured": {
                "width": 216,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "data": {
                "label": "Manages",
                "weak":true
            },
            "type": "relation",
            "position": {
                "x": -35.8197104914103,
                "y": 283.389910756692
            },
            "measured": {
                "width": 176,
                "height": 176
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "cff26c32-152f-4db4-91e8-81f849f03aa6",
            "data": {
                "label": "did",
                "type": "Primary-Key"
            },
            "type": "attribute",
            "position": {
                "x": 279.474134539637,
                "y": 33.305207743065566
            },
            "measured": {
                "width": 169,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "396935c4-9169-4905-ba9d-8180580e574e",
            "data": {
                "label": "dname"
            },
            "type": "attribute",
            "position": {
                "x": 544.4677439735933,
                "y": 53.577942891018495
            },
            "measured": {
                "width": 192,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "939d5be6-59e3-4e5c-842e-c6dd140bc0be",
            "data": {
                "label": "budget"
            },
            "type": "attribute",
            "position": {
                "x": 735.6106753685781,
                "y": 95.57146569749244
            },
            "measured": {
                "width": 193,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "869b4a2b-2e75-40ef-b154-148a20fa2457",
            "data": {
                "label": "Since",
                "dataType":"NCHAR"
            },
            "type": "attribute",
            "position": {
                "x": -79.64288808124371,
                "y": 50.68183786988236
            },
            "measured": {
                "width": 185,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "fb77d435-782a-4028-8712-ccf8c596eddf",
            "data": {
                "label": "Employees"
            },
            "type": "entity",
            "position": {
                "x": -525.5971920287664,
                "y": 450.92218113943335
            },
            "measured": {
                "width": 214,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "b293be45-8f15-4026-9013-57683f6e63ba",
            "data": {
                "label": "SSN",
                "type": "Primary-Key"
            },
            "type": "attribute",
            "position": {
                "x": -502.6202656012793,
                "y": 219.71685896284498
            },
            "measured": {
                "width": 178,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "9e68cfb1-e60d-4c6b-b2f9-d7a11eb71186",
            "data": {
                "label": "Name"
            },
            "type": "attribute",
            "position": {
                "x": -228.33320637315262,
                "y": 219.71685896284495
            },
            "measured": {
                "width": 187,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "cc30a85e-63ce-4306-a2c8-d1a450f83377",
            "data": {
                "label": "Lot"
            },
            "type": "attribute",
            "position": {
                "x": -324.5490857882547,
                "y": 110.57645843228144
            },
            "measured": {
                "width": 171,
                "height": 60
            },
            "selected": false,
            "dragging": false
        },
        {
            "id": "d28de12b-3fe8-48d9-be38-1011378b0173",
            "data": {
                "label": "Test"
            },
            "type": "entity",
            "position": {
                "x": 363.93259431926714,
                "y": 530.8913618162505
            },
            "measured": {
                "width": 167,
                "height": 60
            },
            "selected": false,
            "dragging": false
        }
    ],
    edges:[
        {
            "id": "233f3d48-9198-41ce-9f42-4deb818043d3-517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "source": "233f3d48-9198-41ce-9f42-4deb818043d3",
            "target": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "data": {
                "source": "entity",
                "target": "relation",
                "relation":"Many-to-Many"
            },
            "type": "customEdge",
            "style": {
                "strokeWidth": 2
            },
            "markerEnd": {
                "type": "arrowclosed"
            },
            "sourceHandle": "e-b",
            "targetHandle": "r-c",
            "selected": false
        },
        {
            "source": "cff26c32-152f-4db4-91e8-81f849f03aa6",
            "sourceHandle": "a-a",
            "target": "233f3d48-9198-41ce-9f42-4deb818043d3",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__cff26c32-152f-4db4-91e8-81f849f03aa6a-a-233f3d48-9198-41ce-9f42-4deb818043d3e-a"
        },
        {
            "source": "396935c4-9169-4905-ba9d-8180580e574e",
            "sourceHandle": "a-a",
            "target": "233f3d48-9198-41ce-9f42-4deb818043d3",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__396935c4-9169-4905-ba9d-8180580e574ea-a-233f3d48-9198-41ce-9f42-4deb818043d3e-a"
        },
        {
            "source": "939d5be6-59e3-4e5c-842e-c6dd140bc0be",
            "sourceHandle": "a-a",
            "target": "233f3d48-9198-41ce-9f42-4deb818043d3",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__939d5be6-59e3-4e5c-842e-c6dd140bc0bea-a-233f3d48-9198-41ce-9f42-4deb818043d3e-a"
        },
        {
            "source": "869b4a2b-2e75-40ef-b154-148a20fa2457",
            "sourceHandle": "a-a",
            "target": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "targetHandle": "r-a",
            "data": {
                "source": "attribute",
                "target": "relation"
            },
            "id": "xy-edge__869b4a2b-2e75-40ef-b154-148a20fa2457a-a-517a3c46-b3a9-4f4f-a0cd-529dac07b5b3r-a"
        },
        {
            "source": "b293be45-8f15-4026-9013-57683f6e63ba",
            "sourceHandle": "a-a",
            "target": "fb77d435-782a-4028-8712-ccf8c596eddf",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__b293be45-8f15-4026-9013-57683f6e63baa-a-fb77d435-782a-4028-8712-ccf8c596eddfe-a"
        },
        {
            "source": "cc30a85e-63ce-4306-a2c8-d1a450f83377",
            "sourceHandle": "a-a",
            "target": "fb77d435-782a-4028-8712-ccf8c596eddf",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__cc30a85e-63ce-4306-a2c8-d1a450f83377a-a-fb77d435-782a-4028-8712-ccf8c596eddfe-a"
        },
        {
            "source": "9e68cfb1-e60d-4c6b-b2f9-d7a11eb71186",
            "sourceHandle": "a-a",
            "target": "fb77d435-782a-4028-8712-ccf8c596eddf",
            "targetHandle": "e-a",
            "data": {
                "source": "attribute",
                "target": "entity"
            },
            "id": "xy-edge__9e68cfb1-e60d-4c6b-b2f9-d7a11eb71186a-a-fb77d435-782a-4028-8712-ccf8c596eddfe-a"
        },
        {
            "id": "fb77d435-782a-4028-8712-ccf8c596eddf-517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "source": "fb77d435-782a-4028-8712-ccf8c596eddf",
            "target": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "data": {
                "source": "entity",
                "target": "relation",
                "relation":"Many-to-Many"
            },
            "type": "customEdge",
            "style": {
                "strokeWidth": 2
            },
            "markerEnd": {},
            "sourceHandle": "e-b",
            "targetHandle": "r-b",
            "selected": false
        },
        {
            "id": "d28de12b-3fe8-48d9-be38-1011378b0173-517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "source": "d28de12b-3fe8-48d9-be38-1011378b0173",
            "target": "517a3c46-b3a9-4f4f-a0cd-529dac07b5b3",
            "data": {
                "source": "entity",
                "target": "relation",
                "relation": "Constraint-M-to-M"
            },
            "type": "customEdge",
            "style": {
                "strokeWidth": 5
            },
            "markerEnd": {
                "type": null
            },
            "sourceHandle": "e-b",
            "targetHandle": "r-c"
        }
    ]
}

export {mock}