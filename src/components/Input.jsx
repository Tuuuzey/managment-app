export default function Input({ label, textarea, bgColor, ...props }) {
    const classes = `w-full p-1 border-b-2 rounded-sm  border-stone-300 ${bgColor ? bgColor : 'bg-stone-200'} text-stone-600 focus:outline-none focus:border-stone-500`;

    return <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold uppercase text-stone-600">{label}</label>
        { textarea ? <textarea className={classes} {...props}/> : <input className={classes} {...props}/>}
    </p>
}