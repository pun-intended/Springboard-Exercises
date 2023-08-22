/** Command-line tool to generate Markov text. */

async function catUrl(url) {
    resp = await axios.get(url)
    this.words = resp.data
  }

  function catFile(filename) {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        console.log("Error: ", err)
      }
      this.words = data
    })
  }

  if (process.argv[2] === 'file') {
    filename = process.argv[3]
    catFile(filename)
  } else if (process.argv[2] == 'url'){
    url = process.argv[3]
  } else {
    console.log("Error: Please specify 'file' or 'url' as the data type")
  }
