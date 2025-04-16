// import mongoose from 'mongoose';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { config } from '../../config.js';
// import { MemberData } from '../models/member_Model.js';

// // Fix __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ✅ Go from /src/scripts to project root
// const projectRoot = path.resolve(__dirname, '../../');

// // ✅ Path to the folder where member pics are stored
// const memberPicsDir = path.join(projectRoot, 'uploads', 'memberpics');

// mongoose
//   .connect(config.connectionString)
//   .then(async () => {
//     console.log("✅ Connected with MongoDB");

//     // Fetch all member IDs
//     const members = await MemberData.find({}, 'memberId');
//     const memberIdsInDb = members.map((m) => m.memberId);

//     const membersWithPic = [];
//     const membersMissingPic = [];

//     for (const memberId of memberIdsInDb) {
//       const fileName = `${memberId}.JPG`;
//       const filePath = path.join(memberPicsDir, fileName);

//       if (fs.existsSync(filePath)) {
//         membersWithPic.push(memberId);
//       } else {
//         membersMissingPic.push(memberId);
//       }
//     }

//     // Get all JPG files from the folder
//     const filesInFolder = fs.readdirSync(memberPicsDir).filter(f => f.toLowerCase().endsWith('.jpg'));
//     const invalidPics = [];

//     for (const file of filesInFolder) {
//       const baseName = path.parse(file).name;
//       if (!memberIdsInDb.includes(baseName)) {
//         invalidPics.push(file);
//       }
//     }

//     // OUTPUT
//     console.log('\n📸 Members WITH pictures:', membersWithPic.length);
//     console.log(membersWithPic);

//     console.log('\n❌ Members MISSING pictures:', membersMissingPic.length);
//     console.log(membersMissingPic);

//     console.log('\n🧟 Orphan Pictures (no matching member in DB):', invalidPics.length);
//     console.log(invalidPics);

//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.error('❌ MongoDB connection error:', err);
//   });
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../../config.js';
import { MemberData } from '../models/member_Model.js';

// Fix __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Go from /src/scripts to project root
const projectRoot = path.resolve(__dirname, '../../');
const memberPicsDir = path.join(projectRoot, 'uploads', 'memberpics');

mongoose
  .connect(config.connectionString)
  .then(async () => {
    console.log("✅ Connected with MongoDB");

    // Fetch all members (only necessary fields)
    const members = await MemberData.find({}, 'memberId profilePicture');

    let updatedCount = 0;

    for (const member of members) {
      const fileName = `${member.memberId}.JPG`;
      const filePath = path.join(memberPicsDir, fileName);

      if (fs.existsSync(filePath)) {
        const expectedPath = `/uploads/memberpics/${fileName}`;

        // Only update if not already set (optional)
        if (member.profilePicture !== expectedPath) {
          member.profilePicture = expectedPath;
          await member.save();
          updatedCount++;
          console.log(`✅ Updated: ${member.memberId}`);
        }
      }
    }

    console.log(`\n🎉 Done. Total members updated with profilePicture path: ${updatedCount}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });