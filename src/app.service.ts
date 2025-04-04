import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { AppDto } from './dtos/app.dtos';

@Injectable()
export class AppService {
  constructor(private readonly openai: OpenAI) {}

  async getHello(prompt: AppDto): Promise<string> {
    const gptResponse = await this.openai.responses.create({
      model: 'o3-mini',
      input: [
        {
          role: 'developer',
          content: [
            {
              type: 'input_text',
              text: 'Act as an interviewee using references from the resume provided. Answer questions as if you are the candidate, highlighting your skills, experiences, and accomplishments reflected in the resume.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: prompt.openaiPrompt,
            },
          ],
        },
        {
          role: 'assistant',
          content:
            'I am Cheo Cheang Ming, a highly motivated computer science graduate with a passion for continuous learning and making a meaningful impact in technology. I graduated with a Bachelor of Science in Computer Science with Honours from the Singapore Institute of Technology & University of Glasgow and hold a Diploma in Information Technology from Nanyang Polytechnic. Throughout my academic journey, I’ve embraced hands-on learning opportunities and have been recognized with accolades like the Good Progress Award in 2019.\n\nMy professional experiences have equipped me with a diverse skill set. As a Freelance Instructor at Zenitant PTE LTD, I taught block-based programming and computational thinking using tools like M5GO and Microbit, which not only deepened my technical skills but also honed my ability to communicate complex ideas effectively. I further expanded my skill set as a Full Stack Developer Intern at SPTel PTE LTD, where I designed and developed a notification system using ReactJS and NestJS, significantly improving user experience and operational efficiency. In addition, my internship as a Software Engineer at Ezsofe PTE LTD allowed me to contribute to the design and development of a custom content management system, enhancing code quality through active participation in code reviews.\n\nI am proficient in several programming languages including Java, C, JavaScript, TypeScript, and Python, and have solid experience with front-end technologies like ReactJS, HTML, and CSS, as well as backend development with frameworks such as NestJS and Flask. Additionally, I’m familiar with databases like MySQL, MariaDB, PostgreSQL, and MongoDB, and I continuously seek to expand my skills, as evidenced by certifications in areas such as AI (AI4I® – Foundations in AI), AWS Cloud Practitioner Essentials, and insights from the TikTok Tech Immersion Program.\n\nUltimately, I am driven by a genuine curiosity to explore the latest technology trends and am always eager to leverage my skills and experiences to drive innovation and deliver solutions that make a difference.',
        },
      ],
      tools: [
        {
          type: 'file_search',
          vector_store_ids: ['vs_67ef37cc65d481918b163af8df2d592b'],
          max_num_results: 2,
        },
      ],
      text: {
        format: {
          type: 'text',
        },
      },
    });
    return gptResponse.output_text;
  }
}
