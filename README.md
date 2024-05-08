# Obsidian Simple Sample Plugin

This is a simple sample plugin for [Obsidian](https://obsidian.md). It implements the same examples as [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin) but uses plain JavaScript and needs no build step. This works fine for small tasks that meet the following criteria:

- no TypeScript
- no need to organize code into multiple JavaScript files
- no external libraries beyond `obsidian`

An example of a published plugin using roughly this template is the [Draft Indicator](https://github.com/beardicus/obsidian-draft-indicator-plugin) plugin.

## Getting Started

To get started creating a new Obsidian plugin from plain JavaScript:

- Make a copy of this repo using the **Use this template** button (log in to GitHub if you don't see it). This will create a new repo in your GitHub account.
- Clone the new repo to your local development machine. You should clone it into the `.obsidian/plugins/` folder of a vault dedicated to plugin development and testing.
- Make sure you have Node.js installed.
- Using a command line terminal, navigate to the plugin repo then run `npm i` to install the JavaScript dependencies.
- Open the Obsidian vault and install the [**Hot Reload**](https://github.com/pjeby/hot-reload) plugin. This plugin will detect code changes in your plugin during development and automatically reload it.
- Make changes to the `main.js`, `manifest.json`, and `styles.css` files as needed.
- Enable your new plugin in the Obsidian settings window.
- Test and iterate.

## Releasing New Versions

This repo contains a GitHub Action at `.github/workflows/release.yml` that will create a draft release every time a new Git tag is pushed to GitHub. See the [official Obsidian plugin docs](https://docs.obsidian.md/Plugins/Releasing/Release+your+plugin+with+GitHub+Actions) for more information on how to release new versions of your plugin.

Note that the workflow file shown in the official docs has extra steps for installing Node.js and building the plugin. These are unnecessary in this case.

## Submitting Your Plugin

You may follow [the official _Submit your Plugin_ docs](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin) to get your plugin added to the plugin directory.

Note that there are some automated PR checks that may fail because the Obsidian developers are expecting the `main.js` file to be built from TypeScript source files, not included directly in the Git repo. This doesn't seem to actually be a problem after human review, so don't worry too much about the `Please remove the main.js file from the repo and add it to your .gitignore.` error you'll probably see.

## More Info

See the [Obsidian Developer Docs](https://docs.obsidian.md) for more information on Obsidian plugin development.
