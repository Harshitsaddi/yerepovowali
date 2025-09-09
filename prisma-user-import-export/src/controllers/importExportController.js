const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const csv = require('csvtojson');
const fs = require('fs');
const { Parser } = require('json2csv');
const bcrypt = require('bcryptjs');

exports.importUsersCSV = async (req, res) => {
  try {
    // admin-only
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded (field name: file)' });

    const path = req.file.path;
    const rows = await csv().fromFile(path); // array of objects

    const toCreate = [];
    for (const r of rows) {
      if (!r.email || !r.password) continue; // skip invalid row
      const hashed = await bcrypt.hash(r.password, 10);
      toCreate.push({
        email: r.email.trim(),
        name: r.name?.trim() || null,
        password: hashed,
        role: r.role?.trim() || 'user'
      });
    }

    // Use createMany for speed and skip duplicates
    // Note: skipDuplicates may not be supported the same in all DB providers -> fallback below
    try {
      const result = await prisma.user.createMany({ data: toCreate, skipDuplicates: true });
      fs.unlinkSync(path); // remove temp file
      return res.json({ created: result.count });
    } catch (e) {
      // fallback: upsert loop (safer but slower)
      for (const u of toCreate) {
        await prisma.user.upsert({
          where: { email: u.email },
          update: {},
          create: u
        });
      }
      fs.unlinkSync(path);
      return res.json({ created: toCreate.length });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

exports.exportUsersCSV = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });

    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true } // do not include password
    });

    const fields = ['id', 'email', 'name', 'role', 'createdAt'];
    const parser = new Parser({ fields });
    const csvData = parser.parse(users);

    res.header('Content-Type', 'text/csv');
    res.attachment('users.csv');
    return res.send(csvData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
