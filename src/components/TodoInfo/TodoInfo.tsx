interface Props {
  todo: Todo;
  user: User | undefined;
}

export const TodoInfo = ({ todo, user }: Props) => {
  return (
    <article data-id={todo.id} className="TodoInfo">
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user ? (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.email}
        </a>
      ) : (
        <span className="UserInfo">none</span>
      )}
    </article>
  );
};
