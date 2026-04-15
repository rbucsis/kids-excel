import { ImCross } from "react-icons/im";

const config = {
    navigation: [
        {
            label: "Students",
            link: "students"
        },
        {
            label: "Conatcts",
            link: "contacts"
        },
        {
            label: "Teachers",
            link: "teachers"
        }
    ],
    icons: {
        "cancel": function (closeCallback) {
            return <ImCross className="hover:cursor-pointer" onClick={() => closeCallback(false)}/>
        }
    }
}

export default config