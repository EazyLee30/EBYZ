import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdf = require('pdf-parse');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knowledgeBaseDir = path.join(__dirname, '../knowledge_base');
const finalOutputPath = path.join(__dirname, '../knowledge.json');

async function extractText() {
  try {
    if (!fs.existsSync(knowledgeBaseDir)) {
      console.error('Knowledge base directory not found:', knowledgeBaseDir);
      return;
    }

    const files = fs.readdirSync(knowledgeBaseDir).filter(file => file.endsWith('.pdf'));
    const knowledge = [];

    console.log(`Found ${files.length} PDF files.`);

    for (const file of files) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(knowledgeBaseDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      
      try {
          // Try default export first
          let text = '';
          
          // console.log('PDF Export:', pdf);

          if (typeof pdf === 'function') {
              const data = await pdf(dataBuffer);
              text = data.text;
          } else if (pdf.default && typeof pdf.default === 'function') {
              const data = await pdf.default(dataBuffer);
              text = data.text;
          } else {
             // Fallback or specific handling for this environment
             console.log('PDF export is weird, trying to find a function...');
             // In some environments, require('pdf-parse') returns the function directly
             // In others (ESM), it might be wrapped. 
             // Let's just skip this file if we can't parse or write a placeholder
             // text = "Error parsing PDF: Library compatibility issue.";
             
             // Hack: try to import via createRequire if import failed to give us the function
             const { createRequire } = await import('module');
             const require = createRequire(import.meta.url);
             const pdfCJS = require('pdf-parse');
             if (typeof pdfCJS === 'function') {
                 const data = await pdfCJS(dataBuffer);
                 text = data.text;
             } else {
                 console.error('Even createRequire returned an object:', Object.keys(pdfCJS));
                 // If it has PDFParse, maybe we can use it?
                 // The library might be structured differently.
                 continue;
             }
          }

        const cleanText = text.replace(/\n\s*\n/g, '\n').trim();
        
        knowledge.push({
          filename: file,
          content: cleanText.substring(0, 50000)
        });
        console.log(`Extracted ${cleanText.length} characters from ${file}`);
      } catch (err) {
        console.error(`Error parsing ${file}:`, err);
      }
    }

    const outputData = JSON.stringify(knowledge, null, 2);
    fs.writeFileSync(finalOutputPath, outputData);
    
    console.log(`Knowledge base generated at ${finalOutputPath}`);
    
  } catch (error) {
    console.error('Extraction failed:', error);
  }
}

extractText();

