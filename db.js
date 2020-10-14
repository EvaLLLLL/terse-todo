const home = process.env.HOME || require('os').homedir()
const dbPath = require('path').join(home, '.todo')
const fs = require('fs')

const db = {
	read(path = dbPath) {
		return new Promise((resolve, reject) => {
			fs.readFile(path, {flag: 'a+'}, (error, data) => {
				if (error) return reject(error)
				let list
				try {
					list = JSON.parse(data.toString())
				} catch (error2) {
					list = []
				}
				resolve(list)
			})
		})
	},
	write(list, path = dbPath) {
		return new Promise((resolve, reject) => {
			const string = JSON.stringify(list)
			fs.writeFile(path, string + '\n', (error) => {
				if (error) return reject(error)
			})
		})
	}
}

module.exports = db