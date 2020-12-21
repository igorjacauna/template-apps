#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const cac = require('cac')
const sao = require('sao')

const cli = cac('create-app')

const generator = path.resolve(__dirname, './')

cli
  .command('[out-dir]', 'Generate in a custom directory or current directory')
  .action((outDir = '.', cliOptions) => {
    const files = fs.existsSync(outDir) ? fs.readdirSync(outDir) : []
    console.log()
    console.log(chalk`{cyan create-app}`)

    if (files.length) {
      return console.log(chalk.red(`Can't create ${outDir} because there's already a non-empty directory ${outDir} existing in path.`))
    }

    console.log(chalk`✨  Generating App project in {cyan ${outDir}}`)

    sao({ generator, outDir })
      .run()
      .catch((err) => {
        console.trace(err)
        process.exit(1)
      })
  })

cli.help()

cli.parse()