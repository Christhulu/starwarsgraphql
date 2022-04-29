//Next Imports
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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

export default function Character({ character }) {
  // console.log("character", character);

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
        <h1 className={styles.title}>Exploring the Life of {character.name}</h1>
        <p className={styles.description}>
          This is where I was working with dynamic routes.
        </p>
        <Fragment>
          <Card
            className="block flex-auto flex-grow-1 align-self-stretch border-round-top border-3"
          >
            <div className="surface-0">
              <ul className="list-none p-0 m-0">
                <li className="display:block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Birth Year
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {character.birthYear}
                  </div>
                </li>
                <li className="display:block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Homeworld
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {character.homeworld.name}
                  </div>
                </li>
                <li className="display:block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">
                    Height
                  </div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    {character.height}
                  </div>
                </li>
                <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">Hair Color</div>
                  <div
                    className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1"
                    icon="pi pi-star"
                  >
                    {character.hairColor}
                  </div>
                </li>
                <li className="block align-items-center py-3 px-2 border-top-1 border-300">
                  <div className="text-500 w-6 md:w-2 font-medium">Films</div>
                  <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                    <ul>
                      {character.filmConnection.films.map((film) => {
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
                <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Bio
                        </div>
                        <div className="text-900 w-full md:w-4 md:flex-order-0 flex-order-1">
                          {character.name} was born on {character.birthYear} on the planet of {character.homeworld.name}.
                          They eventually grew to become {character.height} cm tall, give or take a few centimeters. 
                          They are an interesting character, known for being in {character.filmConnection.films.length} films.
                          They are affiliated with {character.starshipConnection.starships.length} starships.
                          This is where the story of {character.name} continues...{"unless they're dead."}
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
  const { characterID } = params;

  //console.log(shipID);

  const { data } = await client.query({
    query: gql`
    query GetPeople {
        allPeople(first: 10) {
          people {
            id
            name
            homeworld {
              name
            }
            birthYear
            hairColor
            height
            filmConnection {
              films {
                title
              }
            }
            starshipConnection {
              starships {
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
      character: data.allPeople.people.find((item) => item.id == characterID),
    },
  };
}

export async function getStaticPaths({ params }) {
  const { data } = await client.query({
    query: gql`
      query GetPeople {
        allPeople(first: 10) {
          people {
            id
          }
        }
      }
    `,
  });

  const people = data.allPeople.people;
  const paths = people.map(({ id }) => {
    return {
      params: { characterID: id },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
