export default function Button({onClick}) {
    return (
        <button onClick={onClick} className=" py-1.5 text-white mt-9 hover:cursor-pointer text-[12px] rounded-md  border-2 px-22 border-blue-700" style={{backgroundColor: "rgba(29, 16, 58, 1)"}}>Send Notification</button>
    )
}