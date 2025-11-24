const fs = require('fs');
const path = require('path');
const pdf = require('pdf-extraction');

const knowledgeBaseDir = path.join(__dirname, '../knowledge_base');
const outputDir = path.join(__dirname, '../src/data');
const finalOutputPath = path.join(outputDir, 'knowledge.json');

async function extractText() {
  try {
    if (!fs.existsSync(knowledgeBaseDir)) {
      console.error('Knowledge base directory not found:', knowledgeBaseDir);
      return;
    }
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(knowledgeBaseDir).filter(file => file.endsWith('.pdf'));
    const knowledge = [];

    console.log(`Found ${files.length} PDF files.`);

    for (const file of files) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(knowledgeBaseDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      
      try {
        const data = await pdf(dataBuffer);
        const text = data.text;
        // Simple cleanup
        const cleanText = text.replace(/\n\s*\n/g, '\n').trim();
        
        knowledge.push({
          filename: file,
          content: cleanText.substring(0, 50000) // Limit size
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
