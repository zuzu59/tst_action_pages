// console.log("start")

// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

async function getCommits(){
  const url="https://api.github.com/repos/zuzu59/tst_action_pages/commits";
  const commits= await fetch(url);
  const json= await commits.json();
  // console.log(json); 
  return json; 
}

async function getLastMessage(num){
  // console.log(await getCommits());
  const commits= await getCommits();
  const commitMessages= commits.map(commit => commit.commit.message);
  // console.log(commitMessages);
  return  commitMessages.slice(0, num);
}

async function createPage(){
  let html = '';
  html += `<html>\n<head>\n<title>Test Github Pages</title>\n</head>\n<body>\n<h1>Hello World</h1>\n`;
  // console.log(await getLastMessage(5));
  const num= 5
  const lastMessages= await getLastMessage(num)
  lastMessages.forEach(function(msg){
    html += `\n ${msg} <br><hr>`;
    // console.log(msg);
  });
  html += `\n</body>\n</html>`;
  console.log(html);
  return html;
}

createPage();
