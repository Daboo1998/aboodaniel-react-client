import React, {useState} from "react";
import PageLayout, {PageLayoutProps} from "../PageLayout";
import TextInput from "../../atoms/TextInput";
import TextAreaInput from "../../atoms/TextAreaInput";

interface ContactPageLayoutProps extends PageLayoutProps {}

const ContactPageLayout: React.FC<ContactPageLayoutProps> = ({ path }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(`${name} (${email}) submitted a message: "${message}"`);
    };

    return (
        <PageLayout path={path} className="pt-10 items-center">
            <h1>Contact</h1>
            <form className="flex flex-col items-end w-min" onSubmit={handleSubmit}>
                <TextInput name="email" value={email} onChange={setEmail}>Email:</TextInput>
                <TextInput name="name" value={name} onChange={setName}>Name:</TextInput>
                <TextAreaInput name="message" value={message} onChange={setMessage}>Message:</TextAreaInput>
            </form>
            <button onClick={handleSubmit}>Submit</button>
        </PageLayout>
    );
};

export default ContactPageLayout;