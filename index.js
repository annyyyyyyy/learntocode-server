import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

// CORS headers
server.use((req, res, next) => {
    const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:8000'; // Use Netlify URL in production
    res.header('Access-Control-Allow-Origin', allowedOrigin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Create a JSON Server router
const router = jsonServer.router('./data/db.json');
server.db = router.db; // Set the database for json-server

// Middlewares
const middlewares = jsonServer.defaults();

// Define the rewriter rules based on your routes.json
const rules = jsonServer.rewriter({
    "/products*": "/products",
    "/featured_products*": "/featured_products",
    "/orders*": "/orders",
    "/users*": "/users"
});

// Apply the route rewriter first
server.use(rules);

// Apply json-server-auth middleware for authentication
server.use(auth);

// Apply json-server default middlewares (e.g., logging, CORS, etc.)
server.use(middlewares);

// Use the router for your routes (API will be prefixed with /api)
server.use(router);

// Start the server
const PORT = process.env.PORT || 8000; // Dynamic port for Render
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// import express from "express";
// import jsonServer from "json-server";
// import auth from "json-server-auth";

// const server = express();

// // CORS headers
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// });

// // Create a JSON Server router
// const router = jsonServer.router('./data/db.json');
// server.db = router.db; // Set the database for json-server

// // Middlewares
// const middlewares = jsonServer.defaults();

// // Define the rewriter rules based on your routes.json
// const rules = jsonServer.rewriter({
//     "/products*": "/products",
//     "/featured_products*": "/featured_products",
//     "/orders*": "/orders",
//     "/users*": "/users"
// });

// // Apply the route rewriter first
// server.use(rules);

// // Apply json-server-auth middleware for authentication
// server.use(auth);

// // Apply json-server default middlewares (e.g., logging, CORS, etc.)
// server.use(middlewares);

// // Use the router for your routes (API will be prefixed with /api)
// server.use('/api', router);

// // Start the server
// server.listen(8000, () => {
//     console.log('Server is running on port 8000');
// });


// import express from "express";
// import jsonServer from "json-server";
// import auth from "json-server-auth";

// const server = express();
// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', '*')
//     next()
// })

// const router = jsonServer.router('./data/db.json');
// server.use('/api', router);
// server.db = router.db

// const middlewares = jsonServer.defaults()
// const rules = auth.rewriter({
//     products: 444,
//     featured_products: 444,
//     orders: 660,
//      users: 600
// });

// server.use(rules);
// server.use(auth);
// server.use(middlewares);
// server.use(router);

// server.listen(8000);