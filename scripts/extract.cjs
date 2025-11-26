const fs = require('fs');
const path = require('path');
const pdf = require('pdf-extraction');

const knowledgeBaseDir = path.join(__dirname, '../knowledge_base');
const outputDir = path.join(__dirname, '../src/data');
const finalOutputPath = path.join(outputDir, 'knowledge.json');

// Helper to parse filename metadata
function parseFilename(filename) {
  // Example: "4.义务教育信息科技课程教学指南+过程与控制+六年级全一册.pdf"
  const parts = filename.replace('.pdf', '').split('+');
  let grade = '未知年级';
  let subject = '未知科目';

  parts.forEach(part => {
    if (part.includes('六年级')) grade = '六年级';
    if (part.includes('七年级')) grade = '七年级';
    if (part.includes('八年级')) grade = '八年级';
    
    if (part.includes('过程与控制')) subject = '过程与控制';
    if (part.includes('互联网')) subject = '互联网应用与创新';
    if (part.includes('物联网')) subject = '物联网实践与探索';
  });

  return { grade, subject };
}

// Helper to chunk text by "Unit" or "Module" structure
function chunkTextByStructure(text, baseMetadata) {
  const chunks = [];
  
  // 1. Try to split by "单元" (Unit) - e.g. "第一单元", "模块一"
  // Regex to find Unit headers like "第一单元", "模块一", "单元一"
  // Capturing group 1 is the title
  const unitRegex = /(第[一二三四五六七八九十]+单元|模块[一二三四五六七八九十]+)\s*[:：]?\s*([^\n]+)?/g;
  
  let match;
  let lastIndex = 0;
  let lastUnitTitle = '前言/概述';

  while ((match = unitRegex.exec(text)) !== null) {
    const startIndex = match.index;
    const unitName = match[0]; // "第一单元"
    
    // Save previous chunk
    if (startIndex > lastIndex) {
      const content = text.substring(lastIndex, startIndex).trim();
      if (content.length > 100) { // Filter out too small chunks
        chunks.push({
          id: `${baseMetadata.grade}_${chunks.length}`,
          content: content,
          metadata: {
            ...baseMetadata,
            unit: lastUnitTitle,
            type: 'section',
            length: content.length
          }
        });
      }
    }

    lastIndex = startIndex;
    lastUnitTitle = unitName.trim();
  }

  // Add the final chunk
  if (lastIndex < text.length) {
    const content = text.substring(lastIndex).trim();
    if (content.length > 100) {
        chunks.push({
            id: `${baseMetadata.grade}_${chunks.length}`,
            content: content,
            metadata: {
              ...baseMetadata,
              unit: lastUnitTitle,
              type: 'section',
              length: content.length
            }
        });
    }
  }

  // If no units found, fallback to one big chunk but labelled
  if (chunks.length === 0 && text.length > 0) {
      chunks.push({
          id: `${baseMetadata.grade}_full`,
          content: text.substring(0, 100000), // Safety cap
          metadata: {
              ...baseMetadata,
              unit: '全书内容',
              type: 'full'
          }
      });
  }

  return chunks;
}

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
    let allChunks = [];

    console.log(`Found ${files.length} PDF files.`);

    for (const file of files) {
      console.log(`Processing ${file}...`);
      const filePath = path.join(knowledgeBaseDir, file);
      const dataBuffer = fs.readFileSync(filePath);
      
      try {
        const data = await pdf(dataBuffer);
        const text = data.text;
        const cleanText = text.replace(/\n\s*\n/g, '\n').trim(); // Normalize newlines
        
        const fileMeta = parseFilename(file);
        const fileChunks = chunkTextByStructure(cleanText, {
          filename: file,
            ...fileMeta
        });

        console.log(`-> Extracted ${fileChunks.length} logical chunks from ${fileMeta.grade}`);
        allChunks = [...allChunks, ...fileChunks];

      } catch (err) {
        console.error(`Error parsing ${file}:`, err);
      }
    }

    const outputData = JSON.stringify(allChunks, null, 2);
    fs.writeFileSync(finalOutputPath, outputData);
    
    console.log(`Knowledge Graph generated at ${finalOutputPath}. Total chunks: ${allChunks.length}`);
    
  } catch (error) {
    console.error('Extraction failed:', error);
  }
}

extractText();