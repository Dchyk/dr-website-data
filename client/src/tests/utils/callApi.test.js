import { callApi } from '../../utils/callApi';

test('should call an API and return the data', async () => {
  // Placeholder json API url used below
  // 
  // Should return:
  // {
  //   "userId": 1,
  //   "id": 1,
  //   "title": "delectus aut autem",
  //   "completed": false
  // }
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const resp = await callApi(url);

  expect(resp.userId).toBe(1);
  expect(resp.id).toBe(1);
  expect(resp.title).toBe("delectus aut autem");
  expect(resp.completed).toBe(false);
})