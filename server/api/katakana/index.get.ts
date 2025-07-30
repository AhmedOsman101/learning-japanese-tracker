export default defineEventHandler(async _event => {
  try {
    const data = await ProgressModel.findOne().select("kana.katakana").exec();
    return data?.kana.katakana;
  } catch (err) {
    return err;
  }
});
