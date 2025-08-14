const express = require('express');
const multer = require('multer');
const supabase = require('../config/supabase.config');
const File = require('../models/file.models');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/home', (req, res) => {
    res.render('home')
})

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        const fileName = `${Date.now()}-${file.originalname}`;

        // Upload to Supabase
        const { data, error } = await supabase.storage
            .from('uploads') // Make sure this bucket exists in your Supabase
            .upload(fileName, file.buffer, {
                contentType: file.mimetype
            });

        if (error) {
            return res.status(500).json({ error: 'Failed to upload file to Supabase' });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('uploads')
            .getPublicUrl(fileName);

        // Save file info to MongoDB (optional)
        const fileRecord = new File({
            filename: fileName,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            supabaseUrl: urlData.publicUrl
        });

        await fileRecord.save();

        res.json({
            message: 'File uploaded successfully',
            file: fileRecord,
            url: urlData.publicUrl
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;