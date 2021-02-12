# @svgr/babel-plugin-add-jsx-attribute

## Install

```
npm install --save-dev babel-plugin-add-jsx-attribute-width-id
```

## Usage

**.babelrc**

```json
{
  "plugins": [
    [
      "babel-plugin-add-jsx-attribute-width-id",
      {
        "elements": ["svg"],
        "attributes": [
          {
            "name": "width",
            "value": "200",
            "spread": false,
            "literal": false,
            "position": "end"
          }
        ]
      }
    ]
  ]
}
```

## License

MIT
