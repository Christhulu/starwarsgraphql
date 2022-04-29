//NextJS imports
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

//CSS imports
import styles from "../styles/Home.module.css";

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
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";

export default function Home({ characters }) {
  console.log("characters", characters);

  //Testing export
  const dt = useRef(null);

  const exportData = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const [text, setText] = useState("");
  const toastRef = useRef();

  //Sidebar
  const [activeSidebar, setActiveSidebar] = useState(false);

  return (
    <Fragment>
      <div className="topbar p-shadow-2 p-py-2 p-px-3">
        <Button
          icon="pi pi-bars"
          className="p-button-rounded"
          onClick={() => setActiveSidebar(true)}
        ></Button>
      </div>
      <div className={styles.container}>
        <Head>
          <title>Star Wars Demo</title>
          <meta
            name="description"
            content="Star Wars Demo Application in Next.JS"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Toast ref={toastRef}></Toast>

          <Sidebar
            visible={activeSidebar}
            onHide={() => setActiveSidebar(false)}
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

          <h1 className={styles.title}>Star Wars Characters</h1>

          <p className={styles.description}>
            Experimenting with using GraphQL, NextJS, and PrimeReact
          </p>

          <Fragment>
            {characters.map((character) => {
              return (
                <Card key={character.name} className="block flex-auto flex-grow-1 align-self-stretch border-round-top border-3 shadow-8">
                  <div className="surface-0">
                    <div className="font-medium text-3xl text-900 mb-3">
                      <Link href={`/${character.id}`}>{character.name}</Link>
                    </div>
                    <ul className="list-none p-0 m-0">
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Birth Year
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {character.birthYear}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Homeworld
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {character.homeworld.name}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Films
                        </div>
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
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Hair Color
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {character.hairColor}
                        </div>
                      </li>
                      <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
                        <div className="text-500 w-6 md:w-2 font-medium">
                          Height (cm)
                        </div>
                        <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                          {character.height}
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
                          This is where the story of {character.name} continues...{"unless they're dead"}
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
            <DataTable value={characters} size="large" ref={dt}>
              <Column header="(Name): " field="name" sortable></Column>
              <Column header="(Date of Birth): " field="birthYear"></Column>
              <Column header="(Hair Color): " field="hairColor"></Column>
              <Column header="(Height): " field="height" sortable></Column>
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

  console.log("data", data);

  return {
    props: {
      characters: data.allPeople.people,
    },
  };
}
