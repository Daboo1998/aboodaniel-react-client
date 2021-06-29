import React, {useState} from "react";
import PageLayout from "../PageLayout";
import TextInput from "../../atoms/TextInput";
import TextAreaInput from "../../atoms/TextAreaInput";
import validator from "validator";
import firebase from "firebase";
import "firebase/firestore";

const ContactPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [messageSent, setMessageSent] = useState<"Message sent!" | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(`${name} (${email}) submitted a message: "${message}"`);
      setErrorMessage(null);
      setMessageSent(null);

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
          firebase.firestore()
              .collection("messages")
              .add({
                  timestamp: firebase.firestore.Timestamp.now(),
                  email, name, subject, message
              })
              .then(_ => {
                  setMessageSent("Message sent!");
              })
              .catch(error => {
                  setErrorMessage(error.message);
              })
      }
    };

    return (
        <PageLayout className="pt-10 items-center">
            <h1>Contact</h1>
            <div className="h-8" />
            <form className="flex flex-col items-start w-min" onSubmit={handleSubmit}>
                <TextInput name="email" value={email} onChange={setEmail}>Email (required)</TextInput>
                <div className="h-6" />
                <TextInput name="name" value={name} onChange={setName}>Name (required)</TextInput>
                <div className="h-6" />
                <TextInput name="subject" value={subject} onChange={setSubject}>Subject (required)</TextInput>
                <div className="h-6" />
                <TextAreaInput name="message" value={message} onChange={setMessage}>Message (required)</TextAreaInput>
                <div className="h-6" />
                <p className="text-green-600">{ messageSent }</p>
                <p className="text-error bold">{errorMessage}</p>
                <div className="h-6" />
                <button type="submit" className="bg-submit text-white rounded py-3 px-5 uppercase">
                    Send
                </button>
            </form>

        </PageLayout>
    );
};

export default ContactPageLayout;