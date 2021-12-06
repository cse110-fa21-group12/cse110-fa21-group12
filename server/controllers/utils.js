/**
 * Validate the given object has exactly the provided fields list
 * throws and error if not
 * @param {Array<string>]} props 
 * @param {object} obj 
 */
exports.validateJSON = (props, obj) => {
  if (typeof obj !== "object" || Object.keys(obj).length != props.length) {
    throw new Error("Invalid JSON format");
  }

  for (const prop of props) {
    if (!obj.hasOwnProperty(prop)) {
      throw new Error(`Invalid obj JSON format - ${prop}`);
    }
  }
};
