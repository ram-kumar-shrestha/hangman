import xlsx from "json-as-xlsx";

export const jsonToPdf = (name, columns, content) => {
  let settings = {
    fileName: name, // Name of the resulting spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
    RTL: false, // Display the columns from right-to-left (the default value is false)
  };

  console.log(content.flat());

  xlsx(
    [
      {
        sheet: name,
        columns: columns,
        content: content.flat(),
      },
    ],
    settings
  );
};
