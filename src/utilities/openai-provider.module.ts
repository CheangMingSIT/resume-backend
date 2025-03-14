import { Module } from '@nestjs/common';
import { OpenAiProvider } from './openai-provider.service';

@Module({
  providers: [OpenAiProvider], // Register OpenAI as a provider
  exports: [OpenAiProvider], // Export it so other modules can use it
})
export class OpenAiModule {}
