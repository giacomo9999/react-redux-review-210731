const validateAndFormatDate = (strIn) => {
  const getGeneralType = (strIn) => {
    // returns true if string contains anything but numbers and delimiters
    const onlyNumsAndDelimsRegEx = /[^0-9./-]/g;

    // returns true if string contains anything but numbers, letters, commas, and spaces
    const onlyAlphanumsAndCommasRegEx = /[^a-z^A-Z^\s^0-9,]/g;

    let stringType;
    if (!strIn.match(onlyNumsAndDelimsRegEx)) {
      stringType = "delimited";
    } else if (
      !strIn.match(onlyAlphanumsAndCommasRegEx) &&
      isValidJulian(strIn)
    ) {
      stringType = "julian";
    } else stringType = "invalid";

    return stringType;
  };

  const isValidJulian = (strIn) => {
    const splitStr = strIn.split(" ").map((entry) => entry.trim());
    console.log(
      "checking Julian validity...",
      splitStr,
      splitStr.length,
      parseInt(splitStr[2]) === splitStr[2]
    );
    return splitStr.length === 3;
  };

  const padDigits = (strIn) => {
    return (parseInt(strIn) < 10 ? "0" : "") + parseInt(strIn).toString();
  };

  const convertMonthToTwoDigitNum = (month) => {
    const monthNames = {
      jan: 1,
      feb: 2,
      mar: 3,
      apr: 4,
      may: 5,
      jun: 6,
      jul: 7,
      aug: 8,
      sep: 9,
      oct: 10,
      nov: 11,
      dec: 12,
    };
    const monthAbbrev = month.toLowerCase().slice(0, 3);
    return padDigits(monthNames[monthAbbrev]);
  };

  const parseDelimitedStr = (strIn) => {
    const parms = strIn.split(/[\.\-\/]/);

    const strType =
      parms[0].length === 4
        ? "ISO"
        : parms[2].length === 2
        ? "two-digit-year"
        : "MDY-delimited";

    switch (strType) {
      case "ISO":
        return strIn;

      case "two-digit-year":
        return (
          "20" +
          parms[2] +
          "-" +
          padDigits(parms[0]) +
          "-" +
          padDigits(parms[1])
        );

      case "MDY-delimited":
        return parms[2] + "-" + padDigits(parms[0]) + "-" + padDigits(parms[1]);

      default:
        return;
    }
  };

  const parseJulianStr = (strIn) => {
    let parms;
    if (strIn.indexOf(",") !== -1) {
      const tempArr = strIn.split(",");
      parms = tempArr[0].split(" ").concat(tempArr[1]);
    } else {
      parms = strIn.split(" ");
    }

    if (parms[1].slice(-1) === ",")
      parms[1] = parms[1].slice(0, parms[1].length - 1);

    const trimmedParms = parms.map((entry) => entry.trim());

    return (
      trimmedParms[2] +
      "-" +
      convertMonthToTwoDigitNum(trimmedParms[0]) +
      "-" +
      padDigits(trimmedParms[1])
    );
  };

  strIn = strIn.trim();

  if (getGeneralType(strIn) === "invalid") {
    return "invalid";
  } else if (getGeneralType(strIn) === "delimited") {
    return parseDelimitedStr(strIn);
  } else return parseJulianStr(strIn);
};

export default validateAndFormatDate;
