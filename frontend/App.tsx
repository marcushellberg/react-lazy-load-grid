import {Grid, GridDataProviderCallback, GridDataProviderParams} from "@hilla/react-components/Grid.js";
import {GridColumn} from "@hilla/react-components/GridColumn.js";
import Person from "./generated/com/example/application/data/Person.js";
import {PersonEndpoint} from "Frontend/generated/endpoints.js";
import {useEffect, useState} from "react";

export default function App() {

  async function dataProvider(
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ) {
    const res = await PersonEndpoint.getPeople(params.page, params.pageSize);

    callback(res.items, res.totalCount);
  }

  return (
    <div className="flex flex-col gap-m p-m">
      <h1>Lazy-load / infinite scroll data grid</h1>

      <Grid className="flex-grow" dataProvider={dataProvider}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" autoWidth/>
        <GridColumn path="phone" />
        <GridColumn path="dateOfBirth" />
      </Grid>
    </div>
  )
}
