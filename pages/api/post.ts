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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { status, idToken } = req.body as Body;

  const uid = await verifyIdToken(idToken);

  const credentials = await getCredentials(uid);

  const result = await statusesUpdate(status, credentials).catch((e) => {
    console.error(e.response.data, e.response.config);
    return e.response;
  });

  if (result == null) {
    res.status(500).json({ message: "Internal Server Error" });
  } else if (result.status === 200) {
    res.status(200).json({ message: "posted", status });
  } else {
    res
      .status(result.status)
      .json({ message: "posted failed", error: result.data.errors });
  }
}
