import React from "react";
import { useLanguage } from "../context/language-context";

const Privacy = () => {
  const { language } = useLanguage();

  return (
    <React.Fragment>
      {language === "EN" && (
        <article className="flex flex-col gap-6 max-w-[70vw] break-words">
          <h1>Privacy Policy</h1>
        </article>
      )}
    </React.Fragment>
  );
};

export default Privacy;
