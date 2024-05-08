const {
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} = require('obsidian')

// One default setting, `myString`
const DEFAULT_SETTINGS = {
	myString: 'potato',
}

// Export the main MyPlugin class
module.exports = class MyPlugin extends Plugin {
	async onload() {
		await this.loadSettings()

		// Create a clickable icon in the left ribbon
		// https://docs.obsidian.md/Plugins/User+interface/Ribbon+actions
		const ribbonIconEl = this.addRibbonIcon(
			'dice',
			'Sample Plugin',
			(event) => {
				// This function is called when the user clicks the ribbon icon
				// Pop up a notice with a text string including the `myString` setting
				new Notice(`Notice! Your setting is: ${this.settings.myString}`)
			}
		)

		// Add a CSS class to the ribbon icon element
		// The style for this class is in the `styles.css` file
		ribbonIconEl.addClass('my-plugin-ribbon-class')

		// Add a status bar item to the bottom of the app (desktop only)
		// https://docs.obsidian.md/Plugins/User+interface/Status+bar
		const statusBarItemEl = this.addStatusBarItem()
		statusBarItemEl.setText('ʕ•ᴥ•ʔ')

		// Add a simple command to the Command Pallet
		// https://docs.obsidian.md/Plugins/User+interface/Commands
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open()
			},
		})

		// Add an editor command that can operate on the current editor instance
		// https://docs.obsidian.md/Plugins/User+interface/Commands#Editor+commands
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor, view) => {
				console.log(editor.getSelection())
				editor.replaceSelection('Sample Editor Command')
			},
		})

		// Add a conditional command that checks whether the current state
		// of the app allows for execution of the command
		// https://docs.obsidian.md/Plugins/User+interface/Commands#Conditional+commands
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView)
				if (markdownView) {
					// If `checking` is true, we're only checking if the command
					// can be run. If `checking` is false, then we want to actually
					// perform the operation.
					if (!checking) {
						new SampleModal(this.app).open()
					}

					// This command will only show up in the Command Palette when
					// the check returns true
					return true
				}
			},
		})

		// Add a settings tab so the user can configure the plugin
		// The settings interface is created below in `class SampleSettingTab`
		this.addSettingTab(new SampleSettingTab(this.app, this))

		// When you use this function to register DOM event listeners they'll
		// be cleaned up automatically when the plugin is disabled
		this.registerDomEvent(document, 'click', (event) => {
			console.log('click', event)
		})

		// When you use this function to register intervals they'll be cleaned up
		// automatically when the plugin is disabled
		this.registerInterval(
			window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000)
		)
	}

	// Handle any side-effects that are not automatically cleaned up
	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
	}

	async saveSettings() {
		await this.saveData(this.settings)
	}
}

// Create the sample modal interface
// https://docs.obsidian.md/Plugins/User+interface/Modals
class SampleModal extends Modal {
	constructor(app) {
		super(app)
	}

	onOpen() {
		this.contentEl.setText('Sample modal!')
	}

	onClose() {
		this.contentEl.empty()
	}
}

// Create the sample settings interface
// https://docs.obsidian.md/Plugins/User+interface/Settings
class SampleSettingTab extends PluginSettingTab {
	constructor(app, plugin) {
		super(app, plugin)
		this.plugin = plugin
	}

	display() {
		const { containerEl } = this

		containerEl.empty()

		new Setting(containerEl)
			.setName('String Setting')
			.setDesc('Your favorite string')
			.addText((text) =>
				text
					.setPlaceholder('Enter a string')
					.setValue(this.plugin.settings.myString)
					.onChange(async (value) => {
						this.plugin.settings.myString = value
						await this.plugin.saveSettings()
					})
			)
	}
}
