const { exec } = require("child_process");
const path = require("path");
// Import the 'os' module to get information about the operating system
const os = require("os");

// Define an array of folder objects, each containing a path and a command to execute
const folders = [
  { path: "shared-backend", command: "npm run start" },
  {
    path: "students-frontend",
    command: "npm run build-only && npm run preview",
  },
  {
    path: "teachers-frontend",
    command: "npm run build-only && npm run preview",
  },
];

// Get the platform of the operating system
const platform = os.platform();
console.log("Platform: ", platform);

// Iterate over each folder object
folders.forEach((folder) => {
  // Construct the full path to the folder
  const fullPath = path.join(__dirname, folder.path);
  // Get the command to execute for the folder
  const commands = folder.command;

  let command;
  // Check for operating system and construct the appropriate command
  if (platform === "win32") {
    // Construct the command to open a new cmd.exe window and execute the commands
    command = `start cmd.exe /K "cd ${fullPath} && ${commands}"`;
    console.log("Command: ", command);
  } else if (platform === "darwin") {
    // Construct the command to open a new Terminal window on macOS and execute the commands
    command = `osascript -e 'tell application "Terminal" to do script "cd ${fullPath} && ${commands}"'`;
  } else {
    // Construct the command to open a new terminal window on Linux and execute the commands
    command = `gnome-terminal -- bash -c "cd ${fullPath} && ${commands}; exec bash"`;
  }

  // Execute the constructed command
  exec(command, (error, stdout, stderr) => {
    // If there is an error during the execution, log the error and return
    if (error) {
      console.error(
        `Error executing command: ${command} in ${folder.path}`,
        error
      );
      return;
    }
  });
});
