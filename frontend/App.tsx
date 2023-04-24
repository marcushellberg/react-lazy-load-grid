import {Grid, GridDataProviderCallback, GridDataProviderParams} from "@hilla/react-components/Grid.js";
import {GridColumn} from "@hilla/react-components/GridColumn.js";
import Person from "./generated/com/example/application/data/Person.js";
import {PersonEndpoint} from "Frontend/generated/endpoints.js";
import {useEffect, useState} from "react";

export default function App() {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    PersonEndpoint.findAll().then(setPeople);
  }, []);

  async function dataProvider(
    params: GridDataProviderParams<Person>,
    callback: GridDataProviderCallback<Person>
  ){
    const pageResponse = await PersonEndpoint.getPeople(params.page, params.pageSize);
    callback(pageResponse.people, pageResponse.totalCount);
  }

  return (
    <div className="flex flex-col gap-m p-m">
      <h1>Lazy-load / infinite scroll data grid</h1>

      <Grid className="flex-grow" items={people}>
        <GridColumn path="firstName" />
        <GridColumn path="lastName" />
        <GridColumn path="email" autoWidth/>
        <GridColumn path="phone" />
        <GridColumn path="dateOfBirth" />
      </Grid>
    </div>
  )
}
