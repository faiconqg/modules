# @faiconqg/react-modules

# Resume

Modules to share across projects (enabling editing and commit)

# Setup new project

## 1. Create a new React project :

```bash
npx create-react-app my-projetct --template typescript
```

## 2. Access the newly created project folder:

```bash
cd my-project
```

## 3. Import this project as a git submodule:

```bash
git submodule add https://github.com/faiconqg/react-modules.git src/modules
```

## 4. Install the required dependencies and dev dependencies:

```bash
npm i @material-ui/core @material-ui/icons @nivo/line @ag-grid-community/all-modules @ag-grid-community/react lodash @types/lodash firebase mobx mobx-react-lite mobx-react-form moment prop-types react-dom-factories react-router-dom @types/react-router-dom validatorjs
npm i -D eslint-plugin-prettier grunt grunt-bump prettier
```

## 5. Add these scripts to `scripts` section in package.json

```json
{
  "start": "REACT_APP_VERSION=$npm_package_version react-scripts start", --edit
    "build": "REACT_APP_VERSION=$npm_package_version react-scripts build", --edit
  "pushModules": "git submodule foreach 'git push origin master'",
  "pullModules": "git submodule foreach 'git pull origin master'",
  "bump": "grunt bump:minor",
  "bugfix": "grunt bump:patch",
  "merge-master": "git checkout master && git merge develop",
  "merge-develop": "git checkout develop && git merge master"
}
```

## 6. Setup VS Code

```bash
mkdir .vscode &&
echo '{
  "editor.rulers": [80],
  "editor.tabCompletion": "on",
  "editor.tabSize": 2,
  "editor.trimAutoWhitespace": true,
  "editor.formatOnSave": true,

  "files.exclude": {
    "**/.DS_Store": true,
    "**/.git": true,
    "**/.hg": true,
    "**/.svn": true,
    "**/CVS": true,
    "dist": true
  },
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,

  "typescript.tsdk": "./node_modules/typescript/lib",
  "eslint.run": "onSave",
  "eslint.nodePath": "./node_modules",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}' > .vscode/settings.json

```

## 7. Setup eslint

```bash
echo '{
  "extends": "react-app",
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}' > .eslintrc
```

## 8. Setup prettier

```bash
echo '{
  "semi": false,
  "singleQuote": true,
  "printWidth": 80
}' > .prettierrc
```

## 9. Setup grunt

```bash
echo 'module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        pushTo: 'origin'
      }
    }
  })

  grunt.loadNpmTasks('grunt-bump')
}' > Gruntfile.js
```

## 10. Create a develop branch

```bash
git checkout -b develop
```

## 11. Remove unused files

```bash
rm src/App.css src/App.test.tsx src/index.css src/App.tsx src/logo.svg
```

## 12. Setup Atomic Design structure

```bash
mkdir src/components src/components/atoms src/components/molecules src/components/organims src/components/templates
```

## 13. Create a file `config.json` in th src folder

```json
{
  "appName": "The App Name",
  "companyName": "The Company Name",
  "companyUrl": "https://www.website.com",
  "allowNewUsers": true | false,
  "displayAppNameInMenuHeader": false
}
```

## 14. Create a `firebase.json` file in src folder

This information can be found on the firebase console. [Add Firebase to your JavaScript project.](https://firebase.google.com/docs/web/setup?hl=pt-br)

```json
{
  "apiKey": "********************************",
  "authDomain": "********.firebaseapp.com",
  "databaseURL": "https://******.firebaseio.com",
  "projectId": "***",
  "storageBucket": "****.appspot.com",
  "messagingSenderId": "*****",
  "appId": "*****",
  "measurementId": "G-Q6EX9R1BP8"
}
```

## 14. Edit `tsconfig.json` file

```json
{
  "compilerOptions": {
    "baseUrl": "./src/",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react"
  },
  "include": ["src"]
}
```

# Starting the development

## 1. Create roots

`root.tsx` in src folder

```tsx
import React from 'react'
import Sync from '@material-ui/icons/Sync'
import AutoRoute from 'modules/libs/AutoRoute'
import Sample from 'modules/pages/Sample'
import SampleTab from 'modules/pages/SampleTab'
import SimplePage from 'modules/components/templates/SimplePage'

const Root: React.FC = () => {
  return (
    <AutoRoute
      headerButtons={[
        {
          icon: <Sync />,
          label: 'Test Button',
          action: () => console.log('button click')
        }
      ]}
      featureRoutes={[
        { path: '', label: 'Overview', icon: 'home', page: Sample }
      ]}
      routes={[
        {
          label: 'Test1',
          routes: [
            {
              path: 'sample_simple',
              label: 'Simple',
              icon: 'cloud_off',
              page: () => <SimplePage header="Test">Test</SimplePage>
            }
          ]
        },
        {
          label: 'Test2',
          routes: [
            {
              path: 'sample_tab',
              label: 'Tabs',
              icon: 'calendar_today',
              page: SampleTab
            }
          ]
        }
      ]}
    />
  )
}
export default Root
```

## 2. Create pages

Create a `pages` folder in `src` and configure this pages in the `root.tsx` file.

## 3. Edit index

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import Root from 'root'
import App from 'modules/pages/App'
import config from 'config.json'
import { blue, deepOrange } from '@material-ui/core/colors'
import createTheme from 'modules/utils/misc/CreateTheme'

const theme = createTheme(blue, deepOrange)

ReactDOM.render(
  <App
    config={Object.assign(config, {
      apiUrl: process.env.REACT_APP_API_URL,
      appIcon: require('resources/images/logo.png')
    })}
    theme={theme}
  >
    <Root />
  </App>,
  document.getElementById('root')
)
```

## 4. Create `.env`

Create a `.env` file and put the API URL, more docs soon.

```bash
REACT_APP_API_URL=http://localhost:3001
```

## 5. Edit itens in public folder

1. Replace `logo192.png` and `logo512.png` and `favicon.ico` with your logos, tip: use [favicon-generator](https://www.favicon-generator.org/) to convert PNG to ico
2. Edit `short_name`, `name` and `theme_color` in manifest.json
3. Replace meta in `index.html`

```bash
<meta name="viewport" content="width=device-width,initial-scale=1 maximum-scale=1.0,user-scalable=0,minimum-scale=1,viewport-fit=cover"/>
```

4.  Add fonts above title in `index.html`

```bash
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
```

5. Replace `title` in `index.html`
