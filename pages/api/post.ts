// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { statusesUpdate } from "../../api/twitter";
import { getCredentials, verifyIdToken } from "../../firebase/admin";

interface Data {
  message: string;
  status?: string;
  error?: {
    code: number;
    message: string;
  };
}

interface Body {
  status: string;
  idToken: string;
  userIndex: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { status, idToken, userIndex } = req.body as Body;

  const uid = await verifyIdToken(idToken);

  if (uid === "") {
    res.status(403).json({ message: "Forbidden" });
    return;
  }

  const credentials = getCredentials(uid, userIndex);

  const result = await statusesUpdate(status, credentials).catch((e) => {
    console.error(e.response.data, e.response.config);
    return e.response;
  });

  if (result == null) {
    res.status(400).json({ message: "Bad Request" });
  } else if (result.status === 200) {
    res.status(200).json({ message: "Posted", status });
  } else {
    res
      .status(result.status)
      .json({ message: "Posted failed", error: result.data.errors });
  }
}
