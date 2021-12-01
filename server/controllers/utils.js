exports.validateJSON = (props, obj) => {  
    if (
        typeof obj !== "object" ||
        Object.keys(obj).length != props.length
    ) {
    throw new Error("Invalid recipe JSON format");
    }

    for (const prop of props) {
        if (!obj.hasOwnProperty(prop)) {
            throw new Error(`Invalid obj JSON format - ${prop}`);
        }
    }
}