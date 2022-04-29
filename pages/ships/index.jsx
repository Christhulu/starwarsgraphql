//Next Imports
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

//GraphQL/Apollo imports
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

//React imports
import { useRef, useState, Fragment } from "react";

//PrimeReact imports
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";

export default function ShipPage({ ships }) {
  console.log('ships', ships);

  //Testing export
  const shipTable = useRef(null);

  const exportData = (selectionOnly) => {
    shipTable.current.exportCSV({ selectionOnly });
  };

  const [activeSidebar, setActiveSidebar] = useState(false);
  const [text, setText] = useState("");
  const toastRef = useRef();

  return (
    <Fragment>
      <div className="topbar p-shadow-2 p-py-2 p-px-3">
        <Button
          icon="pi pi-bars"
          className="p-button-rounded"
          onClick={() => setActiveSidebar(true)}
        ></Button>
      </div>

      <Sidebar visible={activeSidebar} onHide={() => setActiveSidebar(false)}>
        <h1>
          <Link href="/">View Characters</Link>
        </h1>
        <h1>
          <Link href="/ships">View Ships</Link>
        </h1>
        <h1>
          <Link href="/planets">View Planets</Link>
        </h1>
      </Sidebar>
      <div className={styles.container}>
        <Head>
          <title>Star Wars Demo</title>
          <meta name="description" content="Star Wars Demo Application in Next.JS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Star Wars Ships</h1>
          <p className={styles.description}>
            Experimenting with using GraphQL, NextJS, and PrimeReact
          </p>

          <Fragment>
            {ships.map((ship) => {
              return (
                <Card key={ship.id} className="block flex-auto flex-grow-1 align-self-stretch">
                  <div className="surface-0">
                    <div className="font-medium text-3xl text-900 mb-3">
                      <Link href={`/ships/${ship.id}`}>{ship.name}</Link>
                    </div>
                    <div className="text-500 mb-5">Future Description</div>
                    <ul className="list-none p-0 m-0">
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Model
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {ship.model}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Films
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          <ul>
                            {ship.filmConnection.films.map((film) => {
                              return (
                                <Chip
                                  key={film.title}
                                  label={film.title}
                                  icon="pi pi-star"
                                ></Chip>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Cost in Credits
                        </div>
                        <div
                          className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1"
                          icon="pi pi-star"
                        >
                          { (ship.costInCredits === null) ? "(Not For Sale)": ship.costInCredits}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Hyperdrive Rating
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {ship.hyperdriveRating}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Max Atmosphering Speed (MGLT/hr)
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {ship.maxAtmospheringSpeed != null? ship.maxAtmospheringSpeed: "Unknown"}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Plot
                        </div>
                        <div className="text-900 w-full md:w-4 md:flex-order-0 flex-order-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card>
              );
            })}
          </Fragment>

          <h1>Star Wars Info but in DataTable Form</h1>

          <Card>
            <div style={{ textAlign: "left" }}>
              <Button
                type="button"
                icon="pi pi-external-link"
                iconPos="left"
                label="CSV"
                onClick={() => exportData()}
              ></Button>
            </div>
            <DataTable value={ships} size="large" ref={shipTable}>
              <Column header="Name" field="name" sortable></Column>
              <Column header="Model" field="model"></Column>
              <Column header="Crew" field="crew" sortable></Column>
              <Column header="Passengers" field="passengers" sortable></Column>
            </DataTable>
          </Card>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </a>
        </footer>
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://localhost:59550/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetShips {
        allStarships(first: 10) {
          starships {
            id,
            name,
            model,
            starshipClass,
            costInCredits,
            hyperdriveRating,
            maxAtmospheringSpeed,
            crew,
            passengers,
            filmConnection {
              films {
                title
                episodeID
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      ships: data.allStarships.starships,
    },
  };
}
