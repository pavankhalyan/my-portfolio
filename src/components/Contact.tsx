import React, { useState, useEffect } from "react";
import Button from "./Button";
import axios from "axios";
import { contactData, toastMessages } from "../assets/lib/data.tsx";
import { useSectionInView } from "../assets/lib/hooks";
import { useLanguage } from "../context/language-context";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../context/theme-context";
import "react-toastify/dist/ReactToastify.css";

const Contact: React.FC = () => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [cursor, setCursor] = useState<string>("");
  const [setLastUpdatedField] = useState<string | null>(null);
  const { ref } = useSectionInView("Contact");
  const { theme } = useTheme();
  const [error, setError] = useState<string | any>(null);

  const notifySentForm: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setError(null);

    e.preventDefault();
    const data = new FormData(e.currentTarget);

    try {
      const response = await axios.post(apiBaseUrl, data);
      toast.success(toastMessages.successEmailSent.en);
    } catch (error) {
      console.error(error);
      toast.error(toastMessages.failedEmailSent.en);
      setError("An Error occurred, try again later");
    }
  };

  const handleInputFocus = (fieldName: string) => {
    setCursor(`${fieldName}${cursor}`);
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "subject") {
      setSubject(value);
    } else if (name === "message") {
      setMessage(value);
    }

    setLastUpdatedField(name);
  };

  const [cursorBlink, setCursorBlink] = useState<boolean>(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 400);

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <React.Fragment>
      <section
        className="contact-container w-full min-[1921px]:px-[55rem] mt-16"
        id="contact"
      >
        <div
          className="title-container flex flex-col gap-6 justify-center items-center py-16 max-lg:p-16"
          ref={ref}
        >
          <p className="text-[--black] mb-6">
            <span className="text-[--orange]">&lt;</span>
            {contactData.title.en}
            <span className="text-[--orange]">/&gt;</span>
          </p>

          <h2 className="text-[--black] text-center">
            {contactData.description.en}
          </h2>
        </div>
        <div className="flex flex-row justify-center items-start px-32 pt-32 mb-32 max-lg:flex-col max-lg:p-10">
          <form
            className="flex flex-col gap-6 justify-center items-center px-32 w-full max-lg:p-10"
            onSubmit={notifySentForm}
            autoComplete="off"
          >
            {contactData.inputfields.map((input, index) => (
              <input
                key={index}
                type={input.type}
                placeholder={input.placeholder.en}
                name={input.name}
                value={
                  input.name === "name"
                    ? name
                    : input.name === "email"
                    ? email
                    : input.name === "subject"
                    ? subject
                    : message
                }
                required
                onFocus={() => {
                  handleInputFocus(input.name);
                  setLastUpdatedField(input.name);
                }}
                onMouseEnter={() => {
                  handleInputFocus(input.name);
                  setLastUpdatedField(input.name);
                }}
                onChange={handleInputChange}
                className={`${
                  theme === "dark"
                    ? "bg-[--blackblue] dark-mode-shadow "
                    : "bg-[--icewhite] dark-shadow "
                } w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500`}
                style={{ width: "65%" }}
              />
            ))}
            <textarea
              rows={contactData.textarea.rows}
              placeholder={contactData.textarea.placeholder.en}
              name={contactData.textarea.name}
              onFocus={() => {
                handleInputFocus(contactData.textarea.name);
                setLastUpdatedField(contactData.textarea.name);
              }}
              onMouseEnter={() => {
                handleInputFocus(contactData.textarea.name);
                setLastUpdatedField(contactData.textarea.name);
              }}
              onChange={handleInputChange}
              className={`${
                theme === "dark"
                  ? "bg-[--blackblue] dark-mode-shadow"
                  : "bg-[--icewhite] dark-shadow"
              } w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500`}
              style={{ width: "65%" }}
            />
            <p>{contactData.privacyOptIn.description.en}</p>
            <Button
              value={contactData.button.value.en}
              iconSVG={contactData.icon}
              buttoncolor={contactData.colors.main}
              iconcolor={contactData.colors.icon}
              type="submit"
              elementType="input"
            />
            <ToastContainer
              className="w-max text-3xl block p-3 max-lg:w-full"
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme={theme}
            />
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Contact;
