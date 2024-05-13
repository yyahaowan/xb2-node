const http = require('http');

const app = http.createServer((req, res) => {
  const data={
    id:1,
    title:'关山月',
    content:"明月出天山，苍茫云海间。"
  }

   
  res.writeHead(200,{
    'Access-Control-Allow-Origin':'*',
    'Content-Type':'application/json;charset=utf-8'
  });
  res.end(JSON.stringify(data)); 
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
})