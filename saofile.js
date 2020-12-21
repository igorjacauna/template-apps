const { dirname, join, relative } = require('path')
const spawn = require('cross-spawn')
const pkg = require('./package')

const cnaTemplateDir = join(dirname(require.resolve('./cna-template/package.json')))
const templateDir = join(cnaTemplateDir, 'template')
const frameworksDir = join(templateDir, 'frameworks')

module.exports = {
    prompts: require('./prompts'),
    templateData() {
        const pwa = this.answers.type === 'web' && this.answers.features.includes('pwa')
        const eslint = this.answers.type === 'web' && this.answers.linter.includes('eslint')
        const prettier = this.answers.type === 'web' && this.answers.linter.includes('prettier')
        const lintStaged = this.answers.type === 'web' && eslint && this.answers.linter.includes('lintStaged')
        const stylelint = this.answers.type === 'web' && this.answers.linter.includes('stylelint')
        const commitlint = this.answers.type === 'web' && this.answers.linter.includes('commitlint')
        const axios = this.answers.type === 'web' && this.answers.features.includes('axios')
        const content = this.answers.type === 'web' && this.answers.features.includes('content')

        const { cliOptions = {} } = this.sao.opts
        const edge = cliOptions.edge ? '-edge' : ''
        const pm = 'npm'
        const pmRun = 'npm run'

        return {
            pwa,
            eslint,
            prettier,
            lintStaged,
            stylelint,
            commitlint,
            axios,
            edge,
            content,
            pm,
            pmRun,
            typescript: false
        }
    },
    actions() {
        const generator = this
        const actions = []

        if (this.answers.type === 'web') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'nuxt'),
                filters: {
                    'static/icon.png': 'features.includes("pwa")',
                    'content/hello.md': 'features.includes("content")',
                    'pages/content.vue': 'features.includes("content")'
                }
            })

            if (this.answers.ui !== 'none') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: join(frameworksDir, this.answers.ui)
                })
            }

            if (this.answers.test !== 'none') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: join(frameworksDir, this.answers.test)
                })
            }

            if (this.answers.ci && this.answers.ci !== 'none') {
                actions.push({
                    type: 'add',
                    files: '**',
                    templateDir: join(frameworksDir, this.answers.ci)
                })
            }

            actions.push({
                type: 'add',
                files: '*',
                filters: {
                    '_.eslintrc.js': 'linter.includes("eslint")',
                    '_.prettierrc': 'linter.includes("prettier")',
                    '_jsconfig.json': 'devTools.includes("jsconfig.json")',
                    'tsconfig.json': 'language.includes("ts")',
                    'semantic.yml': 'devTools.includes("semantic-pull-requests")',
                    '_stylelint.config.js': 'linter.includes("stylelint")',
                    '_commitlint.config.js': 'linter.includes("commitlint")',
                    'dependabot.yml': 'devTools.includes("dependabot")'
                },
                templateDir
            })

            actions.push({
                type: 'move',
                patterns: {
                    gitignore: '.gitignore',
                    '_package.json': 'package.json',
                    '_.prettierrc': '.prettierrc',
                    '_.eslintrc.js': '.eslintrc.js',
                    '_jsconfig.json': 'jsconfig.json',
                    '_stylelint.config.js': 'stylelint.config.js',
                    '_commitlint.config.js': 'commitlint.config.js',
                    'semantic.yml': '.github/semantic.yml',
                    'dependabot.yml': '.github/dependabot.yml'
                }
            })

            actions.push({
                type: 'modify',
                files: 'package.json',
                handler(data) {
                    return { ...data, ...pkg.load(generator) }
                }
            })

            // For compiling package.json
            actions.push({
                type: 'add',
                files: 'package.json',
                templateDir: this.outDir
            })

            actions.push({
                type: 'remove',
                files: 'package.js'
            })
        }

        if (this.answers.type === 'desktop') {
            actions.push({
                type: 'add',
                files: '**',
                templateDir: join(templateDir, 'nwjs')
            })
        }

        return actions
    },
    async completed() {
        if (this.answers.vcs === 'git') {
            this.gitInit()
        }

        await this.npmInstall()

        if (this.answers.type === 'web' && this.answers.linter.includes('eslint')) {
            const options = ['run', 'lint:js', '--', '--fix']
            spawn.sync('npm', options, {
                cwd: this.outDir,
                stdio: 'inherit'
            })
        }

        if (this.answers.type === 'web' && this.answers.linter.includes('stylelint')) {
            const options = ['run', 'lint:style', '--', '--fix']
            spawn.sync('npm', options, {
                cwd: this.outDir,
                stdio: 'inherit'
            })
        }

        const chalk = this.chalk
        const isNewFolder = this.outDir !== process.cwd()
        const relativeOutFolder = relative(process.cwd(), this.outDir)
        const cdMsg = isNewFolder ? chalk`\t{cyan cd ${relativeOutFolder}}\n` : ''
        const pmRun = 'npm run'

        console.log(chalk`\n🎉  {bold Successfully created project} {cyan ${this.answers.name}}\n`)

        console.log(chalk`  {bold To get started:}\n`)
        console.log(chalk`${cdMsg}\t{cyan ${pmRun} dev}\n`)

        console.log(chalk`  {bold To build & start for production:}\n`)
        console.log(chalk`${cdMsg}\t{cyan ${pmRun} build}`)
        console.log(chalk`\t{cyan ${pmRun} start}\n`)

        if (this.answers.test !== 'none') {
            console.log(chalk`  {bold To test:}\n`)
            console.log(chalk`${cdMsg}\t{cyan ${pmRun} test}\n`)
        }
    }
}
