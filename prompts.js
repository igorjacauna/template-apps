module.exports = [
    {
      name: 'name',
      message: 'Project name:',
      default: '{outFolder}'
    },
    {
      name: 'type',
      message: 'Which application type you will develop',
      type: 'list',
      pageSize: 10,
      choices: [
        { name: 'Web', value: 'web' },
        { name: 'Desktop (NW.js)', value: 'desktop' }
      ]
    },
    {
      when: ({ type }) => type === 'web',
      name: 'ui',
      message: 'UI framework:',
      type: 'list',
      pageSize: 10,
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Vuetify.js', value: 'vuetify' }
      ],
      default: 'none'
    },
    {
      when: ({ type }) => type === 'web',
      name: 'features',
      message: 'Nuxt.js modules:',
      type: 'checkbox',
      pageSize: 10,
      choices: [
        { name: 'Axios - Promise based HTTP client', value: 'axios' },
        { name: 'Progressive Web App (PWA)', value: 'pwa' },
        { name: 'Content - Git-based headless CMS', value: 'content' }
      ],
      default: []
    },
    {
      when: ({ type }) => type === 'web',
      name: 'linter',
      message: 'Linting tools:',
      type: 'checkbox',
      pageSize: 10,
      choices: [
        { name: 'ESLint', value: 'eslint' },
        { name: 'Prettier', value: 'prettier' },
        { name: 'Lint staged files', value: 'lintStaged' },
        { name: 'StyleLint', value: 'stylelint' },
        { name: 'Commitlint', value: 'commitlint' }
      ],
      default: ['eslint']
    },
    {
      when: ({ type }) => type === 'web',
      name: 'test',
      message: 'Testing framework:',
      type: 'list',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'Jest', value: 'jest' },
        { name: 'AVA', value: 'ava' },
        { name: 'WebdriverIO', value: 'webdriverio' },
        { name: 'Nightwatch', value: 'nightwatch' }
      ],
      default: 'none'
    },
    {
      when: ({ type }) => type === 'web',
      name: 'mode',
      message: 'Rendering mode:',
      type: 'list',
      choices: [
        { name: 'Universal (SSR / SSG)', value: 'universal' },
        { name: 'Single Page App', value: 'spa' }
      ],
      default: 'universal'
    },
    {
      when: ({ type }) => type === 'web',
      name: 'target',
      message: 'Deployment target:',
      type: 'list',
      choices: [
        { name: 'Server (Node.js hosting)', value: 'server' },
        { name: 'Static (Static/JAMStack hosting)', value: 'static' }
      ],
      default: 'server'
    },
    {
      when: ({ type }) => type === 'web',
      name: 'devTools',
      message: 'Development tools:',
      type: 'checkbox',
      choices: [
        { name: 'jsconfig.json (Recommended for VS Code if you\'re not using typescript)', value: 'jsconfig.json' },
        { name: 'Semantic Pull Requests', value: 'semantic-pull-requests' },
        { name: 'Dependabot (For auto-updating dependencies, GitHub only)', value: 'dependabot' }
      ],
      default: []
    },
    {
      when: ({ test, linter, type }) => type === 'web' && (test !== 'none' || linter.length > 0),
      name: 'ci',
      message: 'Continuous integration:',
      type: 'list',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'GitHub Actions (GitHub only)', value: 'github-actions' }
      ],
      default: 'none'
    },
    {
      when: ({ devTools, ci, type }) => type === 'web' && (devTools.includes('dependabot') || ci !== 'none'),
      name: 'gitUsername',
      message: 'What is your GitHub username?',
      default: '{gitUser.name}',
      filter: val => val.toLowerCase(),
      store: true
    },
    {
      name: 'vcs',
      message: 'Version control system:',
      type: 'list',
      choices: [
        { name: 'Git', value: 'git' },
        { name: 'None', value: 'none' }
      ],
      default: 'git'
    }
  ]