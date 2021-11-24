import React, {useEffect, useState} from "react";
import PageLayout from "../PageLayout";
import TextInput from "../../../atoms/input/TextInput";
import TextAreaInput from "../../../atoms/input/TextAreaInput";
import {useAuth} from "../../../../contexts/AuthContext";
import Button, {ButtonSize} from "../../../atoms/buttons and links/Button";
import {MessageField, useSendMessage} from "../../../../hooks/useMessages";

const ContactPageLayout: React.FC = () => {
    const [information, setInformation] = useState<string>();
    const auth = useAuth();

    const {
        sendMessage,
        sendingMessage,
        sendMessageError,
        getField,
        setField
    } = useSendMessage(() => {
        setInformation("Message Sent!");
    });

    useEffect(() => {
        if (sendingMessage) {
            setInformation("Sending message...");
        } else {
            setInformation(undefined);
        }
    }, [sendingMessage]);

    useEffect(() => {
        if (auth.isLoggedIn) {
            setField(MessageField.Email,auth.user?.email ?? "");
            setField(MessageField.Name, auth.user?.displayName ?? "");

            setInformation("Some fields were filled in for you. You may edit them if you want.");
        }
    }, [
        auth.isLoggedIn, auth.user, setField
    ]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      sendMessage();
    };

    return (
        <PageLayout title="Contact" className="pt-10 flex flex-col place-items-center">
            <h1 className="text-center">Contact</h1>
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Email"
                    name="email"
                    value={getField(MessageField.Email)}
                    onChange={value => setField(MessageField.Email, value)}
                    required
                />
                <TextInput
                    label="Name"
                    name="name"
                    value={getField(MessageField.Name)}
                    onChange={value => setField(MessageField.Name, value)}
                    required
                />
                <TextInput
                    label="Subject"
                    name="subject"
                    value={getField(MessageField.Subject)}
                    onChange={value => setField(MessageField.Subject, value)}
                    required
                />
                <TextAreaInput
                    label="Message"
                    name="message"
                    value={getField(MessageField.Message)}
                    onChange={value => setField(MessageField.Message, value)}
                    required
                />
                <p className="w-full"><span className="text-red-600">*</span> Required fields</p>
                {
                    information && <p className="text-green-600">{information}</p>
                }
                {
                    sendMessageError && <p className="text-error bold">{sendMessageError.message}</p>
                }
                <Button
                    label="submit"
                    size={ButtonSize.bigFullWidth}
                    disabled={sendingMessage}
                />
            </form>
        </PageLayout>
    );
};

export default ContactPageLayout;