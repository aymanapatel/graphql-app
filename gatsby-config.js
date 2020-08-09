module.exports = {
    siteMetadata : {
        title: "Journey Job App"
    },
    plugins: [

        "gatsby-plugin-react-helmet", // React Helmet
        // Chakra Plugin
        {
            resolve: 'gatsby-plugin-chakra-ui',
            options: {
                isUsingColorMode : false
            }
        },
        'gatsby-plugin-tslint', // TSLint
        // TS Plugin. Gatsby already ships with TS
        {
            resolve: 'gatsby-plugin-typescript',
            options: {
              isTSX: true, // defaults to false
              jsxPragma: 'jsx', // defaults to "React"
              allExtensions: true, // defaults to false
            },
        }
    ]
};