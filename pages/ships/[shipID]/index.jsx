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

const client = new ApolloClient({
  uri: "http://localhost:59550/",
  cache: new InMemoryCache(),
});

export default function Ship({ ship }) {
  // console.log("ship", ship);

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
        <h1 className={styles.title}>Building the {ship.name}</h1>
        <p className={styles.description}>
          This is where I was working with dynamic routes.
        </p>
        <Fragment>
          <Card
            key={ship.id}
            className="block flex-auto flex-grow-1 align-self-stretch border-round-top border-3"
          >
            <div className="surface-0">
              <ul className="list-none p-0 m-0">
              <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Bio
                        </div>
                        <div className="text-900 w-full md:w-4 md:flex-order-0 flex-order-1">
                          {"Let's"} take a look into the build of the {ship.name}. This starship has been featured in {ship.filmConnection.films.length} film(s). {ship.costInCredits !=null ?" This ship costs a considerable sum of: ": " This ship does not have a known cost."}{ship.costInCredits !=null ? ship.costInCredits: ""}
                          {ship.maxAtmospheringSpeed !=null ?" This ship boasts an impressive max atmosphering speed of: ": " This ship does not have a known cost. "}{ship.maxAtmospheringSpeed !=null ?ship.maxAtmospheringSpeed + " MGLT/hr. ": ""}
                          This ship is an impressive specimen, requiring a crew of {ship.crew}. Lastly, it supports {ship.passengers !="n/a"? ship.passengers: "an unknown amount of "} passengers.
                        </div>
                      </li>
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
                    Starship Class
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {ship.starshipClass}
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Cost in Credits
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {ship.costInCredits}
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">Max Atmosphering Speed (MGLT/hr)</div>
                  <div
                    className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1"
                    icon="pi pi-star"
                  >
                    {ship.maxAtmospheringSpeed}
                  </div>
                </li>
                <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                  <div className="text-500 w-6 md:w-2 font-medium">Films</div>
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
                <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Pilots
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {ship.pilotConnection.pilots.length > 0?<ul>
                      {ship.pilotConnection.pilots.map((pilot) => {
                        return (
                          <Chip
                            key={pilot.name}
                            label={pilot.name != undefined? pilot.name:"No pilots"}
                            icon="pi pi-star"
                          ></Chip>
                        );
                      })}
                    </ul>:<div className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">No known pilots</div>}
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
  const { shipID } = params;

  //console.log(shipID);

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
              }
            },
            pilotConnection {
                pilots{
                    name
                }
            }
          }
        }
      }
    `,
  });

  //console.log("Is this reached?");

  return {
    props: {
      ship: data.allStarships.starships.find((item) => item.id == shipID),
    },
  };
}

export async function getStaticPaths({ params }) {
  const { data } = await client.query({
    query: gql`
      query GetShips {
        allStarships(first: 10) {
          starships {
            id
          }
        }
      }
    `,
  });

  const ships = data.allStarships.starships;
  const paths = ships.map(({ id }) => {
    return {
      params: { shipID: id },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
