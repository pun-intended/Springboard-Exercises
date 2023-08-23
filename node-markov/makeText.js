/** Command-line tool to generate Markov text. */
const markov = require("./markov")
const fs = require("fs")
const axios = require("axios")

async function catUrl(url) {
    resp = await axios.get(url)
    text = resp.data
    mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
  }

function catFile(filename) {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.log("Error: ", err)
      }
      text = data
      mm = new markov.MarkovMachine(text)
      console.log(mm.makeText())
    })
  }

  if (process.argv[2] === 'file') {
    filename = process.argv[3]
    catFile(filename)
  } else if (process.argv[2] == 'url'){
    url = process.argv[3]
    catUrl(url)
  } else {
    console.log("Error: Please specify 'file' or 'url' as the data type")
  }
