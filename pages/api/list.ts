import type { NextApiRequest, NextApiResponse } from "next";
import { getList } from "../../api/twitter";
import { getCredentials, verifyIdToken } from "../../firebase/admin";

interface Data {
  message: string;
  error?: {
    code: number;
    message: string;
  };
  result?: any;
}

interface Body {
  status: string;
  idToken: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { idToken } = req.body as Body;

  const uid = await verifyIdToken(idToken);

  if (uid === "") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const credentials = getCredentials(uid);

  const listId = process.env.LIST_ID as string;

  const result = await getList(listId, credentials).catch((e) => {
    console.error(e.response.data, e.response.config);
    return e.response;
  });

  if (result == null) {
    res.status(400).json({ message: "Bad Request" });
  } else if (result.status === 200) {
    res.status(200).json({ message: "got list", result: result.data });
  } else {
    res
      .status(result.status)
      .json({ message: "got failed", error: result.data.errors });
  }
}
