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

export default function PlanetPage({ planets }) {
  console.log("planets", planets);

  //Testing export
  const planetTable = useRef(null);

  const exportData = (selectionOnly) => {
    planetTable.current.exportCSV({ selectionOnly });
  };

  const [activeSidebar, setActiveSidebar] = useState(false);
  const [text, setText] = useState("");
  const toastRef = useRef();

  return (
    <Fragment>
      <div className="topbar bg-secondary p-shadow-2 p-py-2 p-px-3">
        <Button
          icon="pi pi-bars"
          className="p-button-rounded bg-secondary"
          onClick={() => setActiveSidebar(true)}
        ></Button>
      </div>

      <Sidebar
        visible={activeSidebar}
        onHide={() => setActiveSidebar(false)}
        className="bg-secondary"
      >
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
          <h1 className={styles.title}>Star Wars Planets</h1>
          <p className={styles.description}>
            Experimenting with using GraphQL, NextJS, and PrimeReact
          </p>

          <Fragment>
            {planets.map((planet) => {
              return (
                <Card
                  key={planet.id}
                  className="block flex-auto flex-grow-1 align-self-stretch border-round-top border-3"
                >
                  <div className="surface-0">
                    <div className="font-large text-3xl text-900 mb-3">
                      <Link href={`/planets/${planet.id}`}>{planet.name}</Link>
                    </div>

                    <div className="text-500 mb-5">Future Description</div>
                    <ul className="list-none p-0 m-0">
                      <li className="display:block align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Population
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {planet.population}
                        </div>
                      </li>
                      <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Films
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          <ul>
                            {planet.filmConnection.films.map((film) => {
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
                      <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Residents
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          <ul>
                            {planet.residentConnection.residents.map(
                              (resident) => {
                                return (
                                  <Chip
                                    key={resident.name}
                                    label={resident.name}
                                    icon="pi pi-user"
                                  ></Chip>
                                );
                              }
                            )}
                          </ul>
                        </div>
                      </li>
                      <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Climates
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          <ul>
                            {planet.climates.map((climate) => {
                              return (
                                <Chip
                                  key={climate}
                                  label={climate}
                                  icon="pi pi-star"
                                ></Chip>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                      <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Gravity
                        </div>
                        <div
                          className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1"
                          icon="pi pi-star"
                        >
                          {planet.gravity}
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card>
              );
            })}
          </Fragment>

          <h1>Star Wars Info but in DataTable Form</h1>

          <Card className="block flex-auto flex-grow-1 align-self-stretch">
            <div style={{ textAlign: "left" }}>
              <Button
                type="button"
                icon="pi pi-external-link"
                iconPos="left"
                label="CSV"
                onClick={() => exportData()}
              ></Button>
            </div>
            <DataTable value={planets} size="large" ref={planetTable}>
              <Column header="Name" field="name" sortable></Column>
              <Column header="Diameter" field="diameter" sortable></Column>
              <Column header="Gravity" field="gravity" sortable></Column>
              <Column header="Population" field="population" sortable></Column>
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
      query GetPlanets {
        allPlanets(first: 10) {
          planets {
            id,
            name,
            population,
            diameter,
            gravity,
            climates,
            filmConnection {
              films {
                title
              }
            },
            residentConnection {
              residents {
                name
                birthYear
                homeworld {
                  id
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      planets: data.allPlanets.planets,
    },
  };
}
