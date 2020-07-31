import React from "react";
import {useQuery, gql} from "@apollo/client";
import {Heading, Box, List, ListItem, Text} from "@chakra-ui/core"
import {Helmet} from "react-helmet"
import { graphql, useStaticQuery, Link} from "gatsby";





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

    const {data, loading, error} = useQuery(
        gql`
        {
            listings {
                id
                title
                description
                url
                company {
                    name
                    url
                }
            }
        }
        `
    )
    if (loading) return <div>Loading the universe...</div>

    if (error) {
        return (
            <>
            <div>Universe is Broken</div>
            
            </>
        );
    }

    const {title} = site.siteMetadata;
    return (
            <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Box as="header" px="4" py="3" bg="gray.200" >
                {title}
            </Box>
            {data.listings.map( listing => 
                <Box key={listing.id} padding="4">
                <Heading>
                    <Link href={listing.url}>{listing.title}</Link>
                </Heading>
                <Text>
                    {
                        listing.company.url ? (
                            <Link href={listing.company.url}>Link: {listing.company.name}</Link>
                        ) : (
                            <Link href={listing.company.url}>Static: {listing.company.name}</Link>
                        
                        )
                    }
                    
                </Text>
                <Text>{listing.description}</Text>
               </Box>

            )}
            
           </>
    )

}