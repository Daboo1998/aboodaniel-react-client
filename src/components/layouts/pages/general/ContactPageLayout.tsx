import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import validator from "validator";
import {useAuth} from "../../../../contexts/AuthContext";
import database, {Timestamp} from "../../../../data/database";

const ContactPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [information, setInformation] = useState<string | null>(null);
    const auth = useAuth();

    useEffect(() => {
        if (auth.isLoggedIn) {
            setEmail(auth.user?.email ?? "");
            setName(auth.user?.displayName ?? "");

            setInformation("Some fields were filled in for you. You may edit them if you want.");
        }
    }, [
        auth.isLoggedIn, auth.user
    ]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(`${name} (${email}) submitted a message: "${message}"`);
      setErrorMessage(null);
      setInformation(null);

      if (email.length === 0) {
          setErrorMessage("Email is required!");
      } else if (name.length === 0) {
          setErrorMessage("Name is required!")
      } else if (subject.length === 0) {
          setErrorMessage("Subject is required!")
      } else if (message.length === 0) {
          setErrorMessage("Message is required!")
      } else if (!validator.isEmail(email)) {
          setErrorMessage("Email is badly formatted! Example email: email@example.com");
      } else {
          database.messages
              .post({
                  timestamp: Timestamp.now(),
                  email, name, subject, message
              }).then(_ => {
                  setInformation("Message sent!");
              }).catch(error => {
                  setErrorMessage(error.message);
              });
      }
    };

    return (
        <PageLayout className="pt-10 items-center">
            <h1>Contact</h1>
            <div className="h-8" />
            <form className="flex flex-col items-start w-full" onSubmit={handleSubmit}>
                <TextInput name="email" value={email} onChange={setEmail}>Email (required)</TextInput>
                <div className="h-6" />
                <TextInput name="name" value={name} onChange={setName}>Name (required)</TextInput>
                <div className="h-6" />
                <TextInput name="subject" value={subject} onChange={setSubject}>Subject (required)</TextInput>
                <div className="h-6" />
                <TextAreaInput name="message" value={message} onChange={setMessage}>Message (required)</TextAreaInput>
                <div className="h-6" />
                <p className="text-green-600">{ information }</p>
                <p className="text-error bold">{errorMessage}</p>
                <div className="h-6" />
                <button type="submit" className="bg-submit text-white rounded py-3 px-5 uppercase <md:w-full">
                    Send
                </button>
            </form>

        </PageLayout>
    );
};

export default ContactPageLayout;