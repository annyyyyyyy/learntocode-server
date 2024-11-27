import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', '*')
next()
})

const router = jsonServer.router('./data/db.json');
server.db = router.db; 

const middlewares = jsonServer.defaults();

const rules = jsonServer.rewriter({
    "/products*": "/products",
    "/featured_products*": "/featured_products",
    "/orders*": "/orders",
    "/users*": "/users"
});


server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);


const PORT = process.env.PORT || 8000; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


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