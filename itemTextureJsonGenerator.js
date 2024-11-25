const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the folder path and namespace value from user input
rl.question('Please enter the relative path: ', (inputPath) => {
  rl.question('Please enter the namespace: ', (nameSpace) => {
    try {
      // Get the absolute path of the folder
      const absolutePath = path.resolve(__dirname, inputPath);
      const files = fs.readdirSync(absolutePath); // Traverse the folder to get file names
      const jsonData = {
        "resource_pack_name": "vanilla",
        "texture_name": "atlas.items",
        "texture_data": {}
      };

      // Loop through the files in the folder
      files.forEach(file => {
        const fileName = path.parse(file).name; // Get the file name (without extension)
        const relativePath = path.relative(__dirname, absolutePath); // Get the relative path
        const key = `${nameSpace}:${fileName}`;
        jsonData.texture_data[key] = {
          "textures": `textures/${relativePath}/${fileName}`
        };
      });

      // Format the result as JSON and save it as item_texture.json
      const outputPath = path.join(__dirname, 'item_texture.json');
      fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
      console.log(`File generated: ${outputPath}`);
    } catch (err) {
      console.error('An error occurred:', err.message);
    }

    rl.close();
  });
});
