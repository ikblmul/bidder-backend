import moment from "moment";

const JustLog = (message: string) => {
  console.log(`[${moment().format("D MMM HH:mm:ss")}]${message}`);
};

export default JustLog;
