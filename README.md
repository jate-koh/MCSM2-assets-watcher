# 🧰 MCSM2 Assets Watcher
---
## 🧾 Description
This is a simple tool to watch for changes in the assets in the specified directory when using [Resorep](https://www.undertow.club/downloads/resorep.1254/) to extract the assets from the game. Specifically, this tool is currently designed to watch for changes in the assets in the game Minecraft: Story Mode Season 2.

Resorep is a tool to replace the assets in the game with custom ones or to extract them from the game. When extracting the assets, it pumps out the assets that it's hard to track what's been extracted and what's characters/blocks/items/etc. does it belong to?

This tool will watch for changes while logging the changes in the console. In addition to just logging the changes, it will also tell you what that texture belongs to if it has been found before.

![image](https://github.com/jate-koh/MCSM2-assets-watcher/assets/68505570/e2ccabff-1726-4e57-ab49-44e7ede2a410)

This list will be updated as the tool is updated. If you want to view the list, you can view [here](/docs/ep1-asset-listing.md). If you want to contribute to the list, you can view the [contribution](#contribution) section below.

## 👨‍🔧 Contribution

If you wish to contribute or use this tool, you may clone or fork the repository and make changes to the code as you wish. Please follows the [setup](#setup) instructions below.

You can also just contribute to the asset listing, you may create a pull request with the changes to files within [documents folders](/docs) file. Noted that for your change to be accepted, it must be verified and tested to see if the texture belongs to that certain character/block/item/etc.

Every contribution is appreciated. Thank you for your time ❤️

## 🛠️ Setup

### Prerequisites

1. Since Resorep is a Java application, Java 8 or higher must be installed on your computer. If you don't have it installed, you can download it [from Java's official website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
2. [Resorep](https://www.undertow.club/downloads/resorep.1254/) must be installed and ready to use on your computer.
3. A copy of Minecraft: Story Mode Season 2 installed.
4. Resorep must be configured properly. It should be able to extract the assets from the game. You can view this [video](https://youtu.be/h3VH2W-j8yI). It will teach you how to use Resorep to extract the assets from Minecraft: Story Mode Season 2.

### Installation
1. Clone the repository into the directory where all your extracted assets are located (Where all files beginning with `DXGI*` are located). Default directory that Resorep extracts the assets to is `original`.
2. Create an environment file `.env` at the root of the project. You may copy the `.env.example` file and rename it to `.env`.
   1. . The content of the `.env` file should look like this:
```bash
#: Path to the directory to watch for new files
WATCH_DIR=

#: List of path to the directory to watch for new files
# This will override WATCH_DIR if set.
WATCH_DIR_LIST=[]

#: Extensions of the files to watch for
EXTENSIONS=
```

3. Specify what directory to watch for changes in the `.env` file. The `WATCH_DIR` variable should be set to the directory where the assets are located. For example, if the assets are located in the `original` directory, then the `WATCH_DIR` should be set to `original`.
   1. Additionally, if you want to watch for changes in multiple directories, you can specify the directories in the `WATCH_DIR_LIST` variable. The directories should be separated by a comma. For example, `WATCH_DIR_LIST=original,original2,original3`.
   2. The `EXTENSIONS` variable should be set to the extensions of the files to watch for. For example, if you want to watch for changes in `.png` and `.jpg` files, then the `EXTENSIONS` should be set to `png, jpg`.

4. Run the following command to install the dependencies:
```bash
npm / yarn / pnpm install # Whatever package manager you're using
```

5. Run the following command to start the watcher:
```bash
npm / yarn / pnpm dev # Whatever package manager you're using
```

---

## License
This project is licensed under MIT License - see the [LICENSE](LICENSE) file for details.
