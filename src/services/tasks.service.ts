import getRandomNum from '../utils/getRandomNum';
import { ITask } from '../utils/types';

export const tasksService = {
  get: () =>
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        //Костыль необходимо потом удалить
        return json.reduce(
          (acc: ITask[], task: ITask) =>
            (acc = [
              ...acc,
              {
                ...task,
                createdAt: Date.now(),
                problems: getRandomNum(50, 67),
                completedProblems: getRandomNum(0, 45),
              },
            ]),
          []
        );
      }),
};
