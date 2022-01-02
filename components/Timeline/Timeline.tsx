import { User } from "firebase/auth";
import axios from "axios";
import useSWR from "swr";

interface Props {
  user: User;
}

export default function Timeline({ user }: Props) {
  const getList = async () => {
    const url = "/api/list";
    const data = {
      idToken: await user.getIdToken(),
    };

    const result = await axios.post(url, data).catch((e) => e);
    return result;
  };

  const { data, error } = useSWR("/api/list", getList);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const tweets = data.data.result;

  return (
    <ul>
      {tweets.map((item: any) => (
        <li key={item.id_str}>{item.text}</li>
      ))}
    </ul>
  );
}
