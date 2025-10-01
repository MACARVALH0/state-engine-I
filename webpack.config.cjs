const path = require("path");
const webpack = require("webpack");


module.exports =
{
    mode: "development",

    experiments:
    {
        outputModule: true
    },

    entry: [ "webpack-hot-middleware/client", path.join( __dirname, "State", "src", "index.js" ) ],

    output: 
    {
        path: path.join( __dirname, "dist" ),
        filename: "bundle.js",

        library:
        {
            // name: "Engine",
            type: "module",
            export: "default"
        },

    },
    
    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),
    ],

    // loaders,
}

// Talvez retornar ao modelo ES6 no futuro...

// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// import webpack from "webpack";



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// export default
// {
//     mode: "development",

//     entry: [ "webpack-hot-middleware/client", join( __dirname, "State", "src", "index.js" )],

//     output:
//     {
//         filename: "bundle.js",
//         path: join(__dirname, "dist"),
//     },

//     plugins:
//     [
//         webpack.HotModuleReplacementPlugin(),
//     ],

//     // loaders,
// }