type Props = {
  user: User | undefined;
};

export const UserInfo = ({ user }: Props) => {
  return user ? (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  ) : (
    <span className="UserInfo">none</span>
  );
};
