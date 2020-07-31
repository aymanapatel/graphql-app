import React from "react";
import {useQuery, gql} from "@apollo/client";
import {Heading, Box, List, ListItem} from "@chakra-ui/core"
import {Helmet} from "react-helmet"
import { graphql, useStaticQuery} from "gatsby";





export default function Index() {

    const {site} = useStaticQuery( // Fetching from `gatsby-config.js`
        graphql`
        {
            site {
                siteMetadata {
                    title
                }
            }
        }
        `
    );

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
            <div>Universe is Broken</div>
            
            </>
        );
    }

    const {title} = site.siteMetadata;
    const { emoji, name, languages} = data.country;
    return (
            <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box as="header" px="4" py="3" bg="gray.200" >
                Job App
            </Box>
            <Box padding="4">
            <Heading>
                {emoji}{name}
            </Heading>
            <List styleType="disc">
                { languages.map(language => 
                    <ListItem key={language.code}>{language.name} </ListItem>
                )}
            </List>
           </Box>
           </>
    )

}