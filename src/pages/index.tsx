import { useMemo, useState } from "react";
import { Input, Button, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { FaExchangeAlt } from "react-icons/fa"
import debounce from "lodash.debounce"
import fetchJSON from "@lib/fetchJSON";
import languages from "public/languages.json";

export default function Page() {

  const [origText, setOrigText] = useState("")
  const [transText, setTransText] = useState("")
  const [sourceLang, setSourceLang] = useState("id")
  const [targetLang, setTargetLang] = useState("en")
  const [error, setError] = useState("")

  async function translate(data: { q: string, tl: string, sl: string }) {
    return fetchJSON<{ sentences: any[] }>("/api/translate", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(({ sentences }) => {
      if (sentences && sentences.length) {
        setTransText(sentences[0].trans)
      }
    }).catch((err) => {
      setError(err.message)
    })
  }

  const debouncedEventHandler = useMemo(() => debounce(translate, 500), [])

  async function onOrigTextChange(value: string) {
    setOrigText(value);
    setError("");

    if (value !== "")
      return debouncedEventHandler({ sl: sourceLang, tl: targetLang, q: value });

    return setTransText(value);
  }

  async function onSourceLanguageChange(value: string) {
    const oldSourceLang = sourceLang;

    setSourceLang(value);

    if (value === targetLang)
      setTargetLang(oldSourceLang)

    if (origText !== "")
      return translate({ sl: value, tl: targetLang, q: origText });
  }

  async function onTargetLanguageChange(value: string) {
    const oldTargetLang = targetLang;

    setTargetLang(value);

    if (value === sourceLang)
      setSourceLang(oldTargetLang)

    if (origText !== "")
      return translate({ sl: sourceLang, tl: value, q: origText });
  }

  async function switchLanguage() {
    const oldTargetLang = targetLang;
    const oldTransText = transText;

    setTargetLang(sourceLang)
    setSourceLang(oldTargetLang)
    setTransText(origText)
    setOrigText(oldTransText)
  }

  return (
    <div className="d-block w-100 vh-100 p-3">
      <div className="h-100 d-flex flex-column justify-content-center align-items-center">
        {/*  */}
        <div className="display-6 text-center mb-4">Google Translate</div>
        {/*  */}
        <Card className="h-50 w-75">
          {/*  */}
          <CardHeader>
            <div className="d-flex flex-row">
              <Input id="sourceLang" name="sourceLang" type="select"
                value={sourceLang} onChange={(e) => onSourceLanguageChange(e.target.value)} >
                {languages.text.map(({ language, code }: { language: string, code: string }) =>
                  (<option key={code} value={code}>{language}</option>))}
              </Input>
              <Button className="secondary mx-3" outline onClick={switchLanguage}>
                <FaExchangeAlt />
              </Button>
              <Input id="targetLang" name="targetLang" type="select"
                value={targetLang} onChange={(e) => onTargetLanguageChange(e.target.value)} >
                {languages.text.map(({ language, code }: { language: string, code: string }) =>
                  (<option key={code} value={code}>{language}</option>))}
              </Input>
            </div>
          </CardHeader>
          {/*  */}
          <CardBody className="p-0">
            <div className="d-flex flex-row h-100">
              <Input name="text" type="textarea" className="rounded-0" maxLength={5000}
                value={origText} onChange={(e) => onOrigTextChange(e.target.value)} />
              <Input value={transText} type="textarea" className="rounded-0" disabled={true} />
            </div>
          </CardBody>
          <CardFooter>
            <div className="d-flex flex-row justify-content-between">
              <div className="text-danger">{error}</div>
              <div>{origText.length} / 5000</div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}