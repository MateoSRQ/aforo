import {useEffect, useState} from 'react'
import { QueryBuilder } from '@cubejs-client/react';
import cubejs from '@cubejs-client/core';
import './App.css'

const cubejsApi = cubejs('YOUR-CUBEJS-API-TOKEN', {
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
});

const App = () => (
    <QueryBuilder
        query={{
            "measures": [
                "Data.totalAmount",
                "Data.count"
            ],
            "dimensions": [
                "Data.actividadNivel1",
                "Data.actividadNivel2",
                "Data.actividadNivel3",
                "Data.actividadNivel4",
                "Data.actividadNivel5",
                "Data.actividadNivel6",
                "Data.actividadNivel7",
                "Data.categoriaNivel1",
                "Data.categoriaNivel2",
                "Data.centroNivel1",
                "Data.centroNivel2"
            ],
            "order": {
                "Data.actividadNivel1": "desc"
            }
        }}
        cubejsApi={cubejsApi}
        render={({ resultSet, measures, availableMeasures, updateMeasures }) => (
            <div>{JSON.stringify(resultSet)}</div>
        )}
    />
)

export default App
