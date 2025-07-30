import { defineMongooseModel } from "#nuxt/mongoose";

export const ProgressModel = defineMongooseModel({
  name: "Progress",
  schema: {
    kana: {
      hiragana: {
        total: { type: Number, required: true },
        memorized: { type: Number, required: true, default: 0 },
      },
      katakana: {
        total: { type: Number, required: true },
        memorized: { type: Number, required: true, default: 0 },
      },
    },
    jlpt: {
      N5: {
        vocab: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
        kanji: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
      },
      N4: {
        vocab: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
        kanji: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
      },
      N3: {
        vocab: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
        kanji: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
      },
      N2: {
        vocab: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
        kanji: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
      },
      N1: {
        vocab: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
        kanji: {
          total: { type: Number, required: true },
          memorized: { type: Number, required: true, default: 0 },
        },
      },
    },
  },
});
