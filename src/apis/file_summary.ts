import { request, aiRequest } from '@/utils/request'
import { fetchEventSource } from '@microsoft/fetch-event-source'



export const aiFileSummary = (formdata: string) => 
    aiRequest({
      url: '/api/langserve/file_summary/invoke',
      method: 'POST',
      data: {
        input: {
            files:formdata
        },
        config: {},
        kwargs: {}
        
      }
})
export const getFileStream = async (formData: Any, func: string, onMessage: Function) => {
    await fetchEventSource(`http://127.0.0.1:8000/api/langserve/${func}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      onmessage: (event) => {
        if (event.event === 'data') {
          onMessage(JSON.parse(event.data).output_text);
        }
      }
    })
}
// {
//     "input": {
//       "human_input": "string",
//       "lang": "string"
//     },
//     "config": {},
//     "kwargs": {}
//   }