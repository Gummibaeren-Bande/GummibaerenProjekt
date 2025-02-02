const { exec } = require("child_process");
const path = require("path");
const os = require("os");

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

const platform = os.platform();
console.log("Platform: ", platform);

folders.forEach((folder) => {
  const fullPath = path.join(__dirname, folder.path);
  const commands = folder.command;

  let command;
  if (platform === "win32") {
    command = `start cmd.exe /K "cd ${fullPath} && ${commands}"`;
    console.log("Command: ", command);
  } else if (platform === "darwin") {
    command = `osascript -e 'tell application "Terminal" to do script "cd ${fullPath} && ${commands}"'`;
  } else {
    command = `gnome-terminal -- bash -c "cd ${fullPath} && ${commands}; exec bash"`;
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Error executing command: ${command} in ${folder.path}`,
        error
      );
      return;
    }
  });
});
