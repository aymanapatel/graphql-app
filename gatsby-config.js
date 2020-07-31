module.exports = {
    siteMetadata : {
        title: "Journey Job App"
    },
    plugins: [
        "gatsby-plugin-react-helmet",
        {
            resolve: 'gatsby-plugin-chakra-ui',
            options: {
                isUsingColorMode : false
            }
        }
    ]
};