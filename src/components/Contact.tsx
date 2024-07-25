import React, { useState } from "react";
import Button from "./Button";
import { contactData, toastMessages } from "../assets/lib/data";
import { useSectionInView } from "../assets/lib/hooks";
import { ToastContainer, toast } from "react-toastify";
import { useTheme } from "../context/theme-context";
import "react-toastify/dist/ReactToastify.css";
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [cursor, setCursor] = useState<string>("");
  const { ref } = useSectionInView("Contact");
  const { theme } = useTheme();
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const templateParams = {
      user_name: name,
      user_email: email,
      subject,
      message,
    };

    try {
      const response = await emailjs.send(
        'service_xk1a4o8', // Replace with your EmailJS service ID
        'template_qpve2oq', // Replace with your EmailJS template ID
        templateParams,
        'QpAZFNFLdN3gl1hp_' // Replace with your EmailJS user ID
      );

      if (response.status === 200) {
        toast.success(toastMessages.successEmailSent.en);
        setName("");
        setEmail("");
        setSubject("");
        setMessage(""); // Clear form fields after successful submission
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(toastMessages.failedEmailSent.en);
      setError("An error occurred, try again later");
    }
  };

  const handleInputFocus = (fieldName: string) => {
    setCursor(`${fieldName}${cursor}`);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
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
  };

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
            onSubmit={sendEmail}
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
                onFocus={() => handleInputFocus(input.name)}
                onMouseEnter={() => handleInputFocus(input.name)}
                onChange={handleInputChange}
                className={`${
                  theme === "dark"
                    ? "bg-[--blackblue] dark-mode-shadow"
                    : "bg-[--icewhite] dark-shadow"
                } w-full p-3 rounded-lg border border-gray-300 outline-none focus:border-blue-500`}
                style={{ width: "65%" }}
              />
            ))}
            <textarea
              rows={contactData.textarea.rows}
              placeholder={contactData.textarea.placeholder.en}
              name={contactData.textarea.name}
              value={message}
              onFocus={() => handleInputFocus(contactData.textarea.name)}
              onMouseEnter={() => handleInputFocus(contactData.textarea.name)}
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
            {error && (
              <p className="text-red-500 mt-2">{error}</p>
            )}
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
