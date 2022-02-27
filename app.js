const axios = require("axios");
const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer(async (req, res) => {
    if(req.url.includes('/pokemones')) {

        try {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        
            const pokemones = data.results.map(async ({url}) => {
                const {data} = await axios(url);
                return {nombre: data.name, img: data.sprites.front_default}
            });

            const datos = await Promise.all(pokemones);

            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify(datos));

        } catch (error) {
            return res.end('Error en el servidor');
        }
    }

    if(req.url.includes('/pokeapi')) {
        return fs.readFile('index.html', 'utf-8', (err, html) => {
            if(err) return res.end('Error de lectura del HTML');

            res.writeHead(200, {"Content-Type": "text/html"});
            return res.end(html);
        })
    }

})

server.listen(5000, () => console.log('Servidor arriba'));

 



