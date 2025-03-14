import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiFileSearchModule } from './utilities/openai-file-search.module';
import { OpenAiProvider } from './utilities/openai-provider.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // ✅ Ensures ConfigService is available everywhere
    }),
    OpenAiFileSearchModule, // ✅ Import the OpenAI File Search module
  ],
  controllers: [AppController],
  providers: [AppService, OpenAiProvider], // ✅ Provide the OpenAI provider
})
export class AppModule {}
