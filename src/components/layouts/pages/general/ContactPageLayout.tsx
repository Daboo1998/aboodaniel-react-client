import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import validator from "validator";
import {useAuth} from "../../../../contexts/AuthContext";
import database, {Timestamp} from "../../../../data/database";
import Button, {ButtonSize} from "../../../atoms/buttons and links/Button";

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
        <PageLayout title="Contact" className="pt-10 flex flex-col place-items-center">
            <h1 className="text-center">Contact</h1>
            <form onSubmit={handleSubmit}>
                <TextInput label="Email" name="email" value={email} onChange={setEmail} required/>
                <TextInput label="Name" name="name" value={name} onChange={setName} required/>
                <TextInput label="Subject" name="subject" value={subject} onChange={setSubject} required/>
                <TextAreaInput label="Message" name="message" value={message} onChange={setMessage} required/>
                <p className="w-full"><span className="text-red-600">*</span> Required fields</p>
                <p className="text-green-600">{information}</p>
                <p className="text-error bold">{errorMessage}</p>
                <Button label="submit" size={ButtonSize.bigFullWidth} />
            </form>
        </PageLayout>
    );
};

export default ContactPageLayout;