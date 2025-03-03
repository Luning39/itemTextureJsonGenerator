const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get the folder path and namespace value from user input
rl.question('Please enter the relative path: ', (inputPath) => {
  rl.question('Please enter the prefix (press Enter to skip): ', (prefix) => {
    try {
      // If namespace is empty (user pressed Enter), set it to an empty string
      if (!prefix) {
        prefix = '';
      }

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
        const key = prefix ? `${prefix}${fileName}` : fileName; // If prefix is empty, use fileName directly
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