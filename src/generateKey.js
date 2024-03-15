import fs from 'fs';
import { exec } from 'child_process';

const generateRandomString = (length, customKey = null) => {
  let randomString = '';

  // If customKey is provided, use it; otherwise generate a random key
  if (customKey) {
    randomString = customKey;
  } else {
    for (let i = 0; i < length; i++) {
      const randomCharCode = Math.floor(Math.random() * (122 - 33 + 1)) + 33;
      randomString += String.fromCharCode(randomCharCode);
    }
  }

  console.log('Generated Key:', randomString);

  fs.writeFileSync('KsetTadijaCTF-main/generatedKey.txt', randomString); // Write the generated key to a file

  // Execute exiftool command
  const hexaKey = Buffer.from(randomString, 'utf8').toString('hex');
  const command = `exiftool -overwrite_original -SEMInfo="Key{${hexaKey}}" KsetTadijaCTF-main/kapa.jpeg`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing exiftool command: ${error}`);
      return;
    }
    console.log(`Exiftool command output: ${stdout}`);
    console.error(`Exiftool command errors: ${stderr}`);
  });

  return randomString;
};

// Check if input arguments are provided
const [, , customKey] = process.argv;

// Generate key with custom input or random if not provided
const generatedKey = generateRandomString(8, customKey);
console.log('Generated key:', generatedKey);
