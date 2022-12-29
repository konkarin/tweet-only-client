import type { NextApiRequest, NextApiResponse } from "next";
import { TweetV1TimelineResult } from "twitter-api-v2";
import { getList } from "../../api/twitter";
import { getCredentials, verifyIdToken } from "../../firebase/admin";

export type ListData = {
  message: string;
  error?: {
    code: number;
    message: string;
  };
  result?: TweetV1TimelineResult;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListData>
) {
  const { id_token } = req.query;

  const uid = await verifyIdToken(id_token as string).catch((e) => {
    console.error(e);
    return "";
  });

  if (uid === "") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const credentials = getCredentials(uid);

  const listId = process.env.LIST_ID;

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
