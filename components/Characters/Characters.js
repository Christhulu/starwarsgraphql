import { useQuery, gql } from "../../apollo-client";
import { Fragment } from "react";
import { DataTable } from "primereact/datatable";
import styles from "../styles/Home.module.css";

const QUERY = gql`
{
    allPeople(first:10){
          people{
        name,
        birthYear,
        hairColor,
        height
        
      }
    }
    
  }
`;

export default function Characters() {
  const { data, loading, error } = useQuery(QUERY);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (

    <Fragment>
        <DataTable value={data}>
            <column field="name" header="Name"></column>
            <column field="birthYear" header="Birth Year"></column>
            <column field="hairColor" header="Hair Color"></column>
            <column field="height" header="Height"></column>
        </DataTable>
    </Fragment>

    // <div className={styles.grid}>
    //   {countries.map((country) => (
    //     <div key={country.code} className={styles.card}>
    //       <h3>{country.name}</h3>
    //       <p>
    //         {country.code} - {country.emoji}
    //       </p>
    //     </div>
    //   ))}
    // </div>


  );
}