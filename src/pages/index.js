import React, { useState } from "react";
import {useQuery, gql} from "@apollo/client";
import {Heading, Box, Input, Text, Button} from "@chakra-ui/core"
import {Helmet} from "react-helmet"
import { graphql, useStaticQuery, Link} from "gatsby";





export default function Index() {

    const [isLoggedIn, setIsLogginIn] = useState(false);
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

    async function handleSubmit(event) {
        console.log("hs1");
        event.preventDefault();

        console.log("hs2");
        const response = await fetch("/.netlify/functions/auth", {
            headers: {
              Authorization: `Basic ${btoa(
                `${event.target.email.value}:${event.target.password.value}`
              )}`,
            },
          });
        console.log("hs3");
        if (response.ok) {
            console.log("hs4");
            const token = await response.text();
            localStorage.setItem("jobapp:token", token);
            console.log(token);
            console.log("hs5");
            setIsLogginIn(true);
        }
        else {
            console.log("frgtjfkldfrkhtyjk");
        }
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
            {!isLoggedIn ? <form onSubmit={handleSubmit}>
                <Input placeholder="Email" type="email" name="email" />
                <Input placeholder="Password" type="password" name="password" />
                <Button type="submit">Login</Button>
            </form> : null}
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