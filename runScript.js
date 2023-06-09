// // const util = require("util");
// // const exec = util.promisify(require("child_process").exec);
// // async function lsWithGrep() {
// //   //   try {
// //   const { stdout, stderr } = await exec("npm run start-js");
// //   console.log("ruszyło", stdout, stderr);

// //   //     console.log("stdout:", stdout);
// //   //     console.log("stderr:", stderr);
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //   }
// // }
// // lsWithGrep();

// const { exec } = require("child_process");

// // exec("npm run start-js", (error, stdout, stderr) => {
// exec("npm run build", async (error, stdout, stderr) => {
//   console.log("ruszyło", error, stdout, stderr);
//   try {
//     if (!error) {
//       console.log("wszystko ok");
//       exec("npm run start-js", (error, stdout, stderr) => {
//         console.log("w trakcie start");
//       });
//     }
//   } catch (error) {
//     console.log("coś poszło nie tak", error);
//   }

//   //   //   if (stderr) {
//   //   //     console.log(`stderr: ${stderr}`);
//   //   //     return;
//   //   //   }
//   //   //   console.log(`stdout: ${stdout}`);
// });
