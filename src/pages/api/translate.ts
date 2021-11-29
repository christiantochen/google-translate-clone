import { NextApiRequest, NextApiResponse } from "next";
import { URLSearchParams } from "url";

const url =
  "https://translate.google.com/translate_a/single?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&ie=UTF-8&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";

async function translateRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(404).end();
  }

  const { sl, tl, q } = JSON.parse(req.body);

  if (!Boolean(sl) || !Boolean(tl) || !Boolean(q)) {
    console.log("bad request", req.body);
    return res.status(400).end();
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: new URLSearchParams({ sl, tl, q }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    });

    if (response.ok) {
      const json = await response.json();
      console.log("ok", json);
      return res.status(200).send(json);
    }

    res.status(response.status).send({ message: response.statusText });
  } catch (err) {
    res.status(500).send(err);
  }
}

export default translateRoute;
