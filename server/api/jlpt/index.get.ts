export default defineEventHandler(async _event => {
  try {
    const data = await ProgressModel.findOne().select("jlpt").exec();
    return data?.jlpt;
  } catch (err) {
    return err;
  }
});
