const { exec } = require("child_process");
const path = require("path");

const subfolders = ["shared-backend", "students-frontend", "teachers-frontend"];

subfolders.forEach((folder) => {
  const folderPath = path.join(__dirname, folder);
  exec(`cd ${folderPath} && npm install`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error installing dependencies in ${folder}:`, error);
      return;
    }
    console.log(`Output for ${folder}:`, stdout);
    console.error(`Errors for ${folder}:`, stderr);
  });
});
