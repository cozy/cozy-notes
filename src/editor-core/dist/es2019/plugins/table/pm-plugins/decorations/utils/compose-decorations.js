export const composeDecorations = transformers => ({ decorationSet, tr }) =>
  transformers.reduce(
    (decorationSet, transform) =>
      transform({
        decorationSet,
        tr
      }),
    decorationSet
  )
