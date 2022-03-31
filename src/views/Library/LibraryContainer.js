import React from "react";
import LibraryList from "./LibraryList";
import SharedLibrary from "./SharedLibrary";

const LibraryContainer = (Data) => {

  switch (Data.Data) {

    // My Library List Page
    case "library":
      return (
        <div>
          <LibraryList searchKeyword={Data.searchKeyword} />
        </div>
      );

    // Share Library List Page
    case "sharedlibrary":
      return (
        <div>
          <SharedLibrary searchKeyword={Data.searchKeyword} />
        </div>
      );

    // Default Page
    default:
      return (
        <div>
          <LibraryList searchKeyword={Data.searchKeyword} />
        </div>
      );
      break;
  }
};
export default LibraryContainer;
