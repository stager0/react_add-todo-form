import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: Todo[];
  getUserFunc: (userId: number) => User | undefined;
}

export const TodoList = ({ todos, getUserFunc }: Props) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} user={getUserFunc(todo.userId)} />
      ))}
    </section>
  );
};
