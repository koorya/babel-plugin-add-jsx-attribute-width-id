# @svgr/babel-plugin-add-jsx-attribute

## Install

```
npm install --save-dev babel-plugin-add-jsx-attribute-width-id
```

## Usage


**svgr config**

```js
jsx: {
  babelConfig: {
    plugins: [
      [
        "babel-plugin-replace-jsx-attribute-value-with-id",
        {
          ids: ["rect", "Y4"],
          attributes: [
            {
              name: "onClick",
              value: "props.clickfn",
              spread: false,
              literal: true,
              position: "end",
            },
            {
              name: "fill",
              value: (id) => "props?." + id + ' ? "#0f0" : "#faa"',
              spread: false,
              literal: false,
              position: "end",
            },
          ],
        },
      ],
    ];
  }
}
```

## License

MIT
