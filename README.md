# ACES CARDS 


----

## Online websites 

#### predrod
- status : [![Netlify Status](https://api.netlify.com/api/v1/badges/c2012768-10f5-49a3-9ad1-2c988715eac4/deploy-status)](https://app.netlify.com/sites/playwithtransitions-debug-preprod/deploys)
- online website : [https://playwithtransitions-debug-preprod.netlify.com](https://playwithtransitions-debug-preprod.netlify.com)
- deployed branch `j_integration_01`
- [Netlify setup summary](https://app.netlify.com/sites/playwithtransitions-debug-preprod/overview)

---

## Goal

Display AFD's quotes as cards (aka "ACES" cards) 

- mobile-first ;
- agnostically load list of Google Sheet data to the Vue's store ;
- (option) add list of sheets as correspondance tables ;
- (option) add list of sheets as data types references ;
- by default the sheet-loads includes : internationalizatin with i18n, cookie-parser...

------

## Environment variables

You can define the locations of the gsheets you want to load in the environment variables (`.env` file). A file called `example.env` can be used as a template.

### Env vars as lists

In the `.env`file some variables will be converted into arrays or/and objects at launch in the `nuxt.config` file. 
Usually the logic is the followinng: 

```bash
### .env file for instance
NUXT_ENV_LOCALES=Français:fr:fr-FR,English:en:en-US

# will be converted in the nuxt.config file into : 
locales = [
  { name: 'Français', code: 'fr', iso: 'fr-FR', file: 'fr-FR.json' },
  { name: 'English', code: 'en', iso: 'en-US', file: 'en-US.json' },
]
```

### Configure GSheets loading

With **sheet-loads** you can load data several GSheets for several uses : as pure data, as 

Here an example based on this spreadsheet : 
https://docs.google.com/spreadsheets/d/1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA/edit#gid=0

```bash
### DATA GSHEETS : main datasets
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_DATAS=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>,....
NUXT_GSHEET_IDS_DATAS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:1:contents

### DATA GSHEETS CORRESPONDANCE TABLES
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_CORRESP_DICTS=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>:COL_TITLE_FOR_KEY,....
NUXT_GSHEET_IDS_CORRESP_DICTS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:2:correspondances:categories-code

### DATA GSHEETS TYPES
# LIST FORMAT (separator == ',') : 
# NUXT_GSHEET_IDS_DATA_TYPES=<GSHEET_ID>:<SHEET_NUMBER>:<DS_ID>::<COL_TITLE_FOR_KEY>:<DATATYPE>,....
NUXT_GSHEET_IDS_DATA_TYPES=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:3:my-types:col-title:data-type:is-list:list-separator:lang:key-value-separator
```

**Note** : you can specify several spreadsheets for every env variable, just separate each definition by a comma (`,`)

----------

## Stack 

- Nuxt
- Vuetify
- vue2-interact
- I18n
- Axios
- Material design icons
- Fontawesome icons
- Cookie-parser
- js-cookie
- dotenv

----------

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).


------
## Netlify setup

=> see the general setup summary [here](https://app.netlify.com/sites/playwithtransitions-debug-preprod/settings/general)


##### in [`Continuous Deployment`](https://app.netlify.com/sites/playwithtransitions-debug-preprod/settings/deploys#continuous-deployment)

```env
# Build settings

Repository = github.com/we-do-data/IFS_AFD-ACES-dev
Base directory = Not set
Build command = npm run build
Publish directory = dist
Deploy log visibility = Logs are public

# Deploy contexts

Production branch = j_integration_01
Deploy previews = Automatically build deploy previews for all pull requests
Branch deploys = Deploy only the production branch
```

##### in [`Environment`](https://app.netlify.com/sites/playwithtransitions-debug-preprod/settings/deploys#environment)

```env
NUXT_ENV_APP_TITLE=Play With Transitions
NUXT_ENV_HOST=localhost
NUXT_ENV_LOCALES=Français:fr:fr-FR,English:en:en-US
NUXT_ENV_LOCALE_DEFAULT=fr
NUXT_ENV_PORT_DEV=50060
NUXT_ENV_PORT_PREPROD=50061
NUXT_ENV_PORT_PROD=50062
NUXT_ENV_RUN_MODE=dev
NUXT_GSHEET_IDS_CORRESP_DICTS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:2:correspondances:categories-code
NUXT_GSHEET_IDS_DATAS=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:1:aces-contents
NUXT_GSHEET_IDS_DATA_TYPES=1FcV5ZQAKyx5cZWW7EABTioaRYrs4Jw9ncHjs2ZeVWFA:3:my-types:col-title:data-type:is-list:list-separator:lang:key-value-separator
VUETIFY_accent=#572a99
VUETIFY_error=#FF5252
VUETIFY_info=#cbc8d8
VUETIFY_primary=#2e2265
VUETIFY_secondary=#de4a5bVUETIFY_success#00BCD4
VUETIFY_warning=#FFC107
```

##### in [`Domains`](https://app.netlify.com/sites/playwithtransitions-debug-preprod/settings/domain)

```
playwithtransitions-debug-preprod.netlify.com
(Default subdomain)
```

----- 
## Credits

### client 

- IFS / AFD

### Realisation

- [WeDoData](https://www.wedodata.fr)

### Team 

- Project lead : Brice Terdjman
- Design : Clément Thorez
- Code / integration : [Julien Paris](https://github.com/JulienParis)
