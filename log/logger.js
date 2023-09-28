import moment from "moment";
import path from "path";
import { existsSync, mkdirSync, appendFileSync, createReadStream } from "fs";
import readline from "readline";
import config from "./config";
import { errorCodes } from "../env";

// options is a object that contains (level , message , error , errorCode)

export const log = (options) => {
  const levelName = getLevelName(options.level);
  let message = "";
  if (options.message != undefined) {
    message = options.message;
  } else {
    message = "unidentified error";
  }

  let error = null;
  if (options.error != null) {
    error = options.error;
  } else if (options.errorCode != null) {
    error = errorCodes[options.errorCode][0];
  } else {
    error = null;
  }

  writeToConsole(levelName, message, error);

  if (config.levels[levelName].writeToFile) {
    writeToFile(levelName, message, error);
  }
};

/**
 *
 * @param {string} levelName
 * @param {string} message
 * @param {Error|null} error
 */
const writeToConsole = (levelName, message, error = null) => {
  const level = config.levels[levelName];

  const header = `[${levelName.toUpperCase()}] [${getFormattedCurrentDate()}]`;

  console.log(`${header} : ${message} `);
};

const getFormattedCurrentDate = () => {
  return moment(new Date()).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
};

const getLevelName = (level) => {
  return level && config.levels.hasOwnProperty(level) ? level : "info";
};

const writeToFile = (levelName, message, error = null) => {
  const logsDir = `${__dirname}/logs`;

  let data = `{
    level: ${levelName},
    timestamps: ${getFormattedCurrentDate()},
    message: ${message},
  }`;

  if (error != null) {
    data = `{
      level: ${levelName},
      timestamps: ${getFormattedCurrentDate()},
      message: ${message},
      error: ${error}
    }`;
  }

  if (!existsSync(logsDir)) {
    mkdirSync(logsDir);
  }

  const options = {
    encoding: "utf8",
    mode: 438,
  };
  appendFileSync(`${__dirname}/logs/${levelName}.log`, data, options);
};
