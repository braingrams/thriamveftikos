import OpenAIApi from 'openai';
import { IMainForm } from '../Utilis/Schemas';
import dayjs from 'dayjs';
import { ChatCompletionMessageParam } from 'openai/resources';

const openai = new OpenAIApi({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  dangerouslyAllowBrowser: true,
});

export const responseGenerate = async (data: IMainForm, setMessage: any) => {
  const completeOptions = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Write an amazing and praising sentence for a finalist who had struggled their 5 years journey through university in the department of pure and applied biology with the following biodata with emoji 
    fullname: ${data?.firstName} ${data?.lastName}
    nickname: ${data?.nickName}
    favourite lecturer: ${data?.favLecturer}
    favourite course: ${data?.favCourse}
    Departmental Crush: ${data?.crush}
    Hobbie: ${data.hobbie}
    relationship status: ${data?.relationshipStatus}
    Date of birth: ${dayjs(data?.dob).format('MMM DD')}
    Favourite Quote: ${data?.quote}`,
      },
    ],
    // model: 'text-davinci-003',
    max_tokens: 256,
    temperature: 0.7,
    stream: false,
    n: 1,
    stop: '.',
  };

  const response = await openai.chat.completions.create(completeOptions as any);

  console.log({ response });
  if (response.choices) {
    setMessage(response.choices[0].message.content);
  }
};
