const { apis } = require("../apis");

module.exports.getStudentsList = async (data) => {

  let returnData;
  try {
    const { data } = await apis.getStudentsList();

    // console.log('[GET STUDENTS LIST DATA]', data);
    returnData=data;
  } catch (e) {
    console.log('[GET STUDENTS LIST FAILED]', e.response ? e.response.data : undefined)
  }
  return returnData;
}
