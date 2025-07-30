export default defineEventHandler(async _event => {
  try {
    const data = await ProgressModel.findOne().select("kana.hiragana").exec();
    return data?.kana.hiragana;
  } catch (err) {
    return err;
  }
});
