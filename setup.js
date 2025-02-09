const { exec } = require("child_process");
const path = require("path");

// Define an array of subfolder names
const subfolders = ["shared-backend", "students-frontend", "teachers-frontend"];

// Iterate over each subfolder
subfolders.forEach((folder) => {
  // Construct the full path to the subfolder
  const folderPath = path.join(__dirname, folder);
  // Execute the 'npm install' command in the subfolder to install dependencies
  exec(`cd ${folderPath} && npm install`, (error, stdout, stderr) => {
    // If there is an error during the execution, log the error and return
    if (error) {
      console.error(`Error installing dependencies in ${folder}:`, error);
      return;
    }
    // Log the standard output from the command
    console.log(`Output for ${folder}:`, stdout);
    // Log any errors from the command
    console.error(`Errors for ${folder}:`, stderr);
  });
});
