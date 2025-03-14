import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAiFileSearchService } from './openai-file-search.service';
import { OpenAiModule } from './openai-provider.module';

@Module({
  imports: [ConfigModule, OpenAiModule],
  providers: [OpenAiFileSearchService],
  exports: [OpenAiFileSearchService],
})
export class OpenAiFileSearchModule {}
