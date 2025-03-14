import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

export const OpenAiProvider = {
  provide: OpenAI,
  useFactory: (configService: ConfigService) => {
    return new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  },
  inject: [ConfigService],
};
