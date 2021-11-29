> [Development Practice Challenge : Build a Language Translation App](https://www.topcoder.com/challenges/030bdfc4-37d1-4b71-80a4-cbc6173a7a06)

## Stacks
- [NextJS](https://nextjs.org/)
- [Reactstrap](https://reactstrap.github.io/)

## Getting Started

First, run the development server: `npm run dev`

### Web

Open [http://localhost:3000](http://localhost:3000) with your browser to see the frontend page.

![image](https://user-images.githubusercontent.com/13632885/143838892-0ba8052d-2896-487c-9762-1dbe5e1a53dd.png)


### API

Use HTTP Client Extension such as [Postman](https://www.postman.com) and [Thunder Client](https://www.thunderclient.io) to test it.

- URL `http://localhost:3000/api/translate`
- Method `POST`
- Body  
```json
{
  "sl":"id",
  "tl":"en",
  "q":"Hore"
}
```
`sl` and `tl` are language codes, you can find them on [here](https://developers.google.com/admin-sdk/directory/v1/languages).
`q` is the text you want to be translated.
- Response
```json
{
  "sentences": [
    {
      "trans": "Hurray",
      "orig": "Hore",
      "backend": 3,
      "model_specification": [{}],
      "translation_engine_debug_info": [
        {
          "model_tracking": {
            "checkpoint_md5": "d906f146e9fec4c46f9b531e2fa31c2a",
            "launch_doc": "id_en_2021q1.md"
          }
        }
      ]
    }
  ],
  "dict": [
    {
      "pos": "interjection",
      "terms": ["Hurray!", "Hurrah!"],
      "entry": [
        {
          "word": "Hurray!",
          "reverse_translation": ["Hore!", "Hura!", "Sabas!"],
          "score": 0.16842748
        },
        {
          "word": "Hurrah!",
          "reverse_translation": ["Hore!", "Hura!", "Sabas!"],
          "score": 0.10539922
        }
      ],
      "base_form": "Hore!",
      "pos_enum": 9
    }
  ],
  "src": "id",
  "confidence": 0.3984375,
  "spell": {},
  "ld_result": {
    "srclangs": ["sk", "so", "ja"],
    "srclangs_confidences": [0.3984375, 0.3984375, 0.16015625],
    "extended_srclangs": ["sk", "so", "ja-Latn"]
  }
}
```

