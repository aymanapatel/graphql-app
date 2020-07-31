import React from "react";
import {useQuery, gql} from "@apollo/client";


export default function Index() {
    const {data, loading, error} = useQuery(gql`
    {
        country(code: "NZ") {
          name
          emoji
          languages {
            name
            rtl
          }
        }
    }
    `);
    if (loading) return <div>Loading the universe...</div>

    if (error) {
        return (
            <>
            <div>Broken</div>
            <div>
                { error.errors.map((err,index) => 
                    <p key={index}>{err.message}</p>
                )};
            </div>
            </>
        );
    }

    const { emoji, name, languages} = data.country;
    return <div>
            <h1>
                {emoji}{name}
            </h1>
            <ul>
                { languages.map(language => 
                    <li key={language.code}>{language.name} </li>
                )}
            </ul>
           </div>;

}