import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import OpenAI from 'openai';
import * as path from 'path';

@Injectable()
export class OpenAiFileSearchService implements OnModuleInit {
  constructor(private readonly openai: OpenAI) {}
  async onModuleInit() {
    let filePath = path.join(process.cwd(), 'asset', 'CheangMing.pdf');
    const fileId = await this.createFile(filePath);
    const vectorStore = await this.openai.vectorStores.create({
      name: 'resume_knowledge_base',
    });

    await this.openai.vectorStores.files.create(vectorStore.id, {
      file_id: fileId,
    });
  }

  async createFile(filePath: string) {
    let result: OpenAI.Files.FileObject & { _request_id?: string | null };
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // Download the file content from the URL
      const res = await fetch(filePath);
      const buffer = await res.arrayBuffer();
      const urlParts = filePath.split('/');
      const fileName = urlParts[urlParts.length - 1];
      const file = new File([buffer], fileName);
      result = await this.openai.files.create({
        file: file,
        purpose: 'assistants',
      });
    } else {
      // Handle local file path
      const fileContent = fs.createReadStream(filePath);
      result = await this.openai.files.create({
        file: fileContent,
        purpose: 'assistants',
      });
    }
    console.log('File created:', result.id);
    return result.id;
  }
}
