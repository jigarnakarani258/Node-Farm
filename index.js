const http = require("http");
const fs = require("fs");
const url = require("url");

const slugify = require("slugify");

const { replaceTemplate } = require("./HelpModule/ReplaceTemplate.js");

const data = fs.readFileSync("dev-data/data.json", "utf-8");
const productdataArray = JSON.parse(data);

//Synchronous ReadFile
// const textRead = fs.readFileSync( 'txt/start.txt' , 'utf-8');
// console.log(textRead);

// ASynchronous ReadFile
// fs.readFile( 'txt/start.txt' , 'utf-8' , (err , data) =>{
//     fs.readFile( `txt/${data}.txt` , 'utf-8' , (err , data1) =>{
//         console.log(data1)
//         fs.readFile('txt/append.txt' , 'utf-8' , (err , data2) =>{
//             console.log(data2)
//             fs.writeFile('txt/final.txt' , `${data1} \n ${data2}` , 'utf-8' , (err, text)=>{
//                 console.log("data written in file final.txt succesfully..")
//             })
//         })

//     });
// });
// console.log("Function first or messgae");

const TemplateOverview = fs.readFileSync(
  "templates/template-overview.html",
  "utf-8"
);
const TemplateProduct = fs.readFileSync(
  "templates/template-product.html",
  "utf-8"
);
const TemplateCard = fs.readFileSync("templates/template-card.html", "utf-8");

const slugdata = productdataArray.map((element) =>
  slugify(element.productName, { lower: true })
);

console.log(slugdata);

//create server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname == "/" || pathname == "/overview") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const tempCard = productdataArray
      .map((element) => replaceTemplate(TemplateCard, element))
      .join("");
    const output = TemplateOverview.replace("%PRODUCT_CARDS%", tempCard);
    res.end(output);
  } else if (pathname == "/product") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const product = productdataArray[query.id];
    const tempProduct = replaceTemplate(TemplateProduct, product);
    res.end(tempProduct);
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h2> 404-Page not found !! </h2>");
  }
});

server.listen(3000, "localhost", (err) => {
  if (err) console.log(err);
  else console.log("Listening on http://localhost:3000/");
});
