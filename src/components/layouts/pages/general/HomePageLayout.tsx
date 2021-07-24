import React, {useState} from "react";
import PageLayout from "../PageLayout";
import {v4 as uuidv4} from 'uuid';
import {ReactComponent as LeftIcon} from "../../../../images/icons/left.svg";
import {ReactComponent as RightIcon} from "../../../../images/icons/right.svg";

interface Reference {
    id: string;
    name: string;
    description: string;
    image: string;
}

const references: Reference [] = [
    {
        id: uuidv4(),
        name: "Elon Musk",
        description: "Working With Daniel was a pleasure! Such a talented and hardworking guy!",
        image: "https://www.hotelierindia.com/public/images/2021/06/03/elonmuskroyalsocietycrop1_1.jpg"
    },
    {
        id: uuidv4(),
        name: "Jeff Bezos",
        description: "Nice Nice and Nice! Whoop Whoop!",
        image: "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5bb22ae84bbe6f67d2e82e05%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D509%26cropX2%3D1763%26cropY1%3D185%26cropY2%3D1440"
    },
    {
        id: uuidv4(),
        name: "Steve Jobs",
        description: "Here’s to the crazy ones, the misfits, the rebels, the troublemakers, the round pegs in the square holes… the ones who see things differently — they’re not fond of rules… You can quote them, disagree with them, glorify or vilify them, but the only thing you can’t do is ignore them because they change things… they push the human race forward, and while some may see them as the crazy ones, we see genius, because the ones who are crazy enough to think that they can change the world, are the ones who do.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Steve_Jobs_Headshot_2010-CROP2.jpg"
    }
];

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

const HomePageLayout: React.FC = () => {
    const [selectedReference, setSelectedReference] = useState(0);

    const handleNext: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setSelectedReference(mod(selectedReference + 1, references.length));
    };

    const handlePrevious: React.MouseEventHandler = (e) => {
        e.preventDefault();
        setSelectedReference(mod(selectedReference - 1, references.length));
    };

    return (
        <PageLayout title="Home" className="pt-10 flex flex-col space-y-8 overflow-x-hidden">
            <h1 className="text-center">Welcome to my kingdom!</h1>
            <div className="p-8">
                <img src="/images/me.jpg" className="w-48 float-left pr-4 pb-4" alt=""/>
                <p className="text-xl">A bit about me. I have been always, looking into the future, wanting to create
                    new solutions using technology to change how we live our everyday lives. My mission is to innovate,
                    while also make my work to be understood by others and be able to work together with people.
                    Creativity, my pursuit after my goals and my determination are my main attributes. I always try my
                    best to understand the needs of people I work with, and find a way for all parties to be happy. Btw,
                    I've built this website from scratch ;) </p>
            </div>
            <h1 className="text-center">References</h1>
            <div className="flex flex-row items-center justify-center h-96 <md:justify-between >md:justify-around flex-shrink-0">
                <button onClick={handlePrevious}>
                    <LeftIcon className="w-24 fill-current hover:text-gray-400"/>
                </button>
                {
                    references.map((reference, index) => {
                        return (
                            <div key={reference.id} className={`flex flex-col flex-shrink-0 m-2 p-4
                             space-y-2 rounded-xl h-full w-72 overflow-y-scroll 
                             ${selectedReference === index ? "" : "hidden"}
                             shadow-lg`}
                            style={{backgroundImage: `url(${reference.image})`, backgroundSize: "cover"}}>
                                <h4>{reference.name}</h4>
                                <p>{reference.description}</p>
                            </div>
                        )
                    })
                }
                <button onClick={handleNext}>
                    <RightIcon className="w-24 fill-current hover:text-gray-400"/>
                </button>
            </div>
        </PageLayout>
    );
};

export default HomePageLayout;
