# Theia BB Start Util Plugin
This repository aiming to create a custom onStart plugin to Theia Web Based IDE. This extension used for Bulut Bilisimciler Hands-on Lab Session IDE's 

### Versions  
- 1.0.3: 
- 1.0.0:  
  - Branding Icon changed.  
  - On every page load terminal window auto open added.  

## Getting started

Please install all necessary [prerequisites](https://github.com/eclipse-theia/theia/blob/master/doc/Developing.md#prerequisites).

## Running the browser example

    yarn build:browser
    yarn start:browser

*or:*

    yarn build:browser
    cd browser-app
    yarn start

*or:* launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Developing with the browser example

Start watching all packages, including `browser-app`, of your application with

    yarn watch

*or* watch only specific packages with

    cd bb-start-utils
    yarn watch

and the browser example.

    cd browser-app
    yarn watch
