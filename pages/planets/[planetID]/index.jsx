//Next Imports
import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
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
import { Ripple } from 'primereact/ripple';

const client = new ApolloClient({
  uri: "http://localhost:59550/",
  cache: new InMemoryCache(),
});

export default function Planet({ planet }) {
  // console.log("planets", planet);

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

      <Head>
          <title>Star Wars Demo</title>
          <meta name="description" content="Star Wars Demo Application in Next.JS" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to {planet.name}</h1>
        <p className={styles.description}>
          This is where I was working with dynamic routes.
        </p>
        <Fragment>
          <Card
            key={planet.id}
            className="block flex-auto flex-grow-1 align-self-stretch border-round-top border-3 shadow-8"
          >
            <div className="surface-0">
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
                  <div className="text-500 w-6 md:w-2 font-medium">Films</div>
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
                      {planet.residentConnection.residents.map((resident) => {
                        return (
                          <Chip
                            key={resident.name}
                            label={resident.name}
                            icon="pi pi-user"
                          ></Chip>
                        );
                      })}
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
                  <div className="text-500 w-6 md:w-2 font-medium">Gravity</div>
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
        </Fragment>
      </main>
    </Fragment>
  );
}

export async function getStaticProps({ params }) {
  const { planetID } = params;

  //console.log(planetID)

  const { data } = await client.query({
    query: gql`
      query GetPlanets {
        allPlanets(first: 10) {
          planets {
            id
            name
            population
            diameter
            gravity
            climates
            filmConnection {
              films {
                title
              }
            }
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

  console.log(data.allPlanets.planets[planetID]);

  return {
    props: {
      planet: data.allPlanets.planets.find((item) => item.id == planetID),
    },
  };
}

export async function getStaticPaths({ params }) {
  const { data } = await client.query({
    query: gql`
      query GetPlanets {
        allPlanets(first: 10) {
          planets {
            id
          }
        }
      }
    `,
  });

  const planets = data.allPlanets.planets;
  const paths = planets.map(({ id }) => {
    return {
      params: { planetID: id },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
