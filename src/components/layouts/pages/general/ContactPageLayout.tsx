import React, {useState, useEffect} from "react";
import PageLayout from "../PageLayout";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import validator from "validator";
import {useAuth} from "../../../../contexts/AuthContext";
import database, {Timestamp} from "../../../../data/database";
import Button, {ButtonSize} from "../../../atoms/buttons and links/Button";
import {useFormWithUnsavedChanges} from "../../../../hooks/useFormWithUnsavedChanges";
import {
    ContactContainer,
    ContactTitle,
    ContactForm,
    RequiredFieldsText,
    RequiredAsterisk,
    InformationMessage,
    ErrorMessage,
    SubmitButtonContainer
} from "./ContactPageLayout.styled";

const ContactPageLayout: React.FC = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [information, setInformation] = useState<string | null>(null);
    const auth = useAuth();

    // Initialize unsaved changes tracking
    const { 
        createChangeHandler, 
        setInitialValues, 
        markFormAsSubmitted 
    } = useFormWithUnsavedChanges({
        message: "You have unsaved message content. Are you sure you want to leave?"
    });

    useEffect(() => {
        if (auth.isLoggedIn) {
            const initialEmail = auth.user?.email ?? "";
            const initialName = auth.user?.displayName ?? "";
            
            setEmail(initialEmail);
            setName(initialName);

            setInformation("Some fields were filled in for you. You may edit them if you want.");

            // Set initial values for form tracking
            setInitialValues({
                email: initialEmail,
                name: initialName,
                subject: "",
                message: ""
            });
        } else {
            // Set initial values for non-logged in users
            setInitialValues({
                email: "",
                name: "",
                subject: "",
                message: ""
            });
        }
    }, [
        auth.isLoggedIn, auth.user, setInitialValues
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
                  markFormAsSubmitted(); // Mark form as submitted to stop tracking changes
              }).catch(error => {
                  setErrorMessage(error.message);
              });
      }
    };

    return (
        <PageLayout title="Contact">
            <ContactContainer>
                <ContactTitle>Contact</ContactTitle>
                <ContactForm onSubmit={handleSubmit}>
                    <TextInput label="Email" name="email" value={email} onChange={createChangeHandler("email", setEmail)} required/>
                    <TextInput label="Name" name="name" value={name} onChange={createChangeHandler("name", setName)} required/>
                    <TextInput label="Subject" name="subject" value={subject} onChange={createChangeHandler("subject", setSubject)} required/>
                    <TextAreaInput label="Message" name="message" value={message} onChange={createChangeHandler("message", setMessage)} required/>
                    <RequiredFieldsText><RequiredAsterisk>*</RequiredAsterisk> Required fields</RequiredFieldsText>
                    <InformationMessage>{information}</InformationMessage>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                    <SubmitButtonContainer>
                        <Button label="submit" size={ButtonSize.bigFullWidth} />
                    </SubmitButtonContainer>
                </ContactForm>
            </ContactContainer>
        </PageLayout>
    );
};

export default ContactPageLayout;