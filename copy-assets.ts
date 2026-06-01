import fs from "fs";
import path from "path";

const directoriesToCopy = ["f", "j", "hsr", "i", "w", "beanlore"];
const publicDir = path.join(process.cwd(), "public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const dir of directoriesToCopy) {
  const srcDir = path.join(process.cwd(), dir);
  const destDir = path.join(publicDir, dir);

  if (fs.existsSync(srcDir)) {
    console.log(`Copying ${srcDir} to ${destDir}...`);
    fs.mkdirSync(destDir, { recursive: true });
    
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      
      const stat = fs.statSync(srcFile);
      if (stat.isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    }
    console.log(`Completed copying ${dir}.`);
  } else {
    console.log(`Source directory ${srcDir} does not exist, skipping.`);
  }
}

// Make sure both "f" and "food" directories exist and have files so no paths break
const foodDest = path.join(publicDir, "food");
const fSrc = path.join(process.cwd(), "f");
if (fs.existsSync(fSrc)) {
  fs.mkdirSync(foodDest, { recursive: true });
  const files = fs.readdirSync(fSrc);
  for (const file of files) {
    fs.copyFileSync(path.join(fSrc, file), path.join(foodDest, file));
  }
  console.log("Sync'd /public/f with /public/food content.");
}
